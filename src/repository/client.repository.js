import { createBaseRepository } from './base.repository.js';
import prisma from "../config/prisma.js";

const baseRepo = createBaseRepository('client', {
  tickets: true, 
});

const findByEmail = async (email) => {
  return prisma.client.findUnique({
    where: { email },
  });
};

export default {
  ...baseRepo,
    findByEmail,
};