import express from "express";
import * as controller from "../controllers/client.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createClientSchema,
  updateClientSchema,
} from "../validations/client.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion des clients appelants du centre d'appels CALL 221
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Clients]
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
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: "Moussa"
 *               nom:
 *                 type: string
 *                 example: "Diop"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "moussa.diop@entreprise.sn"
 *               telephone:
 *                 type: string
 *                 example: "+221761234567"
 *               societe:
 *                 type: string
 *                 example: "Sonatel"
 *                 description: Optionnel
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Conflit (adresse email déjà utilisée)
 */
router.post("/", validate(createClientSchema), controller.create);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lister tous les clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste de tous les clients
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Récupérer un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du client trouvé
 *       404:
 *         description: Client introuvable
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Mettre à jour les informations d'un client
 *     tags: [Clients]
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
 *               prenom:
 *                 type: string
 *                 example: "Moussa"
 *               nom:
 *                 type: string
 *                 example: "Diop"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "m.diop@sonatel.sn"
 *               telephone:
 *                 type: string
 *                 example: "+221789876543"
 *               societe:
 *                 type: string
 *                 example: "Orange"
 *                 nullable: true
 *                 description: "Laisser null ou vide pour supprimer la société du client"
 *     responses:
 *       200:
 *         description: Informations du client mises à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Client introuvable
 *       409:
 *         description: Conflit (email déjà utilisé)
 */
router.patch("/:id", validate(updateClientSchema), controller.update);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Clients]
 *     description: >
 *       Supprime un client. La suppression est bloquée si le client possède au moins un ticket (quel que soit son statut).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client supprimé avec succès
 *       400:
 *         description: Impossible de supprimer (le client a des tickets)
 *       404:
 *         description: Client introuvable
 */
router.delete("/:id", controller.remove);

export default router;
