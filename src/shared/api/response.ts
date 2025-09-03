import type { Api, ExistsResponse } from "./api";
import type { AxiosError, AxiosResponse } from "axios";

export const responseTraited = async <TData>({
  queryFn,
}: {
  queryFn: () => Promise<AxiosResponse<TData, any>>;
}) => {
  try {
    return await queryFn();
  } catch (error) {
    const e = error as AxiosError;
    throw e;
  }
};

export const responseExtractData = <T>(response: AxiosResponse<T, any>): T => {
  const data = response.data;
  if (response.status === 200 || response.status === 201) {
    return data;
  } else {
    throw new Error(`Erreur ${response.status} rencontré`);
  }
};

export const responseIsExists = (
  response: AxiosResponse<ExistsResponse, any>
): ExistsResponse["exists"] => {
  return responseExtractData(response).exists;
};


type NestedKeys<T> = {
  [K in Extract<keyof T, string>]: T[K] extends Record<string, any>
    ? K | `${K}.${NestedKeys<T[K]>}`
    : K
}[Extract<keyof T, string>];

export const traitedWhoConatinsFileExtractData = <TData>({
  data,
  fields,
  proxy,
}: {
  data: TData;
  fields: NestedKeys<TData>[] | string[];
  proxy: Api<string>;
}): TData => {
  const base_url = proxy.instance.defaults?.baseURL;
  if (!base_url) return data;

  const getNestedValue = (obj: any, path: string) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;
    const target = keys.reduce((acc, key) => acc?.[key], obj);
    if (target) target[lastKey] = value;
  };

  const processItem = (item: any) => {
    fields.forEach((field) => {
      const value = getNestedValue(item, field as string);
      if (typeof value === "string") {
        setNestedValue(item, field as string, `${base_url}${value}`);
      }
    });
    return item;
  };

  if (Array.isArray(data)) {
    return data.map(processItem) as TData;
  }

  return processItem({ ...data }) as TData;
};



export const responseWhoConatinsFileExtractData = <
  TData extends Record<string, any>
>({
  response,
  fields,
  proxy,
}: {
  response: AxiosResponse<TData, any>;
  fields: NestedKeys<TData>[];
  proxy: Api<string>;
}): TData => {
  const data = responseExtractData(response);
  return traitedWhoConatinsFileExtractData({ data, fields, proxy });
};

export const getPageParam = ({
  response,
  name,
}: {
  response:
    | {
        next: string | null | undefined;
        previous: string | null | undefined;
        count: number;
        results: any[];
      }
    | any;
  name: "next" | "previous";
}): number | undefined => {
  if (!response[name]) return;
  const url = new URL(response[name]);
  const page = url.searchParams.get("page");
  return page ? Number(page) : undefined;
};
