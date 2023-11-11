import express from 'express';

import * as urlController from '../controllers/url.controllers.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - urlId
 *         - fullUrl
 *         - shortUrl
 *       properties:
 *         urlId:
 *           type: string
 *           description: The ID of the short URL
 *         fullUrl:
 *           type: string
 *           description: The original URL
 *         shortUrl:
 *           type: string
 *           description: The short URL
 *         clicks:
 *           type: number
 *           description: The number of clicks on the short URL
 *       example:
 *         urlId: "pgQd3Jmk"
 *         fullUrl: "https://google.com/"
 *         shortUrl: "http://localhost:3000/pgQd3Jmk"
 *         clicks: 3
 */

/**
 * @swagger
 * tags:
 *  name: URLs
 *  description: Managing URLs operations
 */

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Shorten a URL
 *     description: Submit a URL to shorten it
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullUrl:
 *                 type: string
 *                 format: url
 *                 description: The full URL to shorten.
 *     responses:
 *       201:
 *         description: URL successfully shortened.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       400:
 *         description: Bad Request. The provided URL is invalid.
 */
router.post('/api/shorten', urlController.createUrl);

/**
 * @swagger
 * /{urlId}:
 *   get:
 *     summary: Redirect to the Original URL
 *     description: Redirect incoming requests to the original URL associated with the short URL.
 *     tags: [URLs]
 *     responses:
 *       302:
 *         description: Successfully redirected to the original URL
 *       404:
 *         description: URL Not Found. The provided URL ID is not associated with any short URL.
 */
router.get('/:urlId', urlController.getUrl);

export default router;
