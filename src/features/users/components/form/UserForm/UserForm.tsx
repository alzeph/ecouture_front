//import styles from './user-form.module.css';
import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group } from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { ContentType, responseExtractData, responseTraited, type WorkerRead } from "@shared/api";
import { EmailField, ImageField, PasswordField, PhoneField, TextField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import * as z from "zod";

export interface UserFormProps { }

const id = "UserForm"

const userSchemaPost = z.object({
  user: z.object({
    first_name: z.string().min(1, 'Le prénom est requis'),
    last_name: z.string().min(1, 'Le nom de famille est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    password_confirm: z.string().min(1, 'La confirmation du mot de passe est requise'),
    phone: z.string().min(1, 'Le numéro de téléphone est requis'),
    photo: z.file().max(1024 * 1024).mime(IMAGE_MIME_TYPE).nullable()
  })
}).refine((data) => data.user.password === data.user.password_confirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["user", "password_confirm"],
})

const userSchemaPatch = z.object({
  user: z.object({
    first_name: z.string().min(1, 'Le prénom est requis'),
    last_name: z.string().min(1, 'Le nom de famille est requis'),
    email: z.string().email('Email invalide'),
    phone: z.string().min(1, 'Le numéro de téléphone est requis'),
    photo: z.file().max(1024 * 1024).mime(IMAGE_MIME_TYPE).nullable()
  })
})

const UserFormWrapper = ({ initialData=undefined, form }: {initialData?: WorkerRead, form: any }) => {
  return (
    <>
      <Grid.Col span={{ base: 12 }}>
        <ImageField form={form} name='user.photo' />
      </Grid.Col>

      <Grid.Col span={{ base: 12 }}>
        <TextField form={form} name='user.last_name' isError placeholder='Votre Prénoms' />
      </Grid.Col>

      <Grid.Col span={{ base: 12 }}>
        <TextField form={form} name='user.first_name' isError placeholder='Votre Nom de famille' />
      </Grid.Col>

      <Grid.Col span={{ base: 12 }}>
        <EmailField form={form} name='user.email' isError isUnique placeholder='Votre Email' ignoreValue={initialData?.user.email} />
      </Grid.Col>

      <Grid.Col span={{ base: 12 }}>
        <PhoneField form={form} name='user.phone' isError isUnique placeholder='Votre Numéro de téléphone' ignoreValue={initialData?.user.phone} />
      </Grid.Col>
    </>
  )
}

const UserFormPost = () => {
  const { proxy, workshop } = useAuth()
  const { closeDrawer } = useDrawerManager()

  const form = useForm({
    validators: {
      onChange: userSchemaPost
    },
    defaultValues: {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: '',
        password_confirm: '',
        phone: '',
        photo: null as File | null
      }
    },
    onSubmit: async ({ value }) => {
      const { user: { photo, ...userTraited } } = value
      try {
        if (workshop) {
          const response = await responseTraited(
            {
              queryFn: () => proxy.api.apiWorkshopUsersWorkersCreate(
                workshop.slug,
                { user: { ...userTraited } },
                { type: ContentType.Json })
            })
          await responseTraited({
            queryFn: () => proxy.api.apiWorkshopUsersWorkersPartialUpdate(workshop.slug, String(data.id), { user: { photo } }, { type: ContentType.FormData })
          })

          const data = responseExtractData(response)
          notifications.show({
            title: "Ajout de travailleur",
            message: `Travailleur ajouter ${data.user.first_name} ${data.user.last_name}`,
            color: "success.9"
          })
          closeDrawer(id)
          form.reset()
          return response
        }
      } catch (error) {
        const e = error as AxiosError
        console.log(e)
        notifications.show({
          title: "Une erreur ces produite",
          message: `Une erreru ces produite lros de la créationde votre atelier veuiller réeseyer: ${e.message} `,
          color: 'error.9'
        })
      }
    }
  })

  return (
    <DrawerStack
      id={id}
      title="Connexion"
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
        <UserFormWrapper  form={form} />
        <Grid.Col span={{ base: 12 }}>
          <PasswordField form={form} name='user.password' isError placeholder='Votre Mot de passe' />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <PasswordField form={form} name='user.password_confirm' isError placeholder='Confirmer votre Mot de passe' />
        </Grid.Col>
      </Grid>
    </DrawerStack>
  )
}

const UserFormPatch = ({ initialData }: { initialData: WorkerRead }) => {

  const { proxy, workshop } = useAuth()
  const { closeDrawer } = useDrawerManager()

  const form = useForm({
    validators: {
      onChange: userSchemaPatch
    },
    defaultValues: {
      user: {
        first_name: initialData?.user?.first_name || '',
        last_name: initialData?.user?.last_name || '',
        email: initialData?.user?.email || '',
        phone: initialData?.user?.phone || '',
        photo: initialData?.user?.photo as unknown as File | null
      }
    },
    onSubmit: async ({ value }) => {
      try {
        if (workshop) {
          const { user: { photo, ...userTraited } } = value
          const response = await responseTraited({
            queryFn: () => proxy.api.apiWorkshopUsersWorkersPartialUpdate(workshop.slug, String(initialData.id), { user: userTraited }, { type: ContentType.Json })
          })
          await responseTraited({
            queryFn: () => proxy.api.apiWorkshopUsersWorkersPartialUpdate(workshop.slug, String(initialData.id), { user: { photo } }, { type: ContentType.FormData })
          })

          const data = responseExtractData(response)
          notifications.show({
            title: "Ajout de travailleur",
            message: `Travailleur ajouter ${data.user.first_name} ${data.user.last_name}`,
            color: "success.9"
          })
          closeDrawer(id)
          form.reset()
          return response
        }
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: "Une erreur ces produite",
          message: `Une erreru ces produite lros de la créationde votre atelier veuiller réeseyer: ${e.message} `,
          color: 'error.9'
        })
        console.log(e)
      }
    }
  })
  return (
    <DrawerStack
      id={id}
      title="Profil"
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
        <UserFormWrapper initialData={initialData} form={form} />
      </Grid>
    </DrawerStack>
  )
}


export const UserForm = ({ }: UserFormProps) => {
  const { getData } = useDrawerManager()

  const data = useMemo(() => {
    const data = getData() as { worker: WorkerRead }
    return data?.worker
  }, [getData])
  return (
    data ? <UserFormPatch initialData={data} /> : <UserFormPost />
  );
};

UserForm.id = "UserForm"