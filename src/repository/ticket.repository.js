import { createBaseRepository } from './base.repository.js';
import prisma from '../config/prisma.js';

const baseRepo = createBaseRepository('ticket', {
  client: true,
  agent: true,
  categorie: true,
});

const countActiveTicketsByAgent = async (agentId) => {
  return prisma.ticket.count({
    where: {
      agentId: agentId,
      statut: {
        in: ['OUVERT', 'EN_COURS'],
      },
    },
  });
};

export default {
  ...baseRepo,
  countActiveTicketsByAgent,
};