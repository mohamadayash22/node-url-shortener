import swaggerJSDoc from 'swagger-jsdoc';

import './config/env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS URL Shortener',
      description:
        'A simple Node.js URL shortener using ExpressJS and MongoDB.',
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

export default specs;
