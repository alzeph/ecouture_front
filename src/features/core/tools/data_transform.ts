type Primitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Blob
  | File
  | FileList;
type JSONValue = Primitive | JSONObject | JSONArray;
interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

export function jsonToFormData<T extends JSONObject>(json: T): FormData {
  const formData = new FormData();

  function process(value: JSONValue, path: string): void {
    if (value === undefined) return;

    if (value instanceof Date) {
      formData.append(path, value.toISOString());
      return;
    }

    if (value instanceof Blob || value instanceof File) {
      formData.append(path, value);
      return;
    }

    if (value instanceof FileList) {
      Array.from(value).forEach((file, i) => {
        formData.append(`${path}[${i}]`, file);
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        process(v, `${path}[${i}]`);
      });
      return;
    }

    if (value !== null && typeof value === "object") {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          process(value[key], `${path}.${key}`);
        }
      }
      return;
    }

    // Primitifs ou null
    formData.append(path, value === null ? "" : String(value));
  }

  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      process(json[key], key);
    }
  }

  return formData;
}

export function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanObject).filter((item) => item !== undefined);
  } else if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = cleanObject(value);
      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        !(typeof cleanedValue === "string" && cleanedValue.trim().length === 0)
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {} as any);
  }
  return obj;
}