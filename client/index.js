import { IncomingMessage } from "http";
import { getClient } from "@faustjs/next";
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

export const client = getClient({
  schema: generatedSchema,
  scalarsEnumsHash,
});

export function serverClient(req) {
  return (
    getClient < GeneratedSchema,
    SchemaObjectTypesNames,
    SchemaObjectTypes >
      {
        schema: generatedSchema,
        scalarsEnumsHash,
        context: req,
      }
  );
}

export * from "./schema.generated";
