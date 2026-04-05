import { z } from "zod";

export const createTicketSchema = z.object({
  clientId: z
    .number({ required_error: "Le clientId est obligatoire" })
    .int("Le clientId doit être un entier"),

  agentId: z
    .number({ required_error: "L'agentId est obligatoire" })
    .int("L'agentId doit être un entier"),

  categorieId: z
    .number({ required_error: "Le categorieId est obligatoire" })
    .int("Le categorieId doit être un entier"),

  objet: z
    .string({ required_error: "L'objet est obligatoire" })
    .min(3, "L'objet doit contenir au moins 3 caractères"),

  description: z
    .string({ required_error: "La description est obligatoire" })
    .min(10, "La description doit contenir au moins 10 caractères"),

  dateCreation: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "dateCreation doit être une date valide (YYYY-MM-DD)",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "La date de création ne peut pas être dans le futur",
    })
    .optional(),
});

export const updateTicketSchema = z.object({
  objet: z
    .string()
    .min(3, "L'objet doit contenir au moins 3 caractères")
    .optional(),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .optional(),
  statut: z
    .enum(["OUVERT", "EN_COURS", "RESOLU", "FERME"], {
      invalid_type_error:
        "Le statut doit être OUVERT, EN_COURS, RESOLU ou FERME",
    })
    .optional(),
});
