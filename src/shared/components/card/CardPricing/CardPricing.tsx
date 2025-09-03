import { CTAButton } from '@shared/components/button';
import cls from './card-pricing.module.css';

import {
  Card,
  Flex,
  List,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'

export interface CardPricingProps {
  title: string,
  price: string,
  features: string[]
  isPopular?: boolean,
  style?: React.CSSProperties;
};

export const CardPricing = ({
  title,
  price,
  features,
  isPopular,
  style
}: CardPricingProps) => {

  const theme = useMantineTheme()

  return (

    <Card
      padding="xl"
      radius="lg"
      style={[
        {
          "--popular-color": theme.colors.secondary[4],
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: theme.spacing.md,
        },
        style,
      ]}
      className={`${cls["pricing-card"]}  ${isPopular && cls["pricing-card-is-popular"]
        }`}
    >
      <Stack>
        <Title
          order={5}
          size="md"
          fw={900}
          ta="center"
          tt="uppercase"
          style={{ fontVariant: "small-caps" }}
        >
          {title}
        </Title>

        <Flex ta="center" justify="center" align="center">
          <Title order={1} fw={900} ta="center" c="primary">
            {price}
          </Title>
          <Text size="xs" c="dimmed">
            /mois
          </Text>
        </Flex>

        <List>
          {features.map((feature, index) => {
            return <List.Item key={index}>{feature}</List.Item>;
          })}
        </List>
      </Stack>

      <Flex justify="center" style={{ paddingBlock: "0.8rem" }}>
        <CTAButton title="Commencer" mode="filled" onClick={() => { }} />
      </Flex>
    </Card>

  );
};
