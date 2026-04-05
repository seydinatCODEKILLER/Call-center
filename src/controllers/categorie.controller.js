import categorieService from "../services/categorie.service.js";
import { success } from "../utils/reponse.utils.js";

export const create = async (req, res, next) => {
  try {
    const categorie = await categorieService.createCategorie(req.body);
    return success(res, categorie, 201, "Catégorie créée avec succès");
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const categories = await categorieService.getAll();
    return success(res, categories);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const categorie = await categorieService.getById(id);
    return success(res, categorie);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const categorie = await categorieService.updateCategorie(id, req.body);
    return success(res, categorie, 200, "Catégorie mise à jour");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await categorieService.remove(id);
    return success(res, null, 200, "Catégorie supprimée");
  } catch (err) {
    next(err);
  }
};
