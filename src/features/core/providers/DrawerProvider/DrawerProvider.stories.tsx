import type { Meta, StoryObj } from '@storybook/react';
import { DrawerProvider } from './DrawerProvider';
import { useConfirmationAction, useDrawerManager } from '@features/core/hook';
import { Button, Drawer, Text } from '@mantine/core';

const meta: Meta<typeof DrawerProvider> = {
  title: 'features/core/providers/DrawerProvider',
  component: DrawerProvider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DrawerProvider>;

export const Default: Story = {
  render: () => {
    const id = "test-drawer"
    const { isOpen, closeDrawer, openDrawer } = useDrawerManager()

    return (
      <>
        <Button onClick={() => openDrawer({ id })}>ouvrir</Button>
        <Text>
          isOpen : {isOpen(id)}
        </Text>
        <Drawer
          offset={8}
          radius="lg"
          opened={isOpen(id)}
          onClose={() => closeDrawer(id)}
        >
          mon drwer est ouvert
        </Drawer>
      </>
    )

  },
  args: {},
};


export const WithParent: Story = {
  render: () => {
    const id = "test-drawer"
    const p_id = "parent_test-drawer"
    const { isOpen, closeDrawer, openDrawer } = useDrawerManager()

    return (
      <>
        <Button onClick={() => openDrawer({ id: p_id })}>ouvrir</Button>
        <Text>
          isOpen : {isOpen(id)}
        </Text>
        <Drawer
          offset={8}
          radius="lg"
          opened={isOpen(p_id)}
          onClose={() => closeDrawer(p_id)}
        >
          mon drawer parent est ouvert
          <Button onClick={() => openDrawer({ id, parentId: p_id })}>ouvrir l'enfant</Button>
        </Drawer>
        <Drawer
          offset={8}
          radius="lg"
          opened={isOpen(id)}
          onClose={() => closeDrawer(id)}
        >
          mon drawer enfant est ouvert
        </Drawer>
      </>
    )

  },
  args: {},
};

export const WithConfirmationAction: Story = {
  render: () => {
    const confirmation = useConfirmationAction();

    return <Button onClick={() => confirmation({
      title: 'Confirmation',
      message: 'Etes-vous sur de vouloir effectuer cette action',
      content: 'lorem ipsum dolor tempor incididunt ut labore et veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      confirmLabel: 'Continuer',
      cancelLabel: 'Annuler',
      onConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      },
      notificationDoneSuccess: {
        title: 'Action effectuée',
        message: 'Action effectuée',
        color: 'success.9',
      },
      notificationDoneError: {
        title: 'Action echouée',
        message: 'Action echoué',
        color: 'error.9',
      },
      notificationCancelled: {
        title: 'Action annulée',
        message: 'Action annulée',
        color: 'error.9',

      },
    })}>Confirmer action</Button>
  }
}


export const WithConfirmationAndParent: Story = {

  render: () => {
    const id = "test-drawer"
    const p_id = "parent_test-drawer"
    const { isOpen, closeDrawer, openDrawer } = useDrawerManager()
    const confirmation = useConfirmationAction()

    return (

      <>
        <Button onClick={() => openDrawer({ id: p_id })}>ouvrir</Button>
        <Text>
          isOpen : {isOpen(id)}
        </Text>
        <Drawer
          offset={8}
          radius="lg"
          opened={isOpen(p_id)}
          onClose={() => closeDrawer(p_id)}
        >
          mon drawer parent est ouvert
          <Button onClick={() => openDrawer({ id, parentId: p_id })}>ouvrir l'enfant</Button>
        </Drawer>
        <Drawer
          offset={8}
          radius="lg"
          opened={isOpen(id)}
          onClose={() => closeDrawer(id)}
        >
          mon drawer enfant est ouvert
          <Button onClick={() => confirmation({
            title: 'Confirmation',
            message: 'Etes-vous sur de vouloir effectuer cette action',
            content: 'lorem ipsum dolor tempor incididunt ut labore et veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            confirmLabel: 'Continuer',
            cancelLabel: 'Annuler',
            onConfirm: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 2000);
              });
            },
            notificationDoneSuccess: {
              title: 'Action effectuée',
              message: 'Action effectuée',
              color: 'success.9',
            },
            notificationDoneError: {
              title: 'Action echouée',
              message: 'Action echoué',
              color: 'error.9',
            },
            notificationCancelled: {
              title: 'Action annulée',
              message: 'Action annulée',
              color: 'error.9',

            },
          })}>Confirmer action</Button>
        </Drawer>

      </>
    )
  }
}