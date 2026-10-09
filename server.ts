// Ponto de entrada do Vercel. O Vercel carrega este arquivo direto, sem
// resolver os atalhos do tsconfig (@shared, @modules): importar de src/ quebra
// a função ao iniciar ("Cannot find module '@shared/...'"). Por isso ele usa o
// código já compilado pelo Babel em dist/ (npm run build, via vercel.json),
// onde os atalhos viram caminhos relativos.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { app } = require('./dist/shared/infra/http/app');

export default app;
