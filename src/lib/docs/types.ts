/**
 * Shapes for the API reference. The data in `api-data.json` is generated from
 * the backend's own OpenAPI schema plus its filter classes — not hand-written —
 * so the fields and filters documented here are the ones the server actually
 * implements. Regenerate it when the API changes.
 */

export interface ApiField {
  name: string;
  type: string;
  required: boolean;
  readOnly: boolean;
  description: string;
}

export interface ApiOperation {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  operationId: string;
  description: string;
  isList: boolean;
  /** Query filters the endpoint actually honours. */
  query: string[];
  requestFields: ApiField[];
  responseFields: ApiField[];
  requestSchema: string | null;
  responseSchema: string | null;
}

export interface ApiResource {
  slug: string;
  title: string;
  group: string;
  intro: string;
  operations: ApiOperation[];
}
