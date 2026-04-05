import { z } from "zod";

export const createAgentSchema = z.object({
  prenom: z
    .string({ required_error: "Le prénom est obligatoire" })
    .min(1, "Le prénom ne peut pas être vide"),

  nom: z
    .string({ required_error: "Le nom est obligatoire" })
    .min(1, "Le nom ne peut pas être vide"),

  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Format de l'email invalide"),

  telephone: z
    .string({ required_error: "Le téléphone est requis" })
    .regex(
      /^221(77|78|76|70|75)\d{7}$/,
      "Le téléphone doit commencer par 221 suivi de 77, 78, 76, 70 ou 75 et contenir 7 chiffres",
    ),

  niveau: z.enum(["JUNIOR", "SENIOR", "EXPERT"], {
    required_error: "Le niveau est obligatoire",
    invalid_type_error: "Le niveau doit être JUNIOR, SENIOR ou EXPERT",
  }),
});

export const updateAgentSchema = z.object({
  prenom: z.string().min(1, "Le prénom ne peut pas être vide").optional(),
  nom: z.string().min(1, "Le nom ne peut pas être vide").optional(),
  email: z.string().email("Format de l'email invalide").optional(),
  telephone: z
    .string()
    .regex(
      /^221(77|78|76|70|75)\d{7}$/,
      "Le téléphone doit commencer par 221 suivi de 77, 78, 76, 70 ou 75 et contenir 7 chiffres",
    )
    .optional(),
  niveau: z
    .enum(["JUNIOR", "SENIOR", "EXPERT"], {
      invalid_type_error: "Le niveau doit être JUNIOR, SENIOR ou EXPERT",
    })
    .optional(),
});
