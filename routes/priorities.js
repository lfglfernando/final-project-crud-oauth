const express = require('express');
const router = express.Router();
const controller = require('../controllers/priorityController');
const ensureAuth = require('../middleware/ensureAuth');

/**
 * @swagger
 * tags:
 *   name: Priorities
 *   description: API for managing priorities
 */

/**
 * @swagger
 * /api/priorities:
 *   get:
 *     summary: Get all priorities
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of priorities
 *   post:
 *     summary: Create a new priority
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: High
 *     responses:
 *       201:
 *         description: Priority created
 *
 * /api/priorities/{id}:
 *   get:
 *     summary: Get a priority by ID
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single priority object
 *       404:
 *         description: Priority not found
 *   put:
 *     summary: Update a priority
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Priority updated
 *   delete:
 *     summary: Delete a priority
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Priority deleted
 */

router.get('/', ensureAuth, controller.getAllPriorities);
router.get('/:id', ensureAuth, controller.getPriorityById);
router.post('/', ensureAuth, controller.createPriority);
router.put('/:id', ensureAuth, controller.updatePriority);
router.delete('/:id', ensureAuth, controller.deletePriority);

module.exports = router;
