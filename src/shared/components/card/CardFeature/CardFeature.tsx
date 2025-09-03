import { Card, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { type Icon, type IconProps } from "@tabler/icons-react";
import type { ComponentProps } from "react";
// import classes from "./card-feature.module.css";
// import type { ComponentChildren } from "preact";

export type CardFeatureProps = {
  icon: {
    Icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<Icon>
    >;
    alt?: string;
    position: "left" | "right" | "center";
    iconProps?: Omit<ComponentProps<typeof ActionIcon>, "children">;
  };
  title: string;
  titleStyle?: Omit<ComponentProps<typeof Text>, "children">;
  content: string;
  contentStyle?: Omit<ComponentProps<typeof Text>, "children">;
  containerStyle?: Omit<ComponentProps<typeof Card>, "children">;
  onClick?: () => void;
};

/**
 * Renders a feature card component with an icon, title, and content.
 *
 * @param {CardFeatureProps} props - The properties for the CardFeature component.
 * @param {Object} props.icon - The icon configuration for the card.
 * @param {React.ForwardRefExoticComponent} props.icon.Icon - The icon component to render.
 * @param {string} [props.icon.alt] - The alt text for the icon.
 * @param {string} props.icon.position - The position of the icon in the card ("left", "right", "center").
 * @param {Object} [props.icon.iconProps] - Additional properties for the ActionIcon component.
 * @param {string} props.title - The title text of the card.
 * @param {Object} [props.titleStyle] - Custom styles for the title text.
 * @param {string} props.content - The content text of the card.
 * @param {Object} [props.contentStyle] - Custom styles for the content text.
 * @param {Object} [props.containerStyle] - Custom styles for the card container.
 * @param {Function} [props.onClick] - Callback function to be called on card click.
 *
 * @returns {JSX.Element} The rendered CardFeature component.
 */

export const CardFeature = ({
  icon,
  title,
  titleStyle,
  content,
  contentStyle,
  containerStyle,
  onClick,
}: CardFeatureProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Card
      bg={colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0]}
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      onClick={() => (onClick ? onClick() : console.log("click"))}
      {...containerStyle}
    >
      <Card.Section
        display="flex"
        style={{
          justifyContent: icon.position,
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <ActionIcon
          variant="gradient"
          size="lg"
          aria-label="Gradient action icon"
          gradient={{
            from: colorScheme === "dark" ? theme.colors.primary[7] : theme.colors.primary[2],
            to: colorScheme === "dark" ? theme.colors.secondary[9] : theme.colors.secondary[4],
            deg: 90,
          }}
          radius="xl"
          {...icon.iconProps}
        >
          <icon.Icon style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Card.Section>
      <Text size="xl" mt="md" ta="center" fw={700} {...titleStyle}>
        {title}
      </Text>
      <Text
        size="sm"
        c="dimmed"
        ta="center"
        {...contentStyle}
      >
        {content}
      </Text>
    </Card>
  );
};