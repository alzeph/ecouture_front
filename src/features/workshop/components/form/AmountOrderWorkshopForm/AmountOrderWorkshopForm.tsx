//import styles from './amount-order-workshop-form.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type OrderWorkshopRead } from "@shared/api";
import { PhoneField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import { useMemo } from "react";

export interface AmountOrderWorkshopFormProps {}

const id = "AmountOrderWorkshopForm"
export const AmountOrderWorkshopForm = ({ }: AmountOrderWorkshopFormProps) => {

  const { proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => {
     const data = getData() as {order:OrderWorkshopRead}
     return data?.order
  }, [getData])

  const form = useForm({
    defaultValues: {
      amount: initialData?.amount,
      down_payment: initialData?.down_payment,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await responseTraited({ queryFn: () => proxy.api.workshopOrdersPartialUpdate(String(initialData.id), initialData.worker.workshop.slug, value as any, { type: ContentType.Json }) })
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
      <Grid justify='center' align='center'>
        <Grid.Col span={{ base: 12 }}>
          <PhoneField
            isError
            form={form}
            name='amount'
            rightSection='fcfa' />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <PhoneField form={form} name='down_payment' isError rightSection='fcfa' />
        </Grid.Col>
      </Grid>
    </DrawerStack>
  );
};
AmountOrderWorkshopForm.id = id
