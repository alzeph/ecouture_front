import type React from 'react';
// import styles from './button-icon.module.css';
import type { IconProps } from '@tabler/icons-react';
import {
  Button,
  getContrastColor,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
  type MantineColor,

} from '@mantine/core';
import type { ComponentProps } from 'react';

export interface ButtonIconProps extends ComponentProps<typeof Button> {
  title: string;
  description?: string
  mode?: "filled" | "default";
  color?: MantineColor;
  sectionLeft: {
    icon: React.FC<IconProps>;
    props?: Omit<IconProps, 'color' | 'size'>;
  };
  sectionRight?: {
    icon: React.FC<IconProps>;
    props?: Omit<IconProps, 'color' | 'size'>;
  };
  onClick?: () => void;
  buttonProps?: Omit<
    React.ComponentProps<typeof Button>,
    'children' | 'leftSection' | 'rightSection' | 'onClick' | 'variant'
  >;
}

export const ButtonIcon = ({
  title,
  description,
  sectionLeft,
  sectionRight,
  onClick,
  buttonProps,
  mode = "default",
  color = 'gray.2',
  ...rest
}: ButtonIconProps) => {

  const LeftIcon = sectionLeft.icon;
  const RightIcon = sectionRight?.icon;
  const theme = useMantineTheme()

  return (
    <Button
      {...rest}
      onClick={onClick}
      leftSection={
        <ThemeIcon color="gray.3" radius="100%" size={40}>
          <LeftIcon  {...sectionLeft.props} />
        </ThemeIcon>
      }
      {...(RightIcon && {
        rightSection: <ThemeIcon color='white' radius={"100%"} size={30} p="xs" c={'text'}><RightIcon {...sectionRight!.props} /></ThemeIcon>,
      })}
      variant={mode}
      color={color}
      radius="100px"
      styles={{
        'root': {
          height: 'fit-content',
          padding: '6px',
          display: 'flex'
        },
        "inner": {
          height: "100%",
        },

      }}
      {...buttonProps}
    >
      {description ? (
        <Stack gap={0} pe="sm">
          <Title ta="left" order={6} c={mode === 'filled' ? 'text' : 'dimmed'}>{title}</Title>
          <Text ta="left" size='sm' c='dimmed'>{description}</Text>
        </Stack>
      ) : (
        <Text c={mode === 'filled' ? color != 'gray.2' ? getContrastColor({ color, theme, autoContrast: true }) : 'text' : 'dimmed'}>{title}</Text>
      )}
    </Button>
  );
};
