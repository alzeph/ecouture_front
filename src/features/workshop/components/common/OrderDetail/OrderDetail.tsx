//import styles from './order-detail.module.css';

import { useDrawerManager } from "@features/core/hook";
import { ActionIcon, Avatar, Badge, Button, Card, Grid, Group, Image, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import type { OrderWorkshopRead } from "@shared/api";
import dayjs from "dayjs";
import { useMemo } from "react";
import { AmountOrderWorkshopForm, DeliveryOrderWorkshopForm, FittingForm, MeasurementOrderWorkshopForm, WorkerOrderWorkshopForm } from "../../form";
import { IconCalendar, IconEdit, IconMail, IconPhoneCall, IconPigMoney } from "@tabler/icons-react";
import { DrawerStack } from "@features/core/components";

export interface OrderDetailProps { }

const statusColors: Record<any, string> = {
  NEW: 'blue',
  IN_PROGRESS: 'orange',
  COMPLETED: 'green',
  CANCELLED: 'red',
  DELETED: "red"
};

const statusLabels: Record<any, string> = {
  NEW: 'Nouvelle commande',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
  DELETED: "Supprimée"
};

const paymentStatusLabels: Record<any, string> = {
  PENDING: 'En attente',
  PARTIAL: 'Partiel',
  PAID: 'Payé',
  REFUNDED: 'Remboursé'
};

const genderLabels: Record<any, string> = {
  MAN: 'Homme',
  WOMAN: 'Femme',
  CHILDREN: 'Enfant'
};

const clothingTypeLabels: Record<any, string> = {
  DRESS: 'Robe',
  SHIRT: 'Chemise',
  PANTS: 'Pantalon',
};

const RenderProgressBar = ({ order }: { order: OrderWorkshopRead }) => {

  const theme = useMantineTheme()

  const progressSteps = [
    { key: 'NEW', label: 'Créée', color: 'info' },
    { key: 'IN_PROGRESS', label: 'En cours', color: 'warning' },
    { key: 'COMPLETED', label: 'Terminée', color: 'primary' },
  ];

  return (
    <Stack gap="xs">
      <Text fw={500}>Progression de la commande</Text>
      <Grid>
        {progressSteps.map((step, index) => (
          <Grid.Col key={step.key} span={4}>
            <Stack gap={4} align="center">
              <div
                style={{
                  width: '100%',
                  height: 8,
                  borderRadius: theme.radius.xl,
                  backgroundColor: order.status === step.key ||
                    (order.status === 'COMPLETED' && index < 3) ||
                    (order.status === 'IN_PROGRESS' && index < 2)
                    ? theme.colors[step.color]?.[6]
                    : theme.colors.gray[3]
                }}
              />
              <Text size="xs" c="dimmed" ta="center">{step.label}</Text>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
      {order.status === 'CANCELLED' && (
        <Badge color="red" size="sm" style={{ alignSelf: 'center' }}>
          Commande annulée
        </Badge>
      )}
    </Stack>
  );
};

const RenderOrderInfo = ({ order }: { order: OrderWorkshopRead }) => (
  <Card withBorder>
    <Stack gap="md">
      <Group justify="space-between">
        <div>
          <Title order={4}>Commande {order.number}</Title>
          <Text c="dimmed" size="sm">
            Créée le {dayjs(order.createdAt).format('DD MMMM YYYY')}
          </Text>
        </div>
        <Badge color={statusColors[order.status]} size="lg">
          {statusLabels[order.status]}
        </Badge>
      </Group>

      {order.is_urgent && (
        <Badge color="red" variant="outline" size="sm" style={{ width: 'fit-content' }}>
          🚨 Commande urgente
        </Badge>
      )}

      <Grid>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">Genre</Text>
          <Text fw={500}>{genderLabels[order.gender]}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">Type de vêtement</Text>
          <Text fw={500}>{clothingTypeLabels[order.type_of_clothing]}</Text>
        </Grid.Col>
      </Grid>

      {order.description && (
        <div>
          <Text size="sm" c="dimmed" mb={4}>Description</Text>
          <Text>{order.description}</Text>
        </div>
      )}
    </Stack>
  </Card>
);

const RenderDeliveryInfo = ({ order }: { order: OrderWorkshopRead }) => {
  const isEditable = useMemo(() => order?.status !== 'COMPLETED' && order?.status !== 'CANCELLED', [order])
  const { openDrawer } = useDrawerManager()

  return (<Card withBorder>
    <Stack gap="md">
      <Group justify="space-between">
        <Text fw={500}>Dates de livraison</Text>
        {isEditable && (
          <ActionIcon
            variant="subtle"
            color="primary"
            onClick={() => openDrawer({ id: DeliveryOrderWorkshopForm.id, parentId: id, data: { order } })}>
            <IconEdit size={16} />
          </ActionIcon>
        )}
      </Group>

      <Grid>
        <Grid.Col span={12}>
          <Card withBorder p="sm" bg="blue.0">
            <Text size="sm" c="dimmed">Date d'estimation</Text>
            <Text fw={500}>

              {dayjs(order.estimated_delivery_date).format('dddd DD MMMM YYYY')}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card withBorder p="sm" bg="orange.0">
            <Text size="sm" c="dimmed">Date promise</Text>
            <Text fw={500}>
              {dayjs(order.promised_delivery_date).format('dddd DD MMMM YYYY')}
            </Text>
          </Card>
        </Grid.Col>
        {order.actual_delivery_date && (
          <Grid.Col span={12}>
            <Card withBorder p="sm" bg="green.0">
              <Text size="sm" c="dimmed">Date de livraison réelle</Text>
              <Text fw={500}>
                {dayjs(order.actual_delivery_date).format('dddd DD MMMM YYYY')}
              </Text>
            </Card>
          </Grid.Col>
        )}
      </Grid>

      {order.status === 'IN_PROGRESS' && (
        <Button
          radius="md"
          color="primary.7"
          fullWidth
          leftSection={<IconCalendar size={16} />}
        >
          Marquer comme livrée
        </Button>
      )}
    </Stack>
  </Card>)
};

const RenderPaymentInfo = ({ order }: { order: OrderWorkshopRead }) => {

  const isEditable = useMemo(() => order?.status !== 'COMPLETED' && order?.status !== 'CANCELLED', [order])
  const { openDrawer } = useDrawerManager()

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500}>Informations de paiement</Text>
          <Group>
            <Badge color={order.payment_status === 'PAID' ? 'green' : 'orange'}>
              {paymentStatusLabels[order.payment_status]}
            </Badge>
            {isEditable && (
              <ActionIcon
                variant="subtle"
                color="primary"
                onClick={() => openDrawer({ id: AmountOrderWorkshopForm.id, parentId: id, data: { order } })}>
                <IconEdit size={16} />
              </ActionIcon>
            )}
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Montant total</Text>
            <Text fw={500} size="lg">{Number(order.amount).toLocaleString()} FCFA</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Acompte versé</Text>
            <Text fw={500}>{Number(order.down_payment).toLocaleString()} FCFA</Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Card withBorder p="sm" bg="red.0">
              <Text size="sm" c="dimmed">Reste à payer</Text>
              <Text fw={700} c="red" size="lg">
                {(Number(order.amount) - Number(order.down_payment)).toLocaleString()} FCFA
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        <Button
          variant="outline"
          color="green"
          leftSection={<IconPigMoney size={16} />}
          disabled={order.payment_status === 'PAID'}
        >
          Enregistrer un paiement
        </Button>
      </Stack>
    </Card>)
};

const RenderCustomerInfo = ({ order }: { order: OrderWorkshopRead }) => {
  return (
    <Card withBorder>
      <Stack gap="md">
        <Text fw={500}>Informations client</Text>
        <Group>
          <Avatar src={order.customer?.photo} size="lg" radius="md" />
          <Stack gap={2}>
            <Text fw={500}>
              {order.customer?.first_name} {order.customer?.last_name}
            </Text>
            <Text c="dimmed" size="sm">@{order.customer?.nickname}</Text>
            <Badge size="xs" variant="outline">
              {order.customer?.total_orders} commandes • {order.customer?.ongoing_orders} en cours
            </Badge>
          </Stack>
        </Group>

        <Group>
          <ActionIcon variant="outline" color="primary" size="sm">
            <IconPhoneCall size={14} />
          </ActionIcon>
          <Text size="sm">{order.customer?.phone}</Text>
        </Group>

        <Group>
          <ActionIcon variant="outline" color="primary" size="sm">
            <IconMail size={14} />
          </ActionIcon>
          <Text size="sm">{order.customer?.email}</Text>
        </Group>
      </Stack>
    </Card>)
};

const RenderWorkerInfo = ({ order }: { order: OrderWorkshopRead }) => {
  const isEditable = useMemo(() => order?.status !== 'COMPLETED' && order?.status !== 'CANCELLED', [order])
  const { openDrawer } = useDrawerManager()

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500}>Ouvrier assigné</Text>
          {isEditable && (
            <ActionIcon variant="subtle" color="primary" onClick={() => openDrawer({ id: WorkerOrderWorkshopForm.id, parentId: id, data: { order } })}>
              <IconEdit size={16} />
            </ActionIcon>
          )}
        </Group>

        <Group>
          <Avatar src={order.worker?.user?.photo} size="lg" radius="md" />
          <Stack gap={2}>
            <Text fw={500}>
              {order.worker?.user?.first_name} {order.worker?.user?.last_name}
            </Text>
            <Badge size="xs" variant="outline">
              {order.worker?.total_orders} commandes • {order.worker?.ongoing_orders} en cours
            </Badge>
          </Stack>
        </Group>

        <Group>
          <ActionIcon variant="outline" color="primary" size="sm">
            <IconPhoneCall size={14} />
          </ActionIcon>
          <Text size="sm">{order.worker?.user?.phone}</Text>
        </Group>

        <Group>
          <ActionIcon variant="outline" color="primary" size="sm">
            <IconMail size={14} />
          </ActionIcon>
          <Text size="sm">{order.worker?.user?.email}</Text>
        </Group>
      </Stack>
    </Card>)
};

const RenderClothingDetails = ({ order }: { order: OrderWorkshopRead }) => (
  <Card withBorder>
    <Stack gap="md">
      <Text fw={500}>Détails du vêtement</Text>

      <Grid>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Modèle</Text>
            <Text fw={500}>{order.clothing_model}</Text>
            {order.description_of_model && (
              <Text size="sm">{order.description_of_model}</Text>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Tissu</Text>
            <Text fw={500}>{order.description_of_fabric}</Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid>
        {order.photo_of_clothing_model && (
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">Photo du modèle</Text>
              <Image
                src={order.photo_of_clothing_model}
                alt="Modèle de vêtement"
                radius="md"
                h={120}
                fit="cover"
              />
            </Stack>
          </Grid.Col>
        )}
        {order.photo_of_fabric && (
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">Photo du tissu</Text>
              <Image
                src={order.photo_of_fabric}
                alt="Tissu"
                radius="md"
                h={120}
                fit="cover"
              />
            </Stack>
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  </Card>
);

const RenderMeasurements = ({ order }: { order: OrderWorkshopRead }) => {

  const isEditable = useMemo(() => order?.status !== 'COMPLETED' && order?.status !== 'CANCELLED', [order])
  const { openDrawer } = useDrawerManager()

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500}>Mesures</Text>
          {isEditable && (
            <ActionIcon variant="subtle" color="primary" onClick={() => openDrawer({ id: MeasurementOrderWorkshopForm.id, parentId: id, data: { order } })}>
              <IconEdit size={16} />
            </ActionIcon>
          )}
        </Group>

        {Array.isArray(order.measurement) &&
          <Grid>
            {order.measurement.map((measure: any, index: number) => (
              <Grid.Col key={index} span={6}>
                <div>
                  <Text size="sm" c="dimmed">
                    {measure.name}
                  </Text>
                  <Text fw={500}>{measure.value} cm</Text>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        }
      </Stack>
    </Card>
  )
};

const RenderFittings = ({ order }: { order: OrderWorkshopRead }) => {

  // const isEditable = useMemo(() => order?.status !== 'COMPLETED' && order?.status !== 'CANCELLED', [order])
  const { openDrawer } = useDrawerManager()

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500}>Essayages</Text>
          <Button size="xs" variant="outline" onClick={() => openDrawer({ id: FittingForm.id, parentId: id, data: { order } })}>
            Ajouter un essayage
          </Button>
        </Group>

        {order?.fittings?.map((fitting, index) => (
          <Card key={index} withBorder p="sm" bg="gray.0">
            <Group justify="space-between">
              <div>
                <Text fw={500}>Essayage #{fitting.fitting_number}</Text>

                {fitting.actual_date && <Text size="sm" c="dimmed"> `Réalisé le ${dayjs(fitting.actual_date).format('DD/MM/YYYY')}`</Text>}
                <Text size="sm" c="dimmed">
                  {`Prévu le ${dayjs(fitting.scheduled_date).format('DD/MM/YYYY')}`}

                </Text>
              </div>
              <Badge
                color={fitting.status === 'COMPLETED' ? 'green' :
                  fitting.status === 'NEEDS_MAJOR_ADJUSTMENTS' ? 'orange' : 'blue'}
                size="sm"
              >
                {fitting.status}
              </Badge>
            </Group>
            {fitting.notes && (
              <Text size="sm" mt="xs">{fitting.notes}</Text>
            )}
            {fitting.adjustments_needed && (
              <Text size="sm" mt="xs" c="orange">
                Ajustements: {fitting.adjustments_needed}
              </Text>
            )}
          </Card>
        ))}
      </Stack>
    </Card>
  )
};

const id = "OrderDetail"
export const OrderDetail = ({ }: OrderDetailProps) => {
  const { getData } = useDrawerManager()
  const modalData: { order: OrderWorkshopRead | undefined } = getData()
  const order = useMemo(() => modalData?.order, [modalData])

  return (
    <>
      <DrawerStack
        id={id}
        title={
          <Stack gap={0}>
            <Title order={5} fw={600}>Detail commande {order?.number}</Title>
            <Text c="dimmed" size="sm">
              {dayjs(order?.createdAt).format('DD MMMM YYYY')}
            </Text>
          </Stack>
        }
      >
        {order && <Stack gap="md">
          <Card withBorder p="sm" bg="blue.0">
            {<RenderProgressBar order={order} />}
          </Card>

          <RenderOrderInfo order={order} />
          <RenderDeliveryInfo order={order} />
          <RenderPaymentInfo order={order} />
          <RenderCustomerInfo order={order} />
          <RenderWorkerInfo order={order} />
          <RenderClothingDetails order={order} />
          <RenderMeasurements order={order} />
          <RenderFittings order={order} />
        </Stack>}
      </DrawerStack>
    </>
  );
};

OrderDetail.id = id