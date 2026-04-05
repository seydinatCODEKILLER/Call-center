import agentService from '../services/agent.service.js';
import { success } from '../utils/reponse.utils.js';

export const create = async (req, res, next) => {
  try {
    const agent = await agentService.create(req.body);
    return success(res, agent, 201, 'Agent créé avec succès');
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const agents = await agentService.getAll();
    return success(res, agents);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req, res, next) => {
  try {
        const id = parseInt(req.params.id, 10);
    const agent = await agentService.getById(id);
    return success(res, agent);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const agent = await agentService.update(id, req.body);
    return success(res, agent, 200, 'Agent mis à jour');
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await agentService.remove(id);
    return success(res, null, 200, 'Agent supprimé');
  } catch (err) {
    next(err);
  }
};