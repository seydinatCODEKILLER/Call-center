import { createBaseRepository } from './base.repository.js';
import prisma from '../config/prisma.js';

const baseRepo = createBaseRepository('categorie', {
  tickets: true,
});

const getLastCategorie = async () => {
  return prisma.categorie.findFirst({
    orderBy: {
      id: 'desc',
    },
  });
};

const findByCode = async (code) => {
  return prisma.categorie.findUnique({
    where: { code },
  });
};

export default {
  ...baseRepo,
  getLastCategorie,
  findByCode,
};