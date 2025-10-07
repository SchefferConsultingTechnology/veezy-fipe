const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Veezy FIPE API',
    description: 'Documentação dos endpoints FIPE.',
  },
  host: 'localhost:3002', // ou seu domínio da Vercel depois
  schemes: ['http', 'https'],
};

const outputFile = './src/shared/infra/http/swagger/swagger-output.json';
const endpointsFiles = ['./src/shared/infra/http/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
