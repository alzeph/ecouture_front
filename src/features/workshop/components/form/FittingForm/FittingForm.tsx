//import styles from './fitting-form.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type FittingRead, type OrderWorkshopRead } from "@shared/api";
import { DateField, SwitchField, TextAreaField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { useMemo } from "react";

export interface FittingFormProps { }

const id = "FittingForm"
export const FittingForm = ({ }: FittingFormProps) => {

  const { proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => {
    const data = getData() as { order: OrderWorkshopRead, fitting: FittingRead | undefined }
    return { order: data?.order, fitting: data?.fitting }
  }, [getData])


  const form = useForm({
    defaultValues: {
      order: initialData?.order?.id,
      scheduled_date: initialData?.fitting?.scheduled_date || dayjs().format('YYYY-MM-DD'),
      actual_date: initialData.fitting ? dayjs().format('YYYY-MM-DD') : null,
      notes: initialData?.fitting?.notes || '',
      adjustments_needed: initialData?.fitting?.adjustments_needed || '',
      status: initialData?.fitting?.status || 'SCHEDULED'
    },
    onSubmit: async ({ value }) => {
      try {
        const response = initialData?.fitting
          ? await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersFittingsPartialUpdate(String(initialData.fitting?.id), initialData?.order.worker.workshop.slug, value as any, { type: ContentType.Json }) })
          : await responseTraited({ queryFn: () => proxy.api.apiWorkshopFittingsCreate(initialData?.order.worker.workshop.slug, value as any, { type: ContentType.Json }) })
        const data = responseExtractData(response)

        notifications.show({
          title: initialData?.fitting ? "Modifier essayage" : "Ajouter essayage",
          message: `Essayage ${initialData?.fitting ? "Modifier" : "ajouter"}: ${data.fitting_number} avec success`,
          color: 'success.9'
        })
        closeDrawer(id)
        return data
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: initialData?.fitting ? "Modifier essayage" : "Ajouter essayage",
          message: `Essayage ${initialData?.fitting ? "Modifier" : "ajouter"}: ${initialData?.fitting?.fitting_number} a echouer`,
          content: 'Une erreur ces produite lors de l' + (initialData?.fitting ? "Modification" : "ajout") + ' de votre essayage : recharger la page et réesayer' + e.message,
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
          <DateField
            isError
            form={form}
            label="Date de l'essayage"
            name='scheduled_date' />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <DateField
            label="Date de l'actuellisation"
            isError
            form={form}
            name='actual_data'
            readOnly />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextAreaField
            label="Notes"
            isError
            form={form}
            name='notes' />
        </Grid.Col>

        {initialData?.fitting && (
          <>
            <Grid.Col span={{ base: 12 }}>
              <TextAreaField
                label="Notes sur l'essayges"
                isError
                form={form}
                name='adjustments_needed' />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <Group>
                <SwitchField
                  form={form}
                  name='status'
                  description="Status de l'essayage"
                  lableCheck="Marquer comme terminé"
                  lableUncheck="Marquer comme en cours"
                />
              </Group>
            </Grid.Col>
          </>
        )}

      </Grid>
    </DrawerStack>
  )
}
FittingForm.id = id
