import ticketService from "../services/ticket.service.js";
import { success } from "../utils/reponse.utils.js";

export const create = async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    return success(res, ticket, 201, "Ticket créé et assigné avec succès");
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const tickets = await ticketService.getAll();
    return success(res, tickets);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ticket = await ticketService.getById(id);
    return success(res, ticket);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ticket = await ticketService.updateTicket(id, req.body);
    return success(res, ticket, 200, "Ticket mis à jour");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await ticketService.remove(id);
    return success(res, null, 200, "Ticket supprimé");
  } catch (err) {
    next(err);
  }
};
