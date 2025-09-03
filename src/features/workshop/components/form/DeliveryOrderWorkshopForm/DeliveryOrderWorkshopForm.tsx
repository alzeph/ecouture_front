//import styles from './delivery-order-workshop-form.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type OrderWorkshopRead } from "@shared/api";
import { DateField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { useMemo } from "react";

export interface DeliveryOrderWorkshopFormProps { }

const id = "DeliveryOrderWorkshopForm"
export const DeliveryOrderWorkshopForm = ({ }: DeliveryOrderWorkshopFormProps) => {

  const { proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => {
    const data = getData() as { order: OrderWorkshopRead }
    return data?.order
  }, [getData])

  const form = useForm({
    defaultValues: {
      estimated_delivery_date: initialData?.estimated_delivery_date || dayjs().format('YYYY-MM-DD'),
      promised_delivery_date: initialData?.promised_delivery_date || dayjs().format('YYYY-MM-DD'),
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersPartialUpdate(String(initialData.id), initialData.worker.workshop.slug, value as any, { type: ContentType.Json }) })
        const data = responseExtractData(response)
        notifications.show({
          title: "Modification de commande",
          message: `Commande ${data.number} modifier avec success`,
          color: 'success.9'
        })
        closeDrawer(id)
        return response
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: "Modification de commande",
          message: `La modification de la commande ${initialData.number} a echouer`,
          content: e.message as string,
          color: 'success.9'
        })
      }
    }
  })

  return (
    <DrawerStack
      id={id}
      title={"Modification"}
      isLoading={form.state.isSubmitting}
      footerSection={
        <Group>
          <Button
            radius="lg"
            color="primary"
            onClick={form.handleSubmit}
            disabled={!form.state.isFormValid}
          >
            Valider
          </Button>
        </Group>
      }
    >
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <DateField label="Estimation de la date de livraison" form={form} name='estimated_delivery_date' isError placeholder='Estimation de la date de livraison' />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <DateField label="Date de livraison promise" form={form} name='promised_delivery_date' isError placeholder='date de livraison' />
        </Grid.Col>
      </Grid>
    </DrawerStack>
  );
};

DeliveryOrderWorkshopForm.id = id
