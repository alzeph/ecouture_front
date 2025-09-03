import type { Meta, StoryObj } from '@storybook/react';
import { DrawerStack } from './DrawerStack';
import { useDrawerManager } from '@features/core/hook';
import { Button, Group, Text } from '@mantine/core';
import { useState } from 'react';

const meta: Meta<typeof DrawerStack> = {
  title: 'features/core/components/DrawerStack',
  component: DrawerStack,
  tags: ['autodocs'],
};

const EmptyComponent = () => {
  return (
    <>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
      <Text> voic mes enfant</Text>
    </>
  )
}

export default meta;
type Story = StoryObj<typeof DrawerStack>;

export const Default: Story = {
  render: () => {
    const id = "test"
    const { openDrawer } = useDrawerManager()


    return (
      <>
        <Button onClick={() => openDrawer({ id })}>Ouvrir</Button>
        <DrawerStack offset={8} id={id}>
        </DrawerStack>

      </>
    )
  },
  args: {},
};

export const WithUseData: Story = {
  render: () => {
    const id = "test"
    const { openDrawer, getData } = useDrawerManager()


    return (
      <>
        <Button onClick={() => openDrawer({ id })}>Ouvrir</Button>
        <DrawerStack offset={8} id={id}>
          sdbjfb
          <Button onClick={() => openDrawer({ id: "child", parentId: id, data: { customer: 1, order: 1 } })}>Ouvrir l'enfant</Button>
        </DrawerStack>
        <DrawerStack
          position='right'
          offset={8}
          id={"child"}>
          <Text>
            data {JSON.stringify(getData())}
          </Text>
          <EmptyComponent />
        </DrawerStack>
      </>
    )
  },
  args: {},
};


export const WithAllOption: Story = {
  render: () => {
    const id = "test"
    const { openDrawer } = useDrawerManager()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSumbitSumilator =()=>{
      setIsLoading(true)
      setTimeout(()=>setIsLoading(false), 3000)
    }

    return (
      <>
        <Button onClick={() => openDrawer({ id })}>Ouvrir</Button>
        <DrawerStack
          id={id}
          title="Création"
          isLoading ={isLoading}
          footerSection={
            <Group>
              <Button>Annuler</Button>
              <Button onClick={handleSumbitSumilator}>Continuer</Button>
            </Group>
          }>
          <EmptyComponent />

        </DrawerStack >

      </>
    )
  },
  args: {},
};
