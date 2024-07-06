import { BodyType, HttpMethod, RequestTab, TabType, TextType, UploadFileType } from '@http/types/httpForm';
import { array, boolean, enum_, intersect, nullable, object, string } from 'valibot';

export const optionItemSchema = object({
  isChecked: boolean(),
});

export const pureHeaderSchema = object({
  key: string(),
  value: string(),
});

export const httpTextSchema = object({
  text: string(),
  textType: enum_(TextType),
});

export const uploadFileSchema = object({
  file: nullable(string()), // todo
  key: string(),
  type: enum_(UploadFileType),
  text: string(),
});

export const xFormSchema = object({
  key: string(),
  value: string(),
});

export const requestBodyFormSchema = object({
  bodyType: enum_(BodyType),
  text: httpTextSchema,
  formData: array(intersect([optionItemSchema, uploadFileSchema])),
  xForm: array(intersect([optionItemSchema, xFormSchema])),
});

export const requestParamsSchema = object({
  key: string(),
  value: string(),
});

export const requestSchema = object({
  url: string(),
  method: enum_(HttpMethod),
  headers: array(intersect([optionItemSchema, pureHeaderSchema])),
  body: requestBodyFormSchema,
  tab: enum_(RequestTab),
  params: array(intersect([optionItemSchema, requestParamsSchema])),
});

export const httpSchema = object({
  name: string(),
  tab: enum_(TabType),
  request: requestSchema,
});
