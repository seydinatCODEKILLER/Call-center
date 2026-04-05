import clientService from '../services/client.service.js';
import { success } from '../utils/reponse.utils.js';

export const create = async (req, res, next) => {
  try {
    const client = await clientService.create(req.body);
    return success(res, client, 201, 'Client créé avec succès');
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const clients = await clientService.getAll();
    return success(res, clients);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const client = await clientService.getById(id);
    return success(res, client);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const client = await clientService.update(id, req.body);
    return success(res, client, 200, 'Client mis à jour');
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await clientService.remove(id);
    return success(res, null, 200, 'Client supprimé');
  } catch (err) {
    next(err);
  }
};