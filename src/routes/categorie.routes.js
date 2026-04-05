import express from "express";
import * as controller from "../controllers/categorie.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createCategorieSchema,
  updateCategorieSchema,
} from "../validations/categorie.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Catégories
 *   description: Gestion des catégories de demandes du centre d'appels
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Catégories]
 *     description: "Le code de la catégorie est généré automatiquement (ex: CAT-0001)."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *               - priorite
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: "Réclamation"
 *               priorite:
 *                 type: string
 *                 enum: [BASSE, MOYENNE, HAUTE, CRITIQUE]
 *                 example: "HAUTE"
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post("/", validate(createCategorieSchema), controller.create);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lister toutes les catégories
 *     tags: [Catégories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *       404:
 *         description: Catégorie introuvable
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Mettre à jour une catégorie
 *     tags: [Catégories]
 *     description: Seul le libellé ou la priorité peuvent être modifiés. Le code est figé.
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
 *               libelle:
 *                 type: string
 *                 example: "Facturation"
 *               priorite:
 *                 type: string
 *                 enum: [BASSE, MOYENNE, HAUTE, CRITIQUE]
 *                 example: "CRITIQUE"
 *     responses:
 *       200:
 *         description: Catégorie mise à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catégorie introuvable
 */
router.patch("/:id", validate(updateCategorieSchema), controller.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Catégories]
 *     description: >
 *       Supprime une catégorie. Bloquée si des tickets sont liés à cette catégorie.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie supprimée
 *       400:
 *         description: Impossible de supprimer (des tickets utilisent cette catégorie)
 *       404:
 *         description: Catégorie introuvable
 */
router.delete("/:id", controller.remove);

export default router;
