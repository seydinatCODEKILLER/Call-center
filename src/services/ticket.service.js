import ticketRepo from "../repository/ticket.repository.js";
import clientRepo from "../repository/client.repository.js";
import agentRepo from "../repository/agent.repository.js";
import categorieRepo from "../repository/categorie.repository.js";
import { createBaseService } from "./base.service.js";
import HttpError from "../exceptions/http-error.exception.js";

// --- Vérifications d'existence (via les repositories) ---
const verifierExistenceClient = async (clientId) => {
  const client = await clientRepo.findById(clientId);
  if (!client) throw new HttpError("Client introuvable", 404);
};

const verifierExistenceAgent = async (agentId) => {
  const agent = await agentRepo.findById(agentId);
  if (!agent) throw new HttpError("Agent introuvable", 404);
};

const verifierExistenceCategorie = async (categorieId) => {
  const categorie = await categorieRepo.findById(categorieId);
  if (!categorie) throw new HttpError("Catégorie introuvable", 404);
};

// --- Règle métier limite agent (via le repository ticket) ---
const verifierLimiteTicketsAgent = async (agentId) => {
  const nbTicketsActifs = await ticketRepo.countActiveTicketsByAgent(agentId);
  if (nbTicketsActifs >= 10) {
    throw new HttpError(
      "Impossible d'assigner ce ticket : l'agent a déjà atteint sa limite de 10 tickets actifs (OUVERT/EN_COURS)",
      400,
    );
  }
};

const baseService = createBaseService({
  repository: ticketRepo,
  entityName: "Ticket",
});

const createTicket = async (data) => {
  const { clientId, agentId, categorieId, objet, description, dateCreation } =
    data;

  // 1. Vérifications métier (Layer Repository uniquement)
  await verifierExistenceClient(clientId);
  await verifierExistenceAgent(agentId);
  await verifierExistenceCategorie(categorieId);
  await verifierLimiteTicketsAgent(agentId);

  // 2. Création
  return baseService.create({
    objet,
    description,
    dateCreation: dateCreation ? new Date(dateCreation) : new Date(),
    statut: "OUVERT",
    client: { connect: { id: clientId } },
    agent: { connect: { id: agentId } },
    categorie: { connect: { id: categorieId } },
  });
};

const updateTicket = async (id, data) => {
  if (data.clientId || data.agentId || data.categorieId) {
    delete data.clientId;
    delete data.agentId;
    delete data.categorieId;
  }
  return baseService.update(id, data);
};

export default {
  ...baseService,
  createTicket,
  updateTicket,
};
