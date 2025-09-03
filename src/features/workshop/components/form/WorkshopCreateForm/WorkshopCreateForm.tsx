//import styles from './workshop-create-form.module.css';
import { DrawerStack } from '@features/core/components';
import { useAuth, useDrawerManager } from '@features/core/hook';
import { Button, Grid, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ContentType, responseExtractData, responseTraited } from '@shared/api';
import { EmailField, PasswordField, PhoneField, TextAreaField, TextField } from '@shared/components';
import { useForm } from '@tanstack/react-form';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import * as z from 'zod';

export interface WorkshopCreateFormProps { }

const schema = z
  .object({
    user: z.object({
      email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Address mail invalide" }),
      password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
      password_confirm: z.string().min(1, "Veuillez confirmer le mot de passe"),
      first_name: z.string().min(1, "Le prénom est requis"),
      last_name: z.string().min(1, "Le nom est requis"),
      phone: z.string().min(1, "Le numéro de téléphone est requis"),
    }),
    workshop: z.object({
      name: z.string().min(1, "Le nom de l'atelier est requis"),
      description: z.string().min(1, "La description est requise"),
      address: z.string().min(1, "L'adresse est requise"),
      city: z.string().min(1, "La ville est requise"),
      country: z.string().min(1, "Le pays est requis"),
      email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email invalide" }),
      phone: z.string().min(1, "Le numéro de téléphone est requis"),
    })
  })
  .refine((data) => data.user.password === data.user.password_confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["user", "password_confirm"],
  });

const id = "WorkshopCreateForm"
export const WorkshopCreateForm = ({ }: WorkshopCreateFormProps) => {

  const { proxy } = useAuth()
  const { closeDrawer } = useDrawerManager()

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  const form = useForm({
    validators: {
      onChange: schema
    },
    defaultValues: {
      user: {
        email: "",
        password: "",
        // photo: null as unknown as File | null,
        password_confirm: "",
        first_name: "",
        last_name: "",
        phone: "",
      },
      workshop: {
        name: "",
        description: "",
        address: "",
        city: "",
        country: "Côte d'ivoire",
        email: "",
        phone: "",
      }
    },
    onSubmit: async ({ value }) => {
      try {
        const { user, workshop: workshop } = value
        const { ...userTraited } = user
        const response = await responseTraited({ queryFn: () => proxy.api.apiWorkshopCreate({ user: userTraited, workshop }, { type: ContentType.Json }) })
        const data = responseExtractData(response)
        notifications.show({
          title: "Bienvenue",
          message: `Bienvenue parmis nous connecter vous pour continuer ${data.user?.last_name} ${data.user?.first_name}`,
          color: "success.9"
        })
        notifications.show({
          title: "Connecter vous",
          message: "Connectez vous pour avoir access a SEwing",
          color: "success.9"
        })
        closeDrawer(id)
        form.reset()
        return response
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
      isLoading={form.state.isSubmitting}
      title="Créons votre atelier"
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
            onClick={prevStep}
            disabled={active === 0}
          >
            précedent
          </Button>
          {active === 2 ?
            <Button
              radius="lg"
              color="primary"
              onClick={() => {
                form.handleSubmit()
              }}
              disabled={!form.state.isFormValid}
            >
              Crée
            </Button>
            :
            <Button
              radius="lg"
              color="primary"
              onClick={nextStep}
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
        <Stepper.Step label="Étape 1" description="Atelier">
          <Grid mb="40">
            <Grid.Col span={{ base: 12 }}>
              <TextField
                isError
                validators={{
                  onBlurAsync: async (state) => {
                    const response = await proxy.api.apiWorkshopValidatorsNamesUniqueCreate({ verify: state.value })
                    return response.data.exists ? { message: "Cet nom est deja pris" } : undefined
                  }
                }}
                form={form}
                name='workshop.name' placeholder="Nom de l'atelier" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TextAreaField
                isError
                form={form}
                name="workshop.description"
                placeholder='decrivez votre atelier'
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <EmailField form={form} name="workshop.email" isUnique={false} placeholder="mail de l'atelier" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <PhoneField form={form} name="workshop.phone" isUnique={false} placeholder="numerod e téléphone de l'atelier" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TextField form={form} name="workshop.country" readOnly isError />
            </Grid.Col>


            <Grid.Col span={{ base: 12 }}>
              <TextField form={form} name="workshop.city" isError />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TextField form={form} name="workshop.address" isError />
            </Grid.Col>

          </Grid>
        </Stepper.Step>

        <Stepper.Step label="Étape 2" description="Tailleur">
          <Grid mb="40">
            <Grid.Col span={{ base: 12 }}>
              <TextField form={form} name="user.last_name" isError placeholder='vos prénoms' />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TextField form={form} name="user.first_name" isError placeholder='votre nom' />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <EmailField form={form} name="user.email" isUnique={true} isError placeholder="mail personnel" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <PhoneField form={form} name="user.phone" isUnique={true} isError placeholder="numero de téléphone" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <PasswordField form={form} name="user.password" placeholder="mots de passe" />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <PasswordField form={form} name="user.password_confirm" placeholder="mots de passe" />
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Completed>
          <Stack flex={1}>
            <Title ta="center">Bienvenue {form.state.values.workshop.name}</Title>
            <Text c='dimmed' ta="center">
              Vous beneficierez de toutes les fonctionnalités de notre plateforme
              gratuitement pendant 30 jours nous vous invitons a nous faire des retours
              sur votre expérience
            </Text>
          </Stack>
        </Stepper.Completed>
      </Stepper>

    </DrawerStack>
  );
};
WorkshopCreateForm.id = id

