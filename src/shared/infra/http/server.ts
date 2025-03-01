import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
app.listen(process.env.APP_API_PORT || 3002, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${process.env.PORT || 3002}! 🏆`);
});
