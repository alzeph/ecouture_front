//import styles from './measurement-order-workshop-form.module.css';
import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type OrderWorkshopRead } from "@shared/api";
import { ChipField, PhoneField } from "@shared/components";
import { MEASUREMENT_FOR_TYPE_OF_CLOTHING_KEY_TO_VERBOSE } from "@shared/constants";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import { useMemo, useState } from "react";

export interface MeasurementOrderWorkshopFormProps { }

const id = "MeasurementOrderWorkshopForm"
export const MeasurementOrderWorkshopForm = ({ }: MeasurementOrderWorkshopFormProps) => {

  const { proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => {
    const data = getData() as { order: OrderWorkshopRead }
    return data?.order
  }, [getData])

  const [typeOfClothing, setTypeOfClothing] = useState<OrderWorkshopRead['type_of_clothing']>(
    (initialData?.type_of_clothing as OrderWorkshopRead['type_of_clothing']) || 'SHIRT'
  );

  const measurements = useMemo(() => {
    const init = MEASUREMENT_FOR_TYPE_OF_CLOTHING_KEY_TO_VERBOSE[typeOfClothing].map(
      (measurement) => {
        const existing = Array.isArray(initialData?.measurement)
          ? initialData.measurement.find(
            (item: { name: string; value: string | number }) =>
              item.name === measurement
          )
          : null;
        return {
          name: measurement,
          value: existing ? String(existing.value) : "0",
        };
      }
    );
    return init
  }, [typeOfClothing, initialData]);

  const form = useForm({
    defaultValues: {
      gender: initialData?.gender || 'MAN',
      type_of_clothing: initialData?.type_of_clothing || 'SHIRT',
      measurement: measurements,
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
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <ChipField
            label="Choississez la catégorie du vêtement"
            form={form}
            name='gender'
            isError
            data={[{ label: "Homme", value: "MAN" }, { label: "Femme", value: "WOMAN" }, { label: "Enfant", value: "CHILDREN" }]}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <ChipField
            label="Choississez le type de vetement"
            form={form}
            name='type_of_clothing'
            onChange={setTypeOfClothing}
            isError
            data={[
              { label: "Vêtement haut du corps", value: "SHIRT" },
              { label: "Vêtement bas du corps", value: "PANTS" },
              { label: "Combinaison, robe ou boubou", value: "DRESS" },

            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}></Grid.Col>

        <Grid.Col span={{ base: 12 }}>

          <Text mb="sm">Mesures</Text>
          <form.Field name="measurement" mode='array'>
            {(field) => (
              <Grid align='end'>

                {field.state.value.map((measurement, index) => (
                  <Grid.Col span={{ base: 6 }} key={index}>
                    <form.Field
                      name={`measurement[${index}].value`}
                    >
                      {(subField) => {
                        return <PhoneField
                          form={subField.form}
                          isError
                          isUnique={false}
                          label={measurement.name}
                          name={subField.name}
                          placeholder={`Entrez la ${measurement.name}`}
                          rightSection="cm"
                          size="sm"
                          step={0.1}
                          min={0}
                          mb="sm"
                        />
                      }}
                    </form.Field>
                  </Grid.Col>
                ))}
              </Grid>
            )}
          </form.Field>

        </Grid.Col>
      </Grid>
    </DrawerStack>
  );
};
MeasurementOrderWorkshopForm.id = id
