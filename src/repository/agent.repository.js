import { createBaseRepository } from './base.repository.js';
import prisma from "../config/prisma.js";


const baseRepo = createBaseRepository('agent', {
  tickets: true,
});

const findByEmail = async (email) => {
  return prisma.agent.findUnique({
    where: { email },
  });
};

export default {
  ...baseRepo,
  findByEmail,
};