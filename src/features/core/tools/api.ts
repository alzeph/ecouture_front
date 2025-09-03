import type { Api, ExistsResponse } from "@shared/api";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const responseIsExists = (
  response: AxiosResponse<ExistsResponse, any>
): ExistsResponse["exists"] => {
  const data = response.data;
  try {
    if (response.status === 200 || response.status === 201) {
      return data.exists;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const urlToFile = async (path: string | null, proxy: Api<string>) => {
  // Choix du client selon si c'est une URL absolue ou un chemin relatif
  if (!path || path === null) return new File([], "downloaded-file");

  const client = path.startsWith("http") ? axios : proxy.instance;

  const response = await client.get(path, {
    responseType: "blob",
  });

  const blob = response.data;

  // Récupération du nom du fichier dans les headers
  const extention = String(blob.type).split("/")[1];
  let filename = `profile-image.${extention}`;

  return new File([blob], filename, { type: blob.type });
};
