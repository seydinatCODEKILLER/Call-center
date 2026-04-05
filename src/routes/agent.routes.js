import express from "express";
import * as controller from "../controllers/agent.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createAgentSchema,
  updateAgentSchema,
} from "../validations/agent.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agents
 *   description: Gestion des agents du centre d'appels CALL 221
 */

/**
 * @swagger
 * /agents:
 *   post:
 *     summary: Créer un nouvel agent
 *     tags: [Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *               - email
 *               - telephone
 *               - niveau
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: "Seydina"
 *               nom:
 *                 type: string
 *                 example: "Thiam"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "seydina.thiam@call221.sn"
 *               telephone:
 *                 type: string
 *                 example: "+221771234567"
 *               niveau:
 *                 type: string
 *                 enum: [JUNIOR, SENIOR, EXPERT]
 *                 example: "EXPERT"
 *     responses:
 *       201:
 *         description: Agent créé avec succès
 *       400:
 *         description: Données invalides (champs manquants, format incorrect)
 *       409:
 *         description: Conflit (adresse email déjà utilisée)
 */
router.post("/", validate(createAgentSchema), controller.create);

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Lister tous les agents
 *     tags: [Agents]
 *     responses:
 *       200:
 *         description: Liste de tous les agents
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Récupérer un agent par son ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de l'agent
 *     responses:
 *       200:
 *         description: Détails de l'agent trouvé
 *       404:
 *         description: Agent introuvable
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /agents/{id}:
 *   patch:
 *     summary: Mettre à jour les informations d'un agent
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de l'agent
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: "Seydina"
 *               nom:
 *                 type: string
 *                 example: "Thiam"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "s.thiam@call221.sn"
 *               telephone:
 *                 type: string
 *                 example: "+221789876543"
 *               niveau:
 *                 type: string
 *                 enum: [JUNIOR, SENIOR, EXPERT]
 *                 example: "SENIOR"
 *     responses:
 *       200:
 *         description: Informations de l'agent mises à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Agent introuvable
 *       409:
 *         description: Conflit (la nouvelle adresse email est déjà utilisée)
 */
router.patch("/:id", validate(updateAgentSchema), controller.update);

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Supprimer un agent
 *     tags: [Agents]
 *     description: >
 *       Supprime un agent de la base de données. 
 *       La suppression est bloquée si l'agent possède des tickets avec le statut 'OUVERT' ou 'EN_COURS'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de l'agent
 *     responses:
 *       200:
 *         description: Agent supprimé avec succès
 *       400:
 *         description: Impossible de supprimer l'agent (il a des tickets ouverts ou en cours)
 *       404:
 *         description: Agent introuvable
 */
router.delete("/:id", controller.remove);

export default router;