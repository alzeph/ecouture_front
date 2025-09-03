// import styles from './list-item.module.css';
import { useWindow } from '@features/core/hook';
import { ActionIcon, Flex, Group, Menu, Skeleton, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import type React from 'react';

export interface ListItemSewingProps {
  leftSection?: React.ReactNode,
  rightSection?: React.ReactNode
  title?: string,
  titleProps?: React.ComponentProps<typeof Title>
  description?: string
  descriptionProps?: React.ComponentProps<typeof Text>
  content?: React.ReactNode
  menu?: React.ComponentProps<typeof Menu.Dropdown>
  containerProps?: React.ComponentProps<typeof Flex>
  skeleton?: boolean;
}

export const ListItemSewing = ({
  leftSection,
  rightSection,
  title,
  description,
  content,
  titleProps,
  descriptionProps,
  menu,
  containerProps,
  skeleton = false }: ListItemSewingProps) => {
  const { moreThan: { windowMobile } } = useWindow()

  return skeleton ? (
    <Flex gap={windowMobile ? 'sm' : 'xl'} justify='space-between' align={windowMobile ? 'flex-start' : 'center'} p='sm' wrap="nowrap">
      <Group flex={1} align={'center'} justify='center' wrap='nowrap'>
        <Skeleton height={50} circle />
        <Stack gap={'sm'} flex={1} align='center'>
          <Skeleton height={10} radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Stack>
      </Group>
    </Flex>

  ) : (
    <Flex p="sm" gap={windowMobile ? 'xs' : 'sm'} justify='space-between' align={'flex-start'} wrap="nowrap" {...containerProps}>
      {leftSection}
      <Group gap={0} flex={1} align={'start'} justify='space-between' wrap='nowrap'>
        <Stack gap={0}>
          {description ? (
            <Stack gap={0}>
              <Title ta={"left"} order={6} {...titleProps}>{title}</Title>
              <Text ta={"left"} size='sm' c='dimmed' {...descriptionProps}>{description}</Text>
            </Stack>) :
            (
              <Text size='sm' c='dimmed' {...descriptionProps}>{title}</Text>
            )
          }
          {content}
          {/* <Stack mt="sm">
            {windowMobile && rightSection}
          </Stack> */}
        </Stack>

        {menu &&
          <Group justify='center' align={'start'}>
            <Menu shadow="md" width={250} >
              <Menu.Target>
                <ActionIcon variant='white' radius="lg">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown p="sm" {...menu} />
            </Menu>
          </Group>
        }
      </Group>
      {rightSection}
    </Flex>
  );
};
