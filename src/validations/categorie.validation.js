import { z } from "zod";

export const createCategorieSchema = z.object({
  libelle: z
    .string({ required_error: "Le libellé est obligatoire" })
    .min(1, "Le libellé ne peut pas être vide"),

  priorite: z.enum(["BASSE", "MOYENNE", "HAUTE", "CRITIQUE"], {
    required_error: "La priorité est obligatoire",
    invalid_type_error:
      "La priorité doit être BASSE, MOYENNE, HAUTE ou CRITIQUE",
  }),
});

export const updateCategorieSchema = z.object({
  libelle: z.string().min(1, "Le libellé ne peut pas être vide").optional(),
  priorite: z
    .enum(["BASSE", "MOYENNE", "HAUTE", "CRITIQUE"], {
      invalid_type_error:
        "La priorité doit être BASSE, MOYENNE, HAUTE ou CRITIQUE",
    })
    .optional(),
});
