//import styles from './auth-provider.module.css';
import { useAsyncTask, usePlatform } from '@features/core/hook';
import { type TokenObtainPairRequest, type TokenRefreshRequest, type WorkerRead, type WorkshopRead, Api } from '@shared/api'
import React, { useCallback } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { Preferences } from '@capacitor/preferences';
import { useMutation, useQuery, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';

import { ACCESS_TOKEN_KEY, APP_NAME, BASE_URL, REFRESH_TOKEN_KEY } from '@features/core/constants';

export interface AuthProviderProps {
  children: React.ReactNode
}

type AuthContextType = {
  baseUrl: string;
  worker: WorkerRead | undefined,
  workshop: WorkshopRead | undefined,
  refetchUser: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<WorkerRead, Error>>;
  proxy: Api<string>;
  isAuthenticated: boolean | null;
  login: ({ email, password }: TokenObtainPairRequest) => void;
  logout: () => void;
  loading: boolean,
}


export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { isMobile, isDesktop, isWeb } = usePlatform()
  const [loading, setLoading] = useState(true)


  const saveTokens = async (access: string, refresh: string | null) => {
    if (isMobile) {
      await Preferences.set({ key: ACCESS_TOKEN_KEY, value: access })
      if (refresh) await Preferences.set({ key: REFRESH_TOKEN_KEY, value: refresh })
    }
    if (isDesktop) {
      await window.api.setTokenDesktop({ accessToken: access, refreshToken: refresh })
    }
    if (isWeb) {
      Cookies.set(ACCESS_TOKEN_KEY, access)
      if (refresh) Cookies.set(REFRESH_TOKEN_KEY, refresh)
    }
  }

  const clearTokens = async () => {
    if (isMobile) {
      await Preferences.remove({ key: ACCESS_TOKEN_KEY })
      await Preferences.remove({ key: REFRESH_TOKEN_KEY })
    }
    if (isDesktop) {
      await window.api.deleteTokenDesktop()
    }
    if (isWeb) {
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
    }
  }

  const loadTokens = async () => {
    if (isMobile) {
      const accessToken = (await Preferences.get({ key: ACCESS_TOKEN_KEY })).value
      const refreshToken = (await Preferences.get({ key: REFRESH_TOKEN_KEY })).value
      return { accessToken, refreshToken }
    }
    if (isDesktop) {
      return await window.api.getTokenDesktop()
    }
    if (isWeb) {
      return {
        accessToken: Cookies.get(ACCESS_TOKEN_KEY) || null,
        refreshToken: Cookies.get(REFRESH_TOKEN_KEY) || null,
      }
    }
    return { accessToken: null, refreshToken: null }
  }


  const proxy = new Api<string>({
    baseURL: BASE_URL,
    withCredentials: true,
    securityWorker(securityData) {
      if (securityData) {
        return {
          headers: {
            Authorization: `Bearer ${securityData}`,
          },
        };
      }
      return {}
    },
  });

  const secureProxy = useCallback(() => {
    proxy.setSecurityData(accessToken)
  }, [proxy, accessToken, refreshToken])

  const getproxySecure = useCallback(() => {
    secureProxy()
    return proxy
  }, [proxy, accessToken])

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: TokenObtainPairRequest) => {
      const response = await proxy.api.apiAuthTokenCreate({ email, password });
      return response
    },
    onSuccess: async (response) => {
      if (response.status === 200 || response.status === 201) {
        const { access, refresh } = response.data
        await saveTokens(access, refresh)
        notifications.show({
          title: 'Connexion réussie',
          message: 'Vous êtes maintenant connecté',
          color: 'success.9',
        })
      }
    }
  })

  const login = async ({ email, password }: TokenObtainPairRequest) => {
    await loginMutation.mutateAsync({ email, password })
  }

  const logout = async () => {
    setAccessToken(null)
    setRefreshToken(null)
  }

  const refreshTokenMutation = useMutation({
    mutationFn: async (_refresh: TokenRefreshRequest) => {
      const response = await proxy.api.apiAuthTokenRefreshCreate(_refresh);
      return response
    },
    onSuccess: async (response) => {
      if (response.status === 200 || response.status === 201) {
        const { access } = response.data
        setAccessToken(access);
        if (isWeb) {
          Cookies.set(ACCESS_TOKEN_KEY, access)
        }
        if (isMobile) {
          await Preferences.set({ key: ACCESS_TOKEN_KEY, value: access })
        }
        if (isDesktop) {
          await window.api.setTokenDesktop({ accessToken: access, refreshToken: refreshToken })
        }
      }
    }
  })

  const { data: worker, refetch: refetchUser } = useQuery({
    queryKey: [APP_NAME, "user"],
    queryFn: async () => {
      secureProxy()
      const response = await proxy.api.apiUserInfoDetailRetrieve({});
      return response.data
    },
    refetchOnWindowFocus: false,
    enabled: !!isAuthenticated,
    retry: !!isAuthenticated,
  })

  //les effets


  useAsyncTask(async () => {
    const { refreshToken, accessToken } = await loadTokens()
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setIsAuthenticated(!!accessToken && !!refreshToken)
    setLoading(false) // ✅ on marque la fin du chargement
  }, [isMobile, isDesktop, isWeb])

  useAsyncTask(async () => {
    if (loading) return // ⚠️ on ne fait rien tant que les tokens ne sont pas chargés

    if (!refreshToken) {
      // clearTokens()
      setIsAuthenticated(false)
      return
    }

    if (accessToken) {
      proxy.setSecurityData(accessToken)
    } else {
      refreshTokenMutation.mutate({ refresh: refreshToken })
    }
  }, [loading, accessToken, refreshToken])


  useAsyncTask(async () => {
    if (loading) return
    if (!isAuthenticated) {
      clearTokens()
      notifications.show({
        title: 'Déconnexion',
        message: 'Vous avez été déconnecté.',
        color: 'error.9',
      })
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        baseUrl: BASE_URL,
        worker: worker,
        workshop: worker?.workshop,
        refetchUser,
        proxy: getproxySecure(),
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
