import agentRepo from "../repository/agent.repository.js";
import { createBaseService } from "./base.service.js";
import HttpError from "../exceptions/http-error.exception.js";

const verifierEmailUnique = async (email, excludeId = null) => {
  const existing = await agentRepo.findByEmail(email);

  if (existing && existing.id !== excludeId) {
    throw new HttpError(
      "Cet adresse email est déjà utilisée par un agent existant.",
      409,
    );
  }
}

const canDeleteAgent = (agent) => {
  const hasActiveTickets = agent.tickets.some(
    (ticket) => ticket.statut === "OUVERT" || ticket.statut === "EN_COURS",
  );

  if (hasActiveTickets) {
    throw new HttpError(
      "Impossible de supprimer cet agent : il a des tickets ouverts ou en cours.",
      400,
    );
  }
};



const baseService = createBaseService({
  repository: agentRepo,
  entityName: "Agent",
  canDelete: canDeleteAgent,
});

const createAgent = async (data) => {
  await verifierEmailUnique(data.email);
  return baseService.create(data);
}

const updateAgent = async (id, data) => {
  if (data.email) {
    await verifierEmailUnique(data.email, id);
  }
  return baseService.update(id, data);
}

export default {
  ...baseService,
  create: createAgent,
  update: updateAgent,
};
