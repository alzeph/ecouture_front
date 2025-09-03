import { useWindow } from "@features/core/hook";
import { Button, Drawer, Flex, Loader, rgba, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications, type NotificationData } from "@mantine/notifications";
import React, { createContext, useCallback, useState, useMemo } from "react";

export interface DrawerProviderProps {
  children: React.ReactNode
}

export interface ActionDescriptionWrapper {
  opened?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  content?: React.ReactNode
  confirmLabel: string;
  cancelLabel?: string;
  notificationDoneSuccess?: NotificationData,
  notificationDoneError?: NotificationData,
  notificationCancelled?: NotificationData
}

export interface ActionDescription extends Omit<ActionDescriptionWrapper, 'opened' | 'onClose'> { }

export const ConfirmationActionWrapper = ({
  opened,
  title,
  message,
  content,
  confirmLabel,
  cancelLabel,
  notificationCancelled,
  notificationDoneSuccess,
  notificationDoneError,
  onCancel,
  onConfirm,
  onClose
}: ActionDescriptionWrapper) => {

  const { moreThan: { windowMobile } } = useWindow()
  const theme = useMantineTheme()
  const [isPending, { open: pending, close: done }] = useDisclosure()

  const handleClose = useCallback(() => {
    done()
    onCancel?.()
    if (notificationCancelled) {
      notifications.show(notificationCancelled)
    }
    onClose?.()
  }, [done, onCancel, notificationCancelled, onClose])

  const handleDone = useCallback(async () => {
    try {
      pending()
      await onConfirm()
      if (notificationDoneSuccess) {
        notifications.show(notificationDoneSuccess)
      }
    } catch (error) {
      if (notificationDoneError) {
        notifications.show(notificationDoneError)
      }
      console.error('Confirmation action failed:', error)
    } finally {
      done()
      onClose?.()
    }
  }, [pending, onConfirm, notificationDoneSuccess, notificationDoneError, done, onClose])

  return (
    <Drawer
      offset={windowMobile ? 0 : 8}
      radius='lg'
      opened={opened || false}
      onClose={handleClose}
      title={title}
      position='bottom'
      size={"xs"}
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 4,
        bg: rgba(theme.colors.secondary[9], 0.5),
      }}
      styles={{
        "root": {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        ...(windowMobile ? {} : {
          inner: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }),
        "content": {
          display: 'flex',
          width: windowMobile ? '100%' : 'auto',
          maxWidth: windowMobile ? '100%' : '350px',
          flexDirection: 'column',
          borderRadius: windowMobile ? `${theme.spacing.lg} ${theme.spacing.lg} 0 0` : theme.spacing.lg,
        },
        "body": {
          padding: 0,
          overflow: 'hidden',
        },
        header: {
          alignItems: typeof title === 'string' ? 'center' : 'start',
        }
      }}
    >
      <Flex
        gap="lg"
        direction="column"
        justify="start"
        ps='sm'
        pe='sm'
        style={{
          height: "100%",
          overflow: 'hidden',
        }}>

        <Title
          ta={'center'}
          flex={1}
          order={5}>
          {message || "Êtes-vous sûr de vouloir effectuer cette action ?"}
        </Title>

        {!isPending ? (
          typeof content === 'string' ?
            <Text c='dimmed' ta={'center'}>{content}</Text> :
            content
        ) : null}

        <Flex justify='center' align='center'>
          {isPending && (
            <ThemeIcon
              variant='white'
              size="xl"
              radius="xl"
            >
              <Loader size={40} />
            </ThemeIcon>
          )}
        </Flex>
      </Flex>

      <Flex
        gap="md"
        justify="center"
        align="center"
        style={{
          padding: windowMobile ? theme.spacing.sm : theme.spacing.md,
          position: 'absolute',
          bottom: '0%',
          width: '100%',
          boxShadow: '0 -1px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 0,
          zIndex: 1000,
          backgroundColor: theme.colors.white[9],
        }}
      >
        <Button
          radius="md"
          onClick={handleDone}
          loading={isPending}>
          {confirmLabel || 'Continuer'}
        </Button>
        {cancelLabel && (
          <Button
            color='error.9'
            radius="md"
            onClick={handleClose}
            disabled={isPending}>
            {cancelLabel || 'Annuler'}
          </Button>
        )}
      </Flex>
    </Drawer>
  );
};
ConfirmationActionWrapper.id = "ConfirmationActionWrapper"

export interface DrawerManagerType<T = Record<string, any>> {
  id: string;
  data?: T;
  parentId?: string;
  useParentData?: boolean;
}

export const DrawerContext = createContext<{
  openDrawer: (drawer: DrawerManagerType) => void;
  isOpen: (id: string) => boolean;
  closeDrawer: (id: string) => void;
  getData: () => any | undefined;
  confirmationAction: (actionDescription: ActionDescription) => void
} | undefined>(undefined);

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [drawerOpen, setDrawerOpen] = useState<DrawerManagerType | undefined>(undefined);
  const [collectionDrawer, setCollectionDrawer] = useState<Record<string, DrawerManagerType>>({});
  const [confirmation, setConfirmation] = useState<ActionDescription | undefined>(undefined)

  const openDrawer = useCallback((drawer: DrawerManagerType) => {
    const parentId = drawer.parentId;
    if (parentId && drawerOpen && drawerOpen.id === parentId) {
      setCollectionDrawer(prev => ({ ...prev, [parentId]: drawerOpen }));
    }
    setDrawerOpen(drawer);
  }, [drawerOpen]);

  const isOpen = useCallback((id: string) => {
    return drawerOpen?.id === id;
  }, [drawerOpen]);

  const closeDrawer = useCallback((id: string) => {
    if (drawerOpen?.id === id) {
      // Nettoyer la confirmation si c'est le drawer de confirmation qui se ferme
      if (id === ConfirmationActionWrapper.id) {
        setConfirmation(undefined);
      }

      const parentId = drawerOpen.parentId;
      if (parentId) {
        const drawerParent = collectionDrawer[parentId];
        if (drawerParent) {
          setDrawerOpen(drawerParent);
          setCollectionDrawer(prev => {
            const newState = { ...prev };
            delete newState[parentId];
            return newState;
          });
          return;
        }
      }
      setDrawerOpen(undefined);
    }
  }, [collectionDrawer, drawerOpen]);

  const getData = useCallback(() => {
    return drawerOpen?.data;
  }, [drawerOpen, collectionDrawer, confirmation]);

  const confirmationAction = useCallback(
    (actionDescription: ActionDescription) => {
      setConfirmation(actionDescription)
      openDrawer({
        id: ConfirmationActionWrapper.id,
        parentId: drawerOpen?.id
      })
    },
    [drawerOpen, openDrawer]
  )

  // Mémoriser la valeur du contexte pour éviter les re-rendus inutiles
  const contextValue = useMemo(() => ({
    isOpen,
    openDrawer,
    closeDrawer,
    getData,
    confirmationAction
  }), [isOpen, openDrawer, closeDrawer, getData, confirmationAction]);

  return (
    <DrawerContext.Provider value={contextValue}>
      <>
        {confirmation && (
          <ConfirmationActionWrapper
            opened={isOpen(ConfirmationActionWrapper.id)}
            onClose={() => closeDrawer(ConfirmationActionWrapper.id)}
            {...confirmation}
          />
        )}
      </>
      {children}
    </DrawerContext.Provider>
  );
};