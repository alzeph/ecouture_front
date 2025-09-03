//import styles from './workshop-setting-page.module.css';

import { APP_NAME } from "@features/core/constants";
import { useAuth, useConfirmationAction } from "@features/core/hook";
import { Button, Checkbox, Flex, Grid, Loader, Stack, Tabs, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, getPageParam, responseExtractData, responseTraited, traitedWhoConatinsFileExtractData, type PackageHistoryRead, type PatchedSettingWriteRequest, type WorkerRead } from "@shared/api";
import { AvatarSewing, EmailField, PhoneField, TableSewing, TextAreaField, TextField } from "@shared/components";
import { IconBuildingStore, IconGauge, IconLock, IconPackage } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import * as z from 'zod';
import { type DataTableColumn } from 'mantine-datatable';
import { useRef } from "react";
import dayjs from "dayjs";


const schema = z.object({
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

const GeneralInfoTab = () => {
  const { workshop, proxy, refetchUser } = useAuth()

  const form = useForm({
    validators: {
      onChange: schema
    },
    defaultValues: {
      name: workshop?.name || "",
      description: workshop?.description || "",
      address: workshop?.address || "",
      city: workshop?.city || "",
      country: workshop?.country || "",
      email: workshop?.email || "",
      phone: workshop?.phone || "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await responseTraited({
          queryFn: () => proxy.api.apiWorkshopPartialUpdate(workshop?.slug || "", value, { type: ContentType.Json, secure: true })
        })
        refetchUser()
        const data = responseExtractData(response)
        notifications.show({
          title: "Modifier",
          message: `Modifier: ${data.name} avec success`,
          color: "success.9"
        })
        return data
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: "Une erreur ces produite",
          message: `Une erreru ces produite lros de la créationde votre atelier veuiller réeseyer: ${e.message} `,
          color: 'error.9'
        })
      }
    }
  })
  return workshop
    ? (
      <Grid mb="40">
        <Grid.Col span={{ base: 12 }}>
          <TextField
            isError
            validators={{
              onBlurAsync: async (state) => {
                const response = await proxy.api.apiWorkshopValidatorsNamesUniqueCreate({ verify: state.value, exclude: workshop?.name })
                return response.data.exists ? { message: "Cet nom est deja pris" } : undefined
              }
            }}
            form={form}
            name='name' placeholder="Nom de l'atelier" />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextAreaField
            isError
            form={form}
            name="description"
            placeholder='decrivez votre atelier'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <EmailField form={form} name="email" isUnique={false} placeholder="mail de l'atelier" />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <PhoneField form={form} name="phone" isUnique={false} placeholder="numerod e téléphone de l'atelier" />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextField form={form} name="country" readOnly isError />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextField form={form} name="city" isError />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <TextField form={form} name="address" isError />
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Button
            radius="lg"
            color="primary"
            onClick={() => {
              form.handleSubmit()
            }}
            disabled={!form.state.isFormValid}
          >
            Modifier
          </Button>
        </Grid.Col>
      </Grid>
    ) : (
      <Flex h={"100%"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    )

}

const PackagesTab = () => {

  const { workshop, proxy } = useAuth()
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme()

  const { data: packages, fetchNextPage: fetchNextPagePackages, isLoading: isloadingPackages, isFetchingNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [APP_NAME, workshop, "packages-HITORYS"],
    enabled: !!workshop,
    retry: !!workshop,
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.apiWorkshopPackageHistoryList(
          {
            slug: workshop.slug,
            page: pageParam
          },
          {
            secure: true
          })
        return response.data
      }
      return {
        next: undefined,
        previous: undefined,
        count: 0,
        results: [] as PackageHistoryRead[]
      }
    },
    getNextPageParam: (response) => getPageParam({ response, name: 'next' },),
  })

  const columns: DataTableColumn<PackageHistoryRead>[] = [
    {
      accessor: "name",
      title: "Nom",
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
    },
    {
      accessor: "price",
      title: "Prix",
    },
    {
      accessor: "start_date",
      title: "Date de debut",
      render: (record) => dayjs(record.start_date).format('dddd DD MMM YYYY'),
    },
    {
      accessor: "end_date",
      title: "Date de fin",
      render: (record) => dayjs(record.end_date).format('dddd DD MMM YYYY'),

    },
    {
      accessor: "createdAt",
      title: "Date de creation",
      render: (record) => dayjs(record.createdAt).format('dddd DD MMM YYYY'),
    },
  ]

  if (!workshop) {
    return (
      <Flex h={"100%"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    )
  }

  return (
    <TableSewing
      pinLastColumn={false}
      scrollViewportRef={scrollViewportRef}
      columns={columns}
      records={packages?.pages.flatMap(page => page.results)}
      fetching={isloadingPackages || isFetchingNextPage}
      onScrollToBottom={fetchNextPagePackages}
    />
  )
}

const LimitsTab = () => {
  return (
    <Flex h={"100%"} justify={"center"} align={"center"}>
      Contenu des limites
    </Flex>
  )
}

const PermissionsTab = () => {

  const { workshop, proxy } = useAuth()
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const confirmation = useConfirmationAction()

  const { data: workers, fetchNextPage: fetchNextPageWorker, isLoading: isLoadingWorker } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [APP_NAME, 'workers', workshop],
    enabled: !!workshop,
    retry: !!workshop,
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.apiWorkshopUsersWorkersList({
          slug: workshop.slug,
          page: pageParam,
        }, { secure: true })
        return response.data
      }
      return {
        next: undefined,
        previous: undefined,
        count: 0,
        results: [] as WorkerRead[]
      }
    },
    getNextPageParam: (response) => getPageParam({ response, name: 'next' },),
  })

  const settingPatch = useMutation({
    mutationFn: async (data: PatchedSettingWriteRequest) => {
      const response = await responseTraited({
        queryFn: () => proxy.api.apiWorkshopSettingPartialUpdate(workshop?.slug || "", data, { secure: true })
      })
      return responseExtractData(response)
    },
    onSuccess: () => {
      notifications.show({
        title: "Modification effectuer",
        message: "Modification effectuer avec success",
        color: "success.9"
      })
    },
    onError: (error) => {
      const e = error as AxiosError
      notifications.show({
        title: "Une erreur ces produite",
        message: `Une erreru ces produite lros de la créationde votre atelier veuiller réeseyer: ${e.message} `,
        color: 'error.9'
      })
    }
  })

  if (!workshop) {
    return (
      <Flex h={"100%"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    )
  }

  const columns: DataTableColumn<WorkerRead>[] = [
    {
      accessor: 'last_name',
      title: "Nom et prénoms",
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      render: (worker) => (
        <AvatarSewing
          photo={worker.user.photo || ""}
          name={`${worker.user.last_name}`}
          username={worker.user.first_name}
          noName={false}
        />
      ),
    },
    {
      accessor: 'phone',
      title: 'Contact',
      width: 'fit-content',
      render: (worker) => (
        <Stack gap={0}>
          <Text component='a' href={`tel:${worker.user.phone}`}>{worker.user.phone}</Text>
          <Text c='dimmed' component='a' href={`mailto:${worker.user.email}`}>{worker.user.email}</Text>
        </Stack>
      )
    },
    {
      accessor: 'order',
      title: "Commandes",
      titleStyle: () => {
        return {
          textAlign: 'center'
        }
      },
      render: (worker) => (
        <Flex justify='center'>
          <Checkbox
            defaultChecked={workshop.settings.worker_authorization_is_order.includes(worker.id)}
            disabled={settingPatch.isPending}
            onChange={(event) => {
              const checked = event.target.checked
              confirmation({
                title: "Attribution d'autorisation",
                message: `Voulez-vous ${checked ? 'autoriser' : 'interdire'} l'acces aux commandes à ${worker.user.first_name} ${worker.user.last_name}?`,
                confirmLabel: "Confirmer",
                cancelLabel: "Annuler",
                onCancel: () => {
                  event.target.checked = !checked
                },
                onConfirm: async () => {
                  if (checked) {
                    settingPatch.mutate({
                      worker_authorization_is_order: [...workshop.settings.worker_authorization_is_order, worker.id]
                    })
                  } else {
                    settingPatch.mutate({
                      worker_authorization_is_order: workshop.settings.worker_authorization_is_order.filter(id => id !== worker.id)
                    })
                  }
                }
              })
            }}
          />
        </Flex>
      )
    },
    {
      accessor: 'fitting',
      title: "Essayages",
      titleStyle: () => {
        return {
          textAlign: 'center'
        }
      },
      render: (worker) => (
        <Flex justify='center'>
          <Checkbox
            defaultChecked={workshop.settings.worker_authorization_is_fitting.includes(worker.id)}
            disabled={settingPatch.isPending}
            onChange={(event) => {
              const checked = event.target.checked
              confirmation({
                title: "Attribution d'autorisation",
                message: `Voulez-vous ${checked ? 'autoriser' : 'interdire'} l'acces aux essayages à ${worker.user.first_name} ${worker.user.last_name}?`,
                confirmLabel: "Confirmer",
                cancelLabel: "Annuler",
                onCancel: () => {
                  event.target.checked = !checked
                },
                onConfirm: async () => {
                  if (checked) {
                    settingPatch.mutate({
                      worker_authorization_is_fitting: [...workshop.settings.worker_authorization_is_fitting, worker.id]
                    })
                  } else {
                    settingPatch.mutate({
                      worker_authorization_is_fitting: workshop.settings.worker_authorization_is_fitting.filter(id => id !== worker.id)
                    })
                  }
                }
              })
            }}
          />
        </Flex>
      )
    },
    {
      accessor: 'customer',
      title: "Clients",
      titleStyle: () => {
        return {
          textAlign: 'center'
        }
      },
      render: (worker) => (
        <Flex justify='center'>
          <Checkbox
            defaultChecked={workshop.settings.worker_authorization_is_customer.includes(worker.id)}
            disabled={settingPatch.isPending}
            onChange={(event) => {
              const checked = event.target.checked
              confirmation({
                title: "Attribution d'autorisation",
                message: `Voulez-vous ${checked ? 'autoriser' : 'interdire'} l'acces aux clients à ${worker.user.first_name} ${worker.user.last_name}?`,
                confirmLabel: "Confirmer",
                cancelLabel: "Annuler",
                onCancel: () => {
                  event.target.checked = !checked
                },
                onConfirm: async () => {
                  if (checked) {
                    settingPatch.mutate({
                      worker_authorization_is_customer: [...workshop.settings.worker_authorization_is_customer, worker.id]
                    })
                  } else {
                    settingPatch.mutate({
                      worker_authorization_is_customer: workshop.settings.worker_authorization_is_customer.filter(id => id !== worker.id)
                    })
                  }
                }
              })
            }}
          />
        </Flex>
      )
    },
    {
      accessor: 'worker',
      title: "Employés",
      titleStyle: () => {
        return {
          textAlign: 'center'
        }
      },
      render: (worker) => (
        <Flex justify='center'>
          <Checkbox
            defaultChecked={workshop.settings.worker_authorization_is_worker.includes(worker.id)}
            disabled={settingPatch.isPending}
            onChange={(event) => {
              const checked = event.target.checked
              confirmation({
                title: "Attribution d'autorisation",
                message: `Voulez-vous ${checked ? 'autoriser' : 'interdire'} l'acces aux Ouvrier à ${worker.user.first_name} ${worker.user.last_name}?`,
                confirmLabel: "Confirmer",
                cancelLabel: "Annuler",
                onCancel: () => {
                  event.target.checked = !checked
                },
                onConfirm: async () => {
                  if (checked) {
                    settingPatch.mutate({
                      worker_authorization_is_worker: [...workshop.settings.worker_authorization_is_worker, worker.id]
                    })
                  } else {
                    settingPatch.mutate({
                      worker_authorization_is_worker: workshop.settings.worker_authorization_is_worker.filter(id => id !== worker.id)
                    })
                  }
                }
              })
            }}
          />
        </Flex>
      )
    },

    {
      accessor: 'setting',
      title: "Paramètres",
      titleStyle: () => {
        return {
          textAlign: 'center'
        }
      },
      render: (worker) => (
        <Flex justify='center'>
          <Checkbox
            defaultChecked={workshop.settings.worker_authorization_is_setting.includes(worker.id)}
            disabled={settingPatch.isPending}
            onChange={(event) => {
              const checked = event.target.checked
              confirmation({
                title: "Attribution d'autorisation",
                message: `Voulez-vous ${checked ? 'autoriser' : 'interdire'} l'acces aux Paramètres à ${worker.user.first_name} ${worker.user.last_name}?`,
                confirmLabel: "Confirmer",
                cancelLabel: "Annuler",
                onCancel: () => {
                  event.target.checked = !checked
                },
                onConfirm: async () => {
                  if (checked) {
                    settingPatch.mutate({
                      worker_authorization_is_setting: [...workshop.settings.worker_authorization_is_setting, worker.id]
                    })
                  } else {
                    settingPatch.mutate({
                      worker_authorization_is_setting: workshop.settings.worker_authorization_is_setting.filter(id => id !== worker.id)
                    })
                  }
                }
              })
            }}
          />
        </Flex>
      )
    },
  ]

  return (
    <TableSewing
      scrollViewportRef={scrollViewportRef}
      columns={columns}
      records={workers ? traitedWhoConatinsFileExtractData({
        data: workers?.pages.map((page) => page.results).flat().filter((worker) => worker.is_owner === false) as WorkerRead[],
        fields: ["user.photo"],
        proxy
      }) : []}
      fetching={isLoadingWorker}
      onScrollToBottom={fetchNextPageWorker}
      pinLastColumn={false}
    />
  )
}

export interface WorkshopSettingPageProps { }

export const WorkshopSettingPage = ({ }: WorkshopSettingPageProps) => {

  return (
    <Tabs variant="outline" defaultValue="general">
      <Tabs.List>
        <Tabs.Tab value="general" leftSection={<IconBuildingStore size={20} />}>
          Informations Générales
        </Tabs.Tab>
        <Tabs.Tab value="packages" leftSection={<IconPackage size={20} />}>
          Packages et Historiques
        </Tabs.Tab>
        <Tabs.Tab value="limits" leftSection={<IconGauge size={20} />}>
          Limites
        </Tabs.Tab>
        <Tabs.Tab value="permissions" leftSection={<IconLock size={20} />}>
          Permissions
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="general" pt="lg" pb="lg">
        <GeneralInfoTab />
      </Tabs.Panel>

      <Tabs.Panel value="packages" pt="lg" pb="lg">
        <PackagesTab />
      </Tabs.Panel>

      <Tabs.Panel value="limits" pt="lg" pb="lg">
        <LimitsTab />
      </Tabs.Panel>

      <Tabs.Panel value="permissions" pt="lg" pb="lg">
        <PermissionsTab />
      </Tabs.Panel>
    </Tabs>
  );
};
