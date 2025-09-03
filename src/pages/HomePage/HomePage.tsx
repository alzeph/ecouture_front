import { useAuth, useDrawerManager, useWindow } from "@features/core/hook";
import { ActionIcon, AppShell, Avatar, Badge, Container, Flex, Grid, Group, Menu, NavLink, rgba, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { CardFeature, CardPricing, CTAButton } from "@shared/components";
import { IconMoon2, IconRulerMeasure, IconSettings, IconSun, IconTrash, IconUserEdit } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import logoCouture from "@assets/logo/logo.png"
import bgHero from "@assets/img/hero.png"

import styles from './home-page.module.css';
import { ROUTES } from "@shared/constants";
import { LoginForm } from "@features/users/components/form";
import { WorkerOrderWorkshopForm, WorkshopCreateForm } from "@features/workshop/components/form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { APP_NAME } from "@features/core/constants";
import { getPageParam, responseExtractData, responseTraited } from "@shared/api";

export interface HomePageProps { }

export const HomePage = ({ }: HomePageProps) => {

  const { worker, isAuthenticated, proxy } = useAuth()
  const { openDrawer } = useDrawerManager()
  const navigate = useNavigate()
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  const theme = useMantineTheme()
  const { moreThan: { windowMobile } } = useWindow()

  const {
    data: packages,
    // isLoading: isLoadingPackages,
    // fetchNextPage: fetchNextPagePackages,
  } = useInfiniteQuery({
    queryKey: [APP_NAME, 'packages'],
    queryFn: async ({ pageParam }) => {
      const response = await responseTraited(({
        queryFn: () => proxy.api.workshopPackageListList({ page: pageParam })
      }))
      return responseExtractData(response)
    },
    initialPageParam: 1,
    getNextPageParam: (response) => getPageParam({ response, name: 'next' }),
    getPreviousPageParam: (response) => getPageParam({ response, name: 'previous' }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })
  return (
    <AppShell
      padding="md"
      header={{ height: '60', }}
    >
      <AppShell.Header style={{ alignItems: "center", justifyContent: 'center', display: 'flex', position: "sticky" }}>
        <div style={{ paddingInline: theme.spacing.sm, width: '100%' }}>
          <Flex justify='space-between' align='center' style={{ width: '100%' }}>
            <ActionIcon
              variant='transparent'
              onClick={toggleColorScheme}
              size="lg">
              {colorScheme === 'dark' ? (
                <IconMoon2 />
              ) : (
                <IconSun />
              )}
            </ActionIcon>
            <img src={logoCouture} style={{ height: 30, width: 30 }} width={40} />
            <Flex flex={1} justify="center">
              <Group wrap="nowrap" justify="center">
                <NavLink
                  href="#features"
                  label="Fonctionnalité"
                  className={`${styles["nav-link"]}`}
                  fw="900"
                  style={{ borderRadius: theme.radius.lg }}
                />

                <NavLink
                  href="#footer"
                  label="Contact"
                  fw="900"
                  className={`${styles["nav-link"]}`}
                  style={{ borderRadius: theme.radius.lg }}
                />
              </Group>
            </Flex>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar size='md' radius="100%" {...(worker && worker.user && { name: `${worker.user.last_name} ${worker.user.first_name}` })} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                {isAuthenticated ? (
                  <Menu.Item
                    onClick={() => navigate(ROUTES.DASHBOARD)}
                    leftSection={<IconUserEdit size={14} />}
                  >
                    Dashboard
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    onClick={() => openDrawer({ id: LoginForm.id })}
                    leftSection={<IconUserEdit size={14} />}
                  >
                    Connexion
                  </Menu.Item>
                )}
                <Menu.Item
                  disabled={!isAuthenticated}
                  onClick={() => navigate(ROUTES.PROFILE)}
                  leftSection={<IconUserEdit size={14} />}
                >
                  Profil
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item
                  disabled={!isAuthenticated}
                  onClick={() => navigate(ROUTES.SETTINGS)}
                  leftSection={<IconSettings size={14} />}
                >
                  Settings
                </Menu.Item>
                {isAuthenticated && (
                  <Menu.Item
                    color="red"
                    onClick={() => openDrawer({ id: LoginForm.id })}
                    leftSection={<IconTrash size={14} />}
                  >
                    deconnexion
                  </Menu.Item>)}
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </div>
      </AppShell.Header>

      <AppShell.Main p={0} style={{ border: 'none' }}>
        {/* start zone hero */}
        <div
          className={styles["hero"]}
          style={{
            "--hero-bg": colorScheme === 'dark' ? theme.colors.primary[9] : theme.colors.primary[0],
            "--hero-bg-decoration": windowMobile ? colorScheme === 'dark' ? theme.colors.primary[9] : theme.colors.primary[1] : `url(${bgHero})`,
            "--radius-decoration": theme.radius.xl,
          } as React.CSSProperties
          }
        >
          <Container size="xl">
            <Grid
              style={{ padding: theme.spacing.md }}
              justify={windowMobile ? 'center' : 'start'}
              className={`${styles["hero-content"]}`}
              gutter={theme.spacing.xl}
            >
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xl">
                  <Title order={1}>Gerer votre profil atelier comme un pro</Title>
                  <Text c="primary" size="xl">
                    L'application qui révolutionne la gestion d'atelier de couture
                  </Text>
                  <Text size="lg" c="dimmed">
                    Fini les carnets de rendez-vous griffonnés et les mesures
                    perdues ! E-Couture centralise tout : commandes, suivi des
                    créations, notifications clients, et bien plus encore. Votre
                    atelier n'a jamais été aussi organisé !
                  </Text>

                  <Group justify="start">
                    <Stack gap="xs" align="center">
                      <Title order={1} c="secondary">
                        +500
                      </Title>
                      <Text c="dimmed">Couturiers actifs</Text>
                    </Stack>
                    <Stack gap="xs" align="center">
                      <Title order={1} c="secondary">
                        98%
                      </Title>
                      <Text c="dimmed">Satisfaction client</Text>
                    </Stack>
                    <Stack gap="xs" align="center">
                      <Title order={1} c="secondary">
                        24h/7
                      </Title>
                      <Text c="dimmed">Support disponible</Text>
                    </Stack>
                  </Group>

                  <Group>
                    <CTAButton
                      title="Commencer avec e-couture"
                      mode="filled"
                      onClick={() => {
                        isAuthenticated ? navigate(ROUTES.DASHBOARD) : openDrawer({ id: WorkerOrderWorkshopForm.id })
                      }}
                    />
                  </Group>

                  <Group>
                    {[
                      "✓ Essai gratuit 14 jours",
                      "✓ Sans engagement",
                      "✓ Support français",
                    ].map((badge, index) => {
                      return (
                        <Badge
                          key={`${badge}${index}`}
                          p="lg"
                          c="secondary"
                          className={`${styles["badge"]}`}
                          color={rgba(theme.colors.secondary[8], 0.1)}
                          style={{
                            "--hero-badge-color": theme.colors.secondary[3],
                          }}
                        >
                          {badge}
                        </Badge>
                      );
                    })}
                  </Group>
                </Stack>
              </Grid.Col>

            </Grid>
          </Container>
        </div>
        {/* end zone hero */}


        {/* features */}
        <div
          style={{
            paddingBlock: theme.spacing.xl,
            backgroundColor: colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.background[0],
          }}
        >
          <Container size="xl" p={"xl"} id="features">
            <Stack gap="xl">
              <Title order={1} fw={900} ta="center">
                Tout ce qu'il faut pour faire tourner votre atelier
              </Title>
              <Grid>
                {Array.from({ length: 8 }).map((_, index) => {
                  return (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={index}>
                      <CardFeature
                        icon={{
                          Icon: IconRulerMeasure,
                          position: "center",
                          iconProps: { size: "5rem" },
                        }}
                        title="Suivi des mesures"
                        titleStyle={{ ta: "center" }}
                        content="E-Couture centralise tout : commandes, suivi des création, notifications clients, et bien plus encore. Votre atelier n'a jamais been so organised !"
                        contentStyle={{
                          ta: "center",
                          style: { maxWidth: "100%" },
                        }}
                        containerStyle={{
                          style: {
                            background: `linear-gradient(0deg, ${theme.colors.background[0]}, ${theme.colors.neutral[0]})`,
                          },
                        }}
                      />
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </div>
        {/* end features */}

        {/* start demo */}
        <div
          style={{
            paddingBlock: theme.spacing.xl,
            background: `linear-gradient(90deg, ${colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.primary[2]}, ${colorScheme === 'dark' ? theme.colors.secondary[9] : theme.colors.secondary[4]})`,
          }}
        >
          <Container
            size="md"
            p={"xl"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              style={{ paddingBlock: theme.spacing.xl }}
              align="stretch"
              gutter={"xl"}
            >
              <Grid.Col span={{ base: 12, md: 6 }} p={"xl"}>
                <Stack gap="xl">
                  <Title order={1} c="white" fw={900}>
                    Voyez E-Couture en action
                  </Title>
                  <Text c="dimmed">
                    Découvrez comment notre application transforme la gestion de
                    votre atelier en quelques clics seulement. Simple, intuitif,
                    et terriblement efficace !
                  </Text>
                  <CTAButton
                    title="Essayer la demo gratuite"
                    mode="filled"
                    onClick={() => {
                      isAuthenticated ? navigate(ROUTES.DASHBOARD) : openDrawer({ id: WorkshopCreateForm.id })
                    }}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col
                p={"xl"}
                span={{ base: 12, md: 6 }}
                className={styles["demo-init"]}
                style={{
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.lg,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <Title order={5} ta={"center"} c="white" fw={600}>
                    Version de base gratuite
                  </Title>
                  <Text ta={"center"} c="white">
                    3 mois d'acces a tous
                  </Text>
                  <Text ta={"center"} c="white">
                    Workflow optimisé
                  </Text>
                  <Text ta={"center"} c="white">
                    Résultats immédiats
                  </Text>
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </div>
        {/* end demo */}

        {/* start pricing */}
        <div
          style={{
            paddingBlock: theme.spacing.xl,
            backgroundColor: theme.colors.text[9],
          }}
        >
          <Container size="md" p={"xl"}>
            <Stack gap="xl">
              <Title ta="center" order={1} c="secondary">
                Choisissez votre formule
              </Title>
              <Text ta="center" c="white">
                Des options adaptées à chaque taille d'atelier
              </Text>
              <Grid justify="center" align="center">
                {packages?.pages
                  ?.flatMap((page) => page.results)
                  .map((pkg) => (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={pkg.pk}>
                      <CardPricing
                        title={pkg.name}
                        price={pkg.price}
                        features={pkg.features}
                        isPopular={pkg.pk === 2}
                      />
                    </Grid.Col>

                  ))}
              </Grid>
            </Stack>
          </Container>
        </div>

        {/* end pricing */}

      </AppShell.Main>

      <AppShell.Footer m={0} style={{ position: 'relative', border: 'none' }}>
        <Stack
          id="footer"
          style={{
            width: "100%",
            height: "100%",
            padding: "2rem",
            gap: "2rem",
            backgroundColor: theme.colors.text[9],
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text size="xl" fw={800} c="white">
            Prêt a revolutionner votre atelier ?
          </Text>
          <Text c="white">
            Rejoignez déjà des centaines de couturiers qui ont choisi E-Couture
          </Text>
          {/* callbutton */}
          <Group>
            <CTAButton
              onClick={() => {
                isAuthenticated ? navigate(ROUTES.DASHBOARD) : openDrawer({id:WorkshopCreateForm.id})
              }}
              title="Commencer maintenant"
              mode="filled"
            />
            <CTAButton
              onClick={() => console.log("Call Button Clicked")}
              title="Nous contacter"
              mode="outlined"
            />
          </Group>
          <Text c="dimmed">© 2025 E-Couture. Tous droits réservés.</Text>
        </Stack>
      </AppShell.Footer>
    </AppShell>
  );
};
