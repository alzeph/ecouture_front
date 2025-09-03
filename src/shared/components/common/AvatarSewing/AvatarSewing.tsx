import { Group, Avatar, Stack, Text, Title, Indicator } from '@mantine/core';
import { useMemo, type ComponentProps } from 'react';
// import styles from './avatar-sewing.module.css';

export interface AvatarSewingProps extends ComponentProps<typeof Avatar> {
  name: string
  username: string
  photo?: string
  noName?: boolean
  withIndicator?: boolean
  indicatorProps?: ComponentProps<typeof Indicator>
}

export const AvatarSewing = ({ name, username, photo, noName = false, indicatorProps, withIndicator = false, ...rest }: AvatarSewingProps) => {
  const avatar =
    useMemo(() => {
      return (
        photo ? (
        <Avatar size="md" src={photo} alt={`Photo de profil de ${name}`} {...rest} />
      ) : (
        name.trim().split(/\s+/).length > 2 ? (
          <Avatar size="md" name={name} color="initials" {...rest} />
        ) : (
          <Avatar size="md" name={`${name} ${username}`} color="initials" {...rest} />
        )
      )
      )
    }, [photo, name, username, rest])

  

  return (
    <Group gap="sm" wrap='nowrap' align='flex-start'>
      {withIndicator ? <Indicator {...indicatorProps}>{avatar}</Indicator> : avatar}
      {!noName && 
      <Stack gap={0}>
        <Title order={6}>{name}</Title>
        <Text size='sm' c='dimmed'>{username}</Text>
      </Stack>}
    </Group>
  );
};
