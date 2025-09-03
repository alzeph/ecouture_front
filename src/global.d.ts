interface Window {
  api: {
    setTokenDesktop:  (
      {accessToken, refreshToken}:{accessToken: string | null,refreshToken: string | null}
    ) => Promise<void>;
    getTokenDesktop: () => Promise<{
      accessToken: string | null;
      refreshToken: string | null;
    }>;
    deleteTokenDesktop:  () => Promise<void>;
  };
}
