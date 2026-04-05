import express from "express";
import * as controller from "../controllers/ticket.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validations/ticket.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestion des tickets d'assistance du centre d'appels
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Ouvrir un nouveau ticket
 *     tags: [Tickets]
 *     description: >
 *       Crée un ticket avec le statut 'OUVERT'.
 *       Vérifie l'existence du client, de l'agent et de la catégorie.
 *       Vérifie que l'agent n'a pas plus de 10 tickets actifs (OUVERT/EN_COURS).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - agentId
 *               - categorieId
 *               - objet
 *               - description
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 1
 *               agentId:
 *                 type: integer
 *                 example: 1
 *               categorieId:
 *                 type: integer
 *                 example: 1
 *               objet:
 *                 type: string
 *                 example: "Problème de connexion internet"
 *               description:
 *                 type: string
 *                 example: "Le client n'arrive pas à se connecter depuis ce matin. Le voyant de la box est rouge."
 *               dateCreation:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-25"
 *                 description: "Optionnel. Par défaut, c'est la date du jour. Ne peut pas être dans le futur."
 *     responses:
 *       201:
 *         description: Ticket créé avec succès
 *       400:
 *         description: Données invalides, date dans le futur, ou limite de 10 tickets atteinte pour l'agent
 *       404:
 *         description: Client, Agent ou Catégorie introuvable
 */
router.post("/", validate(createTicketSchema), controller.create);

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Lister tous les tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Liste des tickets avec les détails du client, de l'agent et de la catégorie
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Récupérer un ticket par ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du ticket
 *       404:
 *         description: Ticket introuvable
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /tickets/{id}:
 *   patch:
 *     summary: Mettre à jour un ticket
 *     tags: [Tickets]
 *     description: >
 *       Permet de modifier l'objet, la description ou le statut du ticket.
 *       Les IDs (client, agent, catégorie) ne peuvent pas être modifiés ici.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               objet:
 *                 type: string
 *               description:
 *                 type: string
 *               statut:
 *                 type: string
 *                 enum: [OUVERT, EN_COURS, RESOLU, FERME]
 *                 example: "EN_COURS"
 *     responses:
 *       200:
 *         description: Ticket mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Ticket introuvable
 */
router.patch("/:id", validate(updateTicketSchema), controller.update);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Supprimer un ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket supprimé
 *       404:
 *         description: Ticket introuvable
 */
router.delete("/:id", controller.remove);

export default router;
