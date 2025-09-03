//import styles from './login-form.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { AspectRatio, Button, Flex, Stack, Title, useMantineTheme } from "@mantine/core";
import { PasswordField, TextField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import type { AxiosError } from "axios";
import * as z from 'zod'

import sewingLogin from '@assets/img/sewing_login.jpg';


export interface LoginFormProps { }

const id = "LoginForm"

const loginSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email invalide" }),
  password: z.string().min(6, 'le mot de passe doit contenir au moins 6 caractères'),
});

export const LoginForm = ({ }: LoginFormProps) => {

  const theme = useMantineTheme()
  const { closeDrawer } = useDrawerManager()
  const { isAuthenticated, login, logout } = useAuth()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        login(value);
        form.reset()
        closeDrawer(id)
      } catch (error) {
        const e = error as AxiosError
        if (e && e.status && e.status === 401) {
          return { fields: { password: "Email ou password incorrect", email: "Email ou password incorrect" } }
        }
      }
    },
    validators: {
      onChange: loginSchema
    }
  });

  return (
    <DrawerStack
      id={id}
      title="Connexion"
      isLoading={form.state.isSubmitting}
    >
      <Flex m={0} direction="column" h="100%" style={{ borderRadius: theme.spacing.lg }}>
        <Stack gap="lg" p="lg" style={{ flex: 1 }} justify='center' >

          {!isAuthenticated ? (
            <>
              <TextField form={form} name="email" placeholder="address mail" />
              <PasswordField form={form} name="password" placeholder="Mot de passe" />

              <Flex direction='column' align={'center'} justify={'center'} gap="lg">
                <Button
                  color='primary'
                  radius="lg"
                  size="md"
                  type="submit"
                  disabled={form.state.isSubmitting}
                  onClick={form.handleSubmit}
                >
                  Se connecter
                </Button>
                {/* <Title
                  style={{ cursor: 'pointer' }}
                  order={6}
                  onClick={() => dispatch(openModal({ id: REGISTER_FORM_MODAL }))}
                  c="text">crée un compte</Title> */}
              </Flex>
            </>) : (
            <>
              <Title order={5} ta='center'>Voulez vous vraiment vous deconnecter</Title>
              <Flex align={'center'} justify={'center'}>
                <Button
                  color='primary'
                  radius="lg"
                  size="md"
                  type="submit"
                  disabled={!isAuthenticated}
                  onClick={() => {
                    logout()
                    closeDrawer(id)
                  }}
                >
                  se deconnecter
                </Button>
              </Flex>
            </>
          )}
        </Stack>
        <section>
          <AspectRatio
            ratio={1080 / 720}
            maw="100%"
            p={0} m={0}
            style={{
              display: 'flex',
              alignItems: 'end',
              borderRadius:
                theme.spacing.lg,
            }}>
            <img
              src={sewingLogin}
              alt="sewing login"
              width="100%"
              style={{
                borderRadius: `100% 100% ${theme.spacing.md} ${theme.spacing.md}`,
                boxShadow: '0 -1px 20px rgba(0, 0, 0, 0.2)',
              }}
            />
          </AspectRatio>
        </section>
      </Flex>
    </DrawerStack>
  );
};

LoginForm.id = id