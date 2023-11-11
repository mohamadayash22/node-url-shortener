import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import './config/env.js';
import connectDB from './config/db.js';
import urlsRoutes from './routes/url.routes.js';
import specs from './swagger.config.js';

await connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(urlsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({ error: 'Server Error' });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
