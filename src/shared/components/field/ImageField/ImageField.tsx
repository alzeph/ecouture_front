import { useAsyncTask, useAuth } from "@features/core/hook";
import { urlToFile } from "@features/core/tools";
import { AspectRatio, Image, Stack, Text, type ImageProps, type TextProps } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, type DropzoneProps } from '@mantine/dropzone';
import { useField } from "@tanstack/react-form";
import React, { useMemo } from "react";

export interface ImageFieldProps {
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
  ratio?: number
  imageProps?: ImageProps
  dropzoneProps?: DropzoneProps
  errorProps?: TextProps
  placeholder?: string,
  label?: React.ReactNode
}

export const ImageField = ({
  form,
  name,
  isError = false,
  validators,
  ratio = 1080 / 720,
  imageProps,
  dropzoneProps,
  errorProps,
  placeholder = "Selectionner une photo svp",
  label
}: ImageFieldProps) => {

  const field = useField({
    form,
    name,
    validators,
  });

  const { proxy } = useAuth()

  // Si la valeur initiale est une URL, on la transforme en File
  useAsyncTask(
    async () => {
      if (typeof field.state.value === "string" && field.state.value.startsWith("http")) {
        try {
          const file = await urlToFile(field.state.value, proxy);
          field.handleChange(file);
        } catch (err) {
          console.error("Erreur conversion URL -> File :", err);
        }
      }
    }
    , [field.state.value]);

  const errorMessage =
    isError && field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? (field.state.meta.errors[0] as unknown as { message: string }).message
      : undefined;

  const placeholderTraited = useMemo<string>(() => placeholder.trim().replace(' ', '+'), [placeholder])

  return (
    <Dropzone
      name={name}
      onDrop={async (files) => {
        let file = files[0];

        // ✅ Si c'est un Blob pur, on le convertit en File
        if (file instanceof Blob && !(file instanceof File)) {
          file = new File([file as Blob], "upload.jpg", { type: (file as Blob).type || "image/jpeg" });
        }

        // ✅ Vérifie aussi que Swagger/Redoc n’a pas renvoyé un objet JSON { path, relativePath }
        if (!(file instanceof File)) {
          console.warn("⚠️ La valeur n'est pas un vrai File :", file);
          return;
        }
        field.handleChange(file);
      }}

      onBlur={field.handleBlur}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...dropzoneProps}
    >
      <Stack justify="center" gap="xl" mih={220}>
        <AspectRatio ratio={ratio} mx="auto">
          {field.state.value instanceof File ? (
            <Image
              radius="md"
              src={URL.createObjectURL(field.state.value)}
              alt="Photo du tailleur"
              onLoad={() => URL.revokeObjectURL(field.state.value as any)}
              {...imageProps}
            />
          ) : (
            <Image
              radius="md"
              src={null}
              alt={placeholder}
              fallbackSrc={`https://placehold.co/600x400?text=${placeholderTraited}`}
              {...imageProps}
            />
          )}
        </AspectRatio>
        {typeof label === 'string' ? <Text ta='center' c='dimmed'>{label}</Text> : label}
        {errorMessage && <Text {...errorProps} size="sm" c="error.9">{errorMessage}</Text>}
      </Stack>
    </Dropzone>
  );
};
