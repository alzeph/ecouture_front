import type { ComponentProps } from 'react';
import styles from './ctabutton.module.css';
import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core';

export interface CTAButtonProps {
  onClick: () => void;
  title: string;
  mode: "outlined" | "filled";
  gradient?: { from: string; to: string };
  rest?: Omit<ComponentProps<typeof Button>, "children" | "onClick" | "title">;
}

export const CTAButton = ({
  onClick,
  title,
  mode = "filled",
  gradient,
  rest,
}: CTAButtonProps) => {

  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const baseGradient = {
    from: gradient?.from || colorScheme === "dark" ? theme.colors.primary[7] : theme.colors.primary[2],
    to: gradient?.to || colorScheme === "dark" ? theme.colors.secondary[9] : theme.colors.secondary[4],
    deg: 90,
  };

  return (
    <Button
      onClick={onClick}
      className={`${styles[`cta-button-${mode}`]}`}
      variant={mode === "filled" ? "gradient" : "outline"}
      style={{
        "--gradient-from": gradient?.from || theme.colors.primary[2],
        "--gradient-to": gradient?.to || theme.colors.secondary[4],
      }}
      gradient={mode === "filled" ? baseGradient : undefined}
      radius="lg"
      //  p="xl" // 'p' pour padding
      size="lg"
      {...rest}
    >
      {title}
    </Button>
  );
};
