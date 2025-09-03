

//import styles from './dashboard-page.module.css';

import { useAuth, useWindow } from "@features/core/hook";
import { Flex, Grid, Group, Menu, Paper, Skeleton, Text, Title, useMantineTheme } from "@mantine/core";
import { DatePicker, type DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { OrderWorkshopReadGenderEnum, type OrderWorkshopRead, type StatOrdersWorkshop } from "@shared/api";
import { ButtonIcon, StatCard } from "@shared/components";
import { getPeriodFromDateOrRange } from "@shared/utils";
import { IconCalendar, IconChartFunnel, IconChevronDown, IconCsv, IconDatabaseExport, IconFileCvFilled, IconFileExcel, IconMan, IconSchema, IconShare3, IconWoman } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { millify } from "millify";
import { BarChart, LineChart, PieChart } from "@mantine/charts";

export interface DashboardPageProps { }

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;
  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export const DashboardPage = ({ }: DashboardPageProps) => {

  const { moreThan: { windowMobile, windowTablet } } = useWindow()

  const [dataPeriode, setDataPeriode] = useState(getPeriodFromDateOrRange())
  const [valuecalendar, setValueCalendar] = useState<[DateValue, DateValue]>([dataPeriode.drf.start, dataPeriode.drf.end])

  const [filter, setFilter] = useState<OrderWorkshopRead['gender'] | undefined>(undefined)
  const [openedPeriodMenu, { toggle: togglePeriodMenu }] = useDisclosure();

  const theme = useMantineTheme();
  const { workshop, isAuthenticated, proxy } = useAuth()

  const canFetch = !!(workshop?.slug && dataPeriode && isAuthenticated);

  const { data: statisticOrdersWorkshops, isLoading: isLoadingStatisticOrderWorkshop } = useQuery({
    queryKey: ["statisticOrderWorkshop", workshop?.slug, dataPeriode.verbose],
    queryFn: async () => {
      if (workshop) {
        const response = await proxy.api.apiWorkshopStatsOrdersRetrieve({
          slug: workshop.slug,
          created_after: dataPeriode.drf.start,
          created_before: dataPeriode.drf.end,
        })
        return response.data as StatOrdersWorkshop
      }
      // return {} as StatOrdersWorkshop
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    enabled: canFetch,
    retry: canFetch,

  });

  return (
    <Grid gutter="md">
      {/* // HEADER */}
      <Grid.Col span={{ base: 12 }}>
        <Grid justify="space-between">
          <Grid.Col span={{ base: 12, sm: 4 }} flex={1}>
            <Title order={1} c='text'>Bienvenue</Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Group justify={windowTablet ? 'end' : 'start'} style={{ position: 'relative' }}>
              {/* PERIODE DE DATA */}
              <Menu
                trigger="click"
                opened={openedPeriodMenu}
                onChange={togglePeriodMenu}
              >

                <Menu.Target>
                  <ButtonIcon title="periode" sectionLeft={{ icon: IconCalendar }} sectionRight={{ icon: IconChevronDown }} description={dataPeriode.verbose} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>prédefinis</Menu.Label>
                  <Menu.Item>Aujourd'hui</Menu.Item>
                  <Menu.Item>Cette semaine</Menu.Item>
                  <Menu.Item >Ce mois ci</Menu.Item>
                  <Menu.Label>Calendrier</Menu.Label>
                  <Menu.Divider />

                  <DatePicker
                    type="range"
                    value={valuecalendar}
                    onChange={(values) => {
                      setValueCalendar(values)
                      if (
                        values[1] && values[0] &&
                        values[1] !== null && values[0] != null) {
                        setDataPeriode(getPeriodFromDateOrRange([values[0], values[1]]))
                        togglePeriodMenu()
                      }
                    }}

                  />


                </Menu.Dropdown>
              </Menu>
              {/* Filtre */}
              <Menu>
                <Menu.Target>
                  <ButtonIcon
                    title="Filtre"
                    sectionLeft={{ icon: IconChartFunnel }}
                    sectionRight={{ icon: IconChevronDown }}
                    description={
                      filter === 'CHILDREN' ? 'enfants' : filter === 'MAN' ? 'hommes' : filter === 'WOMAN' ? 'femmes' : undefined
                    } />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Type de vêtement</Menu.Label>
                  <Menu.Item onClick={() => setFilter(OrderWorkshopReadGenderEnum.MAN)} leftSection={<IconMan />}>Homme</Menu.Item>
                  <Menu.Item onClick={() => setFilter(OrderWorkshopReadGenderEnum.WOMAN)} leftSection={<IconWoman />}>Femme</Menu.Item>
                  <Menu.Item onClick={() => setFilter(OrderWorkshopReadGenderEnum.CHILDREN)} leftSection={<IconSchema />}>Enfant</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item onClick={() => setFilter(undefined)}>Restaurer</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {/* EXPORTER DATA */}
              <Menu>
                <Menu.Target>
                  <ButtonIcon color="black.1" mode="filled" title="Exporter" sectionLeft={{ icon: IconDatabaseExport }} sectionRight={{ icon: IconShare3 }} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Format</Menu.Label>
                  <Menu.Item leftSection={<IconFileExcel />}>Excel</Menu.Item>
                  <Menu.Item leftSection={<IconCsv />}>CSV</Menu.Item>
                  <Menu.Label>Contact</Menu.Label>
                  <Menu.Item leftSection={<IconFileCvFilled />}>vCard</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      {/* Card stat */}
      <Grid.Col span={{ base: 12 }} mt="lg">
        <Grid align="stretch">

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              skeleton={isLoadingStatisticOrderWorkshop}
              titleHover="Finance"
              title={millify(statisticOrdersWorkshops?.total_amount || 0)}
              subtitle="Chiffre d'affaires estimé"
              color="primary.9"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              skeleton={isLoadingStatisticOrderWorkshop}
              titleHover="Commandes"
              title={statisticOrdersWorkshops?.total_orders || 0}
              subtitle="Toutes les commandes"
              color="gray.2"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              skeleton={isLoadingStatisticOrderWorkshop}
              titleHover="Commandes"
              title={statisticOrdersWorkshops?.total_paid || 0}
              subtitle="Commandes payées"
              color="gray.2"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              skeleton={isLoadingStatisticOrderWorkshop}
              titleHover="Commandes"
              title={statisticOrdersWorkshops?.total_in_progress || 0}
              subtitle="Commande en cours"
              color="gray.2"
            />
          </Grid.Col>


        </Grid>

      </Grid.Col>

      {/* Barchar */}
      <Grid.Col span={12} mt='lg'>
        <Grid>
          <Grid.Col
            mt="lg"
            span={{ base: 12, md: 8, lg: 9 }}
            style={{ alignItems: "stretch" }}
          >
            <Paper radius="lg" p={"lg"} h={"100%"}>
              <BarChart
                h={300}
                miw={300}
                maxBarWidth={50}
                withLegend
                legendProps={{
                  verticalAlign: "bottom",
                  align: "center",
                }}

                tooltipProps={{
                  content: ({ label, payload }) => (
                    <ChartTooltip label={label as string} payload={payload} />
                  ),
                }}
                data={statisticOrdersWorkshops?.bar_chart || []}
                dataKey="date"
                series={[
                  { name: "Clients", color: "primary.3" },
                  { name: "Commandes", color: "secondary.3" },
                ]}
                tickLine="xy"
                xAxisProps={{
                  angle: windowMobile ? 90 : 45,
                  tickFormatter: (t: any) => t.split("-").join(" "),
                  tickMargin: 15,
                }}
                barProps={{
                  radius: [16, 16, 16, 16],
                }}
                withXAxis={!windowMobile}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              shadow={undefined}
              skeleton={isLoadingStatisticOrderWorkshop}
              titleHover="Analyse"
              title={millify(statisticOrdersWorkshops?.avg_orders_per_client || 0)}
              subtitle={`commande par client sur la periode du ${dataPeriode.verbose}`}
              color="primary.9"
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>

      {/* piechart et line chart */}
      <Grid.Col span={12} mt='lg'>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="xs" radius="lg" h={"100%"} p={"lg"}>

              <LineChart
                h={250}
                data={statisticOrdersWorkshops?.line_chart || []}
                series={[
                  {
                    name: "orders",
                    label: "Nombre de commandes reçues par jour",
                  },
                ]}
                dataKey="date"
                type="gradient"
                gradientStops={[
                  { offset: 0, color: "red.6" },
                  { offset: 20, color: "orange.6" },
                  { offset: 40, color: "yellow.5" },
                  { offset: 70, color: "lime.5" },
                  { offset: 80, color: "cyan.5" },
                  { offset: 100, color: "blue.5" },
                ]}
                strokeWidth={1}
                curveType="natural"
                //   yAxisProps={{ domain: [-25, 40] }}
                valueFormatter={(value) => `${value}`}
                withLegend
                legendProps={{
                  verticalAlign: "bottom",
                  align: "center",
                }}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            {!statisticOrdersWorkshops ? (
              <Skeleton height={300} width={"100%"} visible={isLoadingStatisticOrderWorkshop} />
            ) : (
              <Paper shadow="sm" bg="background" radius="lg" h={"100%"} p={"lg"} display={"flex"} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <PieChart
                  withLabelsLine
                  labelsPosition="outside"
                  labelsType="percent"
                  withLabels
                  withTooltip
                  tooltipProps={{
                    content: ({ label, payload }) => (
                      <ChartTooltip label={label as string} payload={payload} />
                    ),
                  }}
                  data={(statisticOrdersWorkshops as StatOrdersWorkshop).pie_chart.map((item, index) => ({
                    ...item,
                    color: ['primary.3', 'secondary.3', 'info.3', 'error.3', 'info.3'][index],
                  }))}
                />
                <Flex gap="lg" mt="md">
                  {(statisticOrdersWorkshops as StatOrdersWorkshop).pie_chart.map((item, index) => ({
                    ...item,
                    color: ['primary.3', 'secondary.3', 'info.3', 'error.3', 'info.3'][index],
                  })).map((item, index) => {
                    const [colorName, shade] = item.color.split(".");
                    return (
                      <Group gap="xs" key={index}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor:
                              theme.colors[colorName][parseInt(shade, 10)],
                            borderRadius: "100%",
                          }}
                        ></div>
                        <Text size="sm">{item.name}</Text>
                      </Group>
                    );
                  })}

                </Flex>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};
