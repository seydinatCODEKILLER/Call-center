import categorieRepo from "../repository/categorie.repository.js";
import { createBaseService } from "./base.service.js";
import HttpError from "../exceptions/http-error.exception.js";

const generateCode = async () => {
  const last = await categorieRepo.getLastCategorie();
  let nextNumber = 1;

  if (last?.code) {
    const parts = last.code.split("-");
    nextNumber = parseInt(parts[1], 10) + 1;
  }

  return `CAT-${String(nextNumber).padStart(4, "0")}`;
};

const verifierCodeUnique = async (code) => {
  const existing = await categorieRepo.findByCode(code);
  if (existing) {
    throw new HttpError(
      "Un problème est survenu lors de la génération du code (doublon)",
      409,
    );
  }
};

const canDeleteCategorie = (categorie) => {
  if (categorie.tickets.length > 0) {
    throw new HttpError(
      "Impossible de supprimer cette catégorie : des tickets y sont rattachés.",
      400,
    );
  }
};

const baseService = createBaseService({
  repository: categorieRepo,
  entityName: "Catégorie",
  canDelete: canDeleteCategorie,
});

const createCategorie = async (data) => {
  const code = await generateCode();
  await verifierCodeUnique(code);

  return baseService.create({
    ...data,
    code,
  });
};

const updateCategorie = async (id, data) => {
  if (data.code) {
    delete data.code;
  }

  return baseService.update(id, data);
};

export default {
  ...baseService,
  createCategorie,
  updateCategorie,
};
