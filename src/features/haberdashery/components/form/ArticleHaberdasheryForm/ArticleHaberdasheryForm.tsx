//import styles from './article-haberdashery-form.module.css';

import { DrawerStack } from "@features/core/components";
import { APP_NAME } from "@features/core/constants";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ContentType, getPageParam, responseExtractData, responseIsExists, responseTraited, type ArticleInHaberdasheryRead, type TypeArticleInHaberdasheryRead } from "@shared/api";
import { PhoneField, SelectField, TextField } from "@shared/components";
import { useForm } from "@tanstack/react-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import * as z from 'zod';

export interface ArticleHaberdasheryFormProps { }

const schema = z.object({
  type_article: z.string().min(1, "Type d'article"),
  name: z.string().min(1, "Nom de l'article incorrecte"),
  quantity: z.number().min(1, "Entrez une quantité valide"),
})

const id = "ArticleHaberdasheryForm"
export const ArticleHaberdasheryForm = ({ }: ArticleHaberdasheryFormProps) => {

  const { workshop, proxy } = useAuth()
  const { closeDrawer, getData } = useDrawerManager()
  const initialData = useMemo(() => {
    const data = getData() as { article: ArticleInHaberdasheryRead }
    return data?.article
  }, [getData])

  const {
    data: typeArticles,
    isLoading: isLoadingTypeArticles,
    fetchNextPage: fetchNextPageTypeArticles,
  } = useInfiniteQuery({
    queryKey: [APP_NAME, 'customer_workshop', workshop],
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.haberdasheryTypesList({ page: pageParam })
        return response.data
      } else {
        return {
          next: undefined,
          previous: undefined,
          count: 0,
          results: [] as TypeArticleInHaberdasheryRead[]
        }
      }
    },
    initialPageParam: 1,
    getNextPageParam: (response) => getPageParam({ response, name: 'next' }),
    getPreviousPageParam: (response) => getPageParam({ response, name: 'previous' }),
    enabled: !!workshop,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })

  const form = useForm({
    validators: {
      onChange: schema
    },
    defaultValues: {
      type_article: initialData?.type_article || '',
      name: initialData?.name || '',
      quantity: initialData?.quantity || 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = initialData
          ? await responseTraited({ queryFn: () => proxy.api.haberdasheryArticlesPartialUpdate(String(initialData.pk), value, { type: ContentType.Json }) })
          : await responseTraited({ queryFn: () => proxy.api.haberdasheryArticlesCreate(value, { type: ContentType.Json }) })

        const data = responseExtractData(response)
        notifications.show({
          title: "Article dans la mercerie",
          message: `Article ${data.name} ${initialData ? 'modifier' : 'ajouter'} avec success`,
          color: 'success.9'
        })
        closeDrawer(id)
        return response
      } catch (error) {
        const e = error as AxiosError
        notifications.show({
          title: "Article dans la mercerie",
          message: `${initialData ? 'modification' : 'ajout'} de l'article ${initialData?.name} a echouer`,
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
          <SelectField<TypeArticleInHaberdasheryRead>
            form={form}
            name={"type_article"}
            isError
            data={typeArticles?.pages.map(page => page.results).flat().map(type => type)}
            placeholder='Selectionner le client'
            query={{
              infiniteScroll: true,
              queryFn: fetchNextPageTypeArticles,
              isLoading: isLoadingTypeArticles
            }}
            render={(value) => ({ label: `${value.name}`, value: value.pk, data: value })}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <TextField
            form={form}
            name='name'
            placeholder="Nom de l'article"
            isError
            validators={{
              onBlurAsync: async ({ value }) => {
                const response = await proxy.api.haberdasheryArticleNamesUniqueCreate(form.state.values.type_article, { verify: value }, { type: ContentType.Json, secure: true })
                const isExists = responseIsExists(response)
                return isExists ? { message: "le nom de l'article est dej utiliser" } : undefined
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <PhoneField
            form={form}
            name='quantity'
            placeholder='nom du model a coudre'
            isError
          />
        </Grid.Col>
      </Grid>
    </DrawerStack>
  );
};
ArticleHaberdasheryForm.id = id
