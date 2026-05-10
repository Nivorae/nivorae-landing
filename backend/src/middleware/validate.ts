import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

type ValidationType = "body" | "params" | "query";

export function validate(schema: AnyZodObject, type: ValidationType = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) throw result.error;
    req[type] = result.data; // Strips unknown fields
    next();
  };
}

export const validateBody = (schema: AnyZodObject) => validate(schema, "body");
export const validateParams = (schema: AnyZodObject) => validate(schema, "params");
export const validateQuery = (schema: AnyZodObject) => validate(schema, "query");
