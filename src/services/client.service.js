import clientRepo from "../repository/client.repository.js";
import { createBaseService } from "./base.service.js";
import HttpError from "../exceptions/http-error.exception.js";

const verifierEmailUnique = async (email, excludeId = null) => {
  const existing = await clientRepo.findByEmail(email);

  if (existing && existing.id !== excludeId) {
    throw new HttpError(
      "Cet adresse email est déjà utilisée par un client existant.",
      409,
    );
  }
};

const canDeleteClient = (client) => {
  if (client.tickets.length > 0) {
    throw new HttpError(
      "Impossible de supprimer ce client : il possède des tickets.",
      400,
    );
  }
};

const baseService = createBaseService({
  repository: clientRepo,
  entityName: "Client",
  canDelete: canDeleteClient,
});

const createClient = async (data) => {
  await verifierEmailUnique(data.email);
  return baseService.create(data);
};

const updateClient = async (id, data) => {
  if (data.email) {
    await verifierEmailUnique(data.email, id);
  }
  return baseService.update(id, data);
};

export default {
  ...baseService,
  create: createClient,
  update: updateClient,
};
