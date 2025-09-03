//import styles from './customer-workshop-form.module.css';
import { DrawerStack } from '@features/core/components';
import { useAuth, useDrawerManager } from '@features/core/hook';
import { Button, Grid, Group } from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { ContentType, responseIsExists, responseTraited, type CustomerWorkshopWriteRequest, type PatchedCustomerWorkshopWriteRequest } from '@shared/api';
import { ChipField, EmailField, ImageField, PhoneField, TextField } from '@shared/components';
import { useForm } from '@tanstack/react-form';
import { useMemo } from 'react';
import * as z from 'zod';

export interface CustomerWorkshopFormProps { }

const registerCustomerSchema = z.object({
  last_name: z.string().min(1, "Le nom de famille est requis"),
  first_name: z.string().min(1, "Le prénom est requis"),
  nickname: z.string().min(1, "Le surnom est requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  genre: z.string().min(1, "Le genre est requis"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email invalide" }),
  photo: z.file().max(1024 * 1024).mime(IMAGE_MIME_TYPE).nullable()
})

const id = "CustomerWorkshopForm"
export const CustomerWorkshopForm = ({ }: CustomerWorkshopFormProps) => {

  const { workshop, proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => getData(), [])

  const form = useForm({
    validators: {
      onChange: registerCustomerSchema
    },
    defaultValues: {
      last_name: initialData?.last_name || "",
      first_name: initialData?.first_name || "",
      nickname: initialData?.nickname || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      genre: initialData?.genre as string || "",
      photo: initialData?.photo || null
    },
    onSubmit: async ({ value }) => {
      try {
        if (workshop) {
          const { photo, ...customer } = value
          const response = initialData ? await responseTraited({
            queryFn: () => proxy.api.workshopCustomersWorkshopsPartialUpdate(workshop.slug, initialData.id, customer as PatchedCustomerWorkshopWriteRequest, { type: ContentType.Json })
          }) : await responseTraited({
            queryFn: () => proxy.api.workshopCustomersWorkshopsCreate(workshop.description, customer as CustomerWorkshopWriteRequest, { type: ContentType.Json })
          })

          await responseTraited(({
            queryFn: () => proxy.api.workshopCustomersWorkshopsPartialUpdate(workshop.slug, initialData.id, { photo }, { type: ContentType.FormData })
          }))

          notifications.show({
            title: initialData ? "Modification de client" : 'Ajout de client',
            message: initialData ? `Client modifié: ${value.first_name} ${value.last_name}` : `Client ajouter: ${value.first_name} ${value.last_name}`,
            color: 'success.9'
          })
          return response
        } else {
          notifications.show({
            title: "la requete n'est pas envoyer",
            message: "la requete n'est pas envoyer",
            color: 'error.9'
          })
        }
      } catch (error) {
        notifications.show({
          title: initialData ? "Modification de client" : 'Ajout de client',
          message: `Une erreur ces produite lors de l'ajout de votre client : recharger la page et réesayer`,
          color: 'error.9',
        })
      } finally {
        closeDrawer(id)
        form.reset()
      }
    }
  })

  return (
    <DrawerStack
      id={id}
      title={initialData ? "Modifier un client" : "Ajouter un client"}
      isLoading={form.state.isSubmitting}
      footerSection={
        <Group
          align='center'
          justify="start"
          wrap='nowrap'
          bg='white'
        >
          <Button
            radius="lg"
            color="primary"
            onClick={form.handleSubmit}
            disabled={!form.state.isValid}
          >
            Crée
          </Button>

        </Group>
      }
    >
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <ImageField
            isError={false}
            form={form}
            name="photo"
            placeholder='photo de profil du ' />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextField
            isError
            form={form}
            name="last_name"
            placeholder='Prénoms'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextField
            isError
            form={form}
            name="first_name"
            placeholder='Nom de famille'
          />
        </Grid.Col>


        <Grid.Col span={{ base: 12 }}>
          <TextField
            isError
            form={form}
            name="nickname"
            placeholder='Surnom'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <PhoneField
            isError
            isUnique={false}
            form={form}
            name="phone"
            placeholder='numéro de téléphone'
            validators={{
              onBlurAsync: async ({ value }) => {
                const response = await proxy.api.userVerifyPhoneCreate({ verify: value })
                const isExists = responseIsExists(response)
                return isExists ? { message: "numero est deja utilisé" } : undefined
              }
            }}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <EmailField
            isError
            isUnique={false}
            form={form}
            name="email"
            placeholder='address mail'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <ChipField
            label="Choississez la catégorie du vêtement"
            form={form}
            name='genre'
            isError
            data={[{ label: "Homme", value: "MAN" }, { label: "Femme", value: "WOMAN" }, { label: "Enfant", value: "CHILDREN" }]}
          />
        </Grid.Col>
      </Grid>
    </DrawerStack>
  );
};

CustomerWorkshopForm.id = id
