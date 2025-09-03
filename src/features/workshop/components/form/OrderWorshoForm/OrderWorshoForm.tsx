//import styles from './order-worsho-form.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Flex, Grid, Group, Stack, Stepper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type OrderWorkshopRead } from "@shared/api";
import { ChipField, CustomerField, DateField, ImageField, PhoneField, SwitchField, TextAreaField, TextField, WorkerField } from "@shared/components";
import { MEASUREMENT_FOR_TYPE_OF_CLOTHING_KEY_TO_VERBOSE } from "@shared/constants";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as z from 'zod';

const orderSchema = z.object({
  //etape 1
  worker: z.string().min(1, "Le nom de l'ouvrier est obligatoire"),
  customer: z.string().min(1, "Le client est obligatoire"),
  description: z.string().min(1, "Description requise"),

  // etape 2
  description_of_fabric: z.string().min(1, "Description du tissu requise"),
  photo_of_fabric: z.instanceof(File).nullable(),
  clothing_model: z.string().min(1, "Modèle requis"),
  description_of_model: z.string().min(1, "Description du modèle requise"),
  photo_of_clothing_model: z.instanceof(File).nullable(),

  //etape 3
  gender: z.string().min(1, "Le sexe est obligatoire"),
  type_of_clothing: z.string().min(1, "Le type de vêtement est obligatoire"),
  measurement: z
    .array(
      z.object({
        name: z.string(),
        value: z.string()
      })
    ),
  //etape 4
  amount: z.string().min(1, "Montant requis"),
  down_payment: z.string().min(0, "Acompte requis"),
  estimated_delivery_date: z.string(),
  promised_delivery_date: z.string(),
  is_urgent: z.boolean(),
}).refine((data) => data.down_payment <= data.amount, {
  message: "L'avance ne peut etre que inférieur ou egale au motant de la commande",
  path: ['down_payment']
})

export interface OrderWorshoFormProps { }

const id = "OrderWorshoForm"

export const OrderWorshoForm = ({ }: OrderWorshoFormProps) => {
  const { workshop, proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const modalData = getData()
  const initialData = useMemo(() => modalData?.order, [modalData])
  const fixedCustomer = useMemo(() => modalData?.fixedCustomer, [modalData])
  const fixedWorker = useMemo(() => modalData?.fixedWorker, [modalData])

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [typeOfClothing, setTypeOfClothing] = useState<OrderWorkshopRead['type_of_clothing']>(
    (initialData?.type_of_clothing as OrderWorkshopRead['type_of_clothing']) || 'SHIRT'
  );

  const initMeasuremnet = useCallback(() => {
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
  }, [typeOfClothing, initialData])

  const measurements = useMemo(() => {
    return initMeasuremnet()
  }, [initMeasuremnet]);

  const form = useForm({
    validators: {
      onChange: orderSchema
    },
    defaultValues: {
      //etape 1 
      worker: initialData?.worker.id || '',
      customer: initialData?.customer.id || '',
      description: initialData?.description || '',

      //etape 2
      photo_of_fabric: initialData?.photo_of_fabric || null,
      description_of_fabric: initialData?.description_of_fabric || '',
      clothing_model: initialData?.clothing_model || '',
      description_of_model: initialData?.description_of_model || '',
      photo_of_clothing_model: initialData?.photo_of_clothing_model || null,

      //etpae 4
      gender: initialData?.gender || '',
      type_of_clothing: initialData?.type_of_clothing || '',
      measurement: measurements,

      //etape 3
      amount: initialData?.amount || "0",
      down_payment: initialData?.down_payment || "0",
      estimated_delivery_date: initialData?.estimated_delivery_date || dayjs().format('YYYY-MM-DD'),
      promised_delivery_date: initialData?.promised_delivery_date || dayjs().format('YYYY-MM-DD'),
      is_urgent: initialData?.is_urgent || false,
    },
    onSubmit: async ({ value }) => {
      try {
        if (workshop) {
          const { photo_of_clothing_model, photo_of_fabric, ...valueTraited } = value
          const response = initialData
            ? await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersPartialUpdate(initialData.id, workshop.slug, valueTraited, { type: ContentType.Json }) })
            : await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersCreate(workshop.slug, valueTraited, { type: ContentType.Json }) })
          const data = responseExtractData(response)

          await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersPartialUpdate(String(data.id), data.worker.workshop.slug, { photo_of_clothing_model }, { type: ContentType.Json }) })
          await responseTraited({ queryFn: () => proxy.api.apiWorkshopOrdersPartialUpdate(String(data.id), data.worker.workshop.slug, { photo_of_fabric }, { type: ContentType.Json }) })

          notifications.show({
            title: initialData ? "Modifier" : "ajouter",
            message: `Commande ${initialData ? "Modifier" : "ajouter"}: ${data.number} avec success`,
            color: 'success.9'
          })
          return response
        }
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: initialData ? "Modifier" : "ajouter",
          message: `Une erreur ces produite lors de l'ajout de votre commande : recharger la page et réesayer`,
          content: e.message as string,
          color: 'error.9',
        })
        return error
      } finally {
        closeDrawer(id)
        form.reset()
      }
    },
    onSubmitInvalid: (error) => {
      console.log(error)
    }
  })

  useEffect(()=>{
    console.warn(form.state.errors)
  }, [form])

  return (
    <DrawerStack
      id={id}
      title={"Commande"}
      isLoading={form.state.isSubmitting}
      footerSection={
        <Group>
          <Button
            radius="lg"
            color="primary"
            onClick={prevStep}
            disabled={active === 0}
          >
            précedent
          </Button>
          {active === 4 ?
            <Button
              radius="lg"
              color="primary"
              onClick={() => {
                console.log(form.state.values)
                form.handleSubmit()
              }}
              disabled={!form.state.isFormValid}
            >
              {initialData ? "Modifier" : "Crée"}
            </Button>
            :
            <Button
              radius="lg"
              color="primary"
              onClick={nextStep}
              disabled={active === 4}
            >
              suivant
            </Button>
          }
        </Group>
      }
    >
      <Stepper
        active={active}
        onStepClick={() => { }}
        allowNextStepsSelect={false}
      >
        {/* ÉTAPE 1: INFORMATIONS CLIENT */}
        <Stepper.Step label="client" description="Client et ouvrier" >
          <Grid justify='center' align='center'>
            <Grid.Col span={{ base: 12 }}>
              <CustomerField fixeValue={fixedCustomer} name="customer" form={form} />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <WorkerField fixeValue={fixedWorker} name="worker" form={form} />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <TextAreaField
                isError
                form={form}
                name='description'
                rows={7}
                placeholder='Description bref de la commande'
              />
            </Grid.Col>
          </Grid>

        </Stepper.Step>

        {/* ÉTAPE 2: DÉTAILS DU VÊTEMENT */}
        <Stepper.Step label="Détails" description="caractéristiques">
          <Grid justify='center' align='center'>
            <Grid.Col span={{ base: 12 }}>
              <TextAreaField
                form={form}
                name='description_of_fabric'
                rows={7}
                placeholder='Description du tissu , du pagne ...'
                isError
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <ImageField
                form={form}
                name="photo_of_fabric"
                placeholder='photo du tissu, pagne ...' />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <TextField
                form={form}
                name='clothing_model'
                placeholder='nom du model a coudre'
                isError
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <TextAreaField
                form={form}
                name='description_of_model'
                rows={7}
                placeholder='Descriptino du moddèle a coudre'
                isError
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <ImageField
                form={form}
                name="photo_of_clothing_model"
                placeholder='photo du modèle' />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>

            </Grid.Col>
            <Grid.Col span={{ base: 12 }}></Grid.Col>
            <Grid.Col span={{ base: 12 }}></Grid.Col>
          </Grid>
        </Stepper.Step>

        {/* ÉTAPE 3: Mesure du client */}
        <Stepper.Step label="Mesures" description="Mesure du client">
          <Grid justify='center' align='center' mb="xl">
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
        </Stepper.Step>

        {/* ÉTAPE 4: FINANCIER ET LIVRAISON */}
        <Stepper.Step label="paiement" description="Info de paiement">
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
            <Grid.Col span={{ base: 12 }}>
              <DateField label="Estimation de la date de livraison" form={form} name='estimated_delivery_date' isError placeholder='Estimation de la date de livraison' />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <DateField label="Date de livraison promise" form={form} name='promised_delivery_date' isError placeholder='date de livraison' />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <SwitchField
                form={form}
                name='is_urgent'
                lableCheck=' Commande marquer comme urgente'
                lableUncheck='Commande marquer comme non urgente'
                description='definit si la commande doit ete marqué comme urgent ou pas ' />
            </Grid.Col>
          </Grid>
        </Stepper.Step>

        <Stepper.Completed>
          <Flex direction="column" align="center" pt="md" gap="lg">
            <Stack flex={1}>
              <Text c='dimmed' ta="center">
                En validant, la commande sera enregistrée dans le système
                vous avez la possibilité de la modifié a tout moment.
              </Text>
            </Stack>
          </Flex>
        </Stepper.Completed>
      </Stepper>
    </DrawerStack>
  );
};
OrderWorshoForm.id = id
