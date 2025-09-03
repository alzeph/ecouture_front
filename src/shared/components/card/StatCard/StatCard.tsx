// import styles from './stat-card.module.css';

import { Card, getContrastColor, Group, Skeleton, Stack, Text, ThemeIcon, Title, useMantineTheme, type CardProps, type MantineColor } from "@mantine/core";
import { IconTrendingUp2, type IconProps } from "@tabler/icons-react";
import { useMemo } from "react";

export interface StatCardProps extends Omit<CardProps, 'children'> {
  titleHover?: string | number;
  title?: string | number;
  subtitle?: string | number;
  icon?: {
    icon: React.FC<IconProps>;
    props?: Omit<IconProps, 'size'>;
  };
  color?: MantineColor
  skeleton?: boolean,

}

export const StatCard = ({ titleHover, title, subtitle, icon = { icon: IconTrendingUp2 }, color = 'gray.2', skeleton = false, ...rest }: StatCardProps) => {

  const Icon = useMemo(() => icon.icon, [icon.icon]);
  const theme = useMantineTheme()
  return skeleton ? (
    <Skeleton mah={140} mih={120} height="100%" p="md" radius="lg" bg={color} />
  ) : (
    <Card
      shadow="sm"
      padding="md"
      component="article"
      style={{ height: "100%" }}
      radius="lg"
      bg={color}
      c={getContrastColor({ color, theme, autoContrast: true })}
      {...rest}
    >
      <Stack justify="space-between" h={"100%"} gap={0}>
        <Group flex={1} justify="space-between" align="start">
          <Title order={6}>{titleHover}</Title>
          <ThemeIcon
            radius="100%"
            size={40}
            variant="default"
            c={color}
            bg={getContrastColor({ color, theme, autoContrast: true })}>

            <Icon {...icon.props} />
          </ThemeIcon>
        </Group>
        <Stack gap={0}>
          <Title ta={"left"} order={1}>{title}</Title>
          <Text ta={"left"} size="sm" c='dimmed'>{subtitle}</Text>
        </Stack>
      </Stack>
    </Card>
  );
};
