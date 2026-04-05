import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';
import agentRoutes from './routes/agent.routes.js';
import clientRoutes from './routes/client.routes.js';
import categorieRoutes from './routes/categorie.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import { corsMiddleware, corsPreFlight } from './config/cors.js';


const app = express();

app.use(corsMiddleware);
app.options('/{*path}', corsPreFlight);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes ici
app.use("/api/agents", agentRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/tickets", ticketRoutes);

//health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'oks' });
});

app.use(notFound);
app.use(errorHandler);

export default app;