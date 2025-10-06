import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import serverless from 'serverless-http';

// Se estiver rodando localmente, inicia normalmente
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.APP_API_PORT || 3002;
  app.listen(port, () => {
    console.log(`Server running locally at http://localhost:${port}`);
  });
}

// Exporta handler para Vercel
export const handler = serverless(app);
export default app;
