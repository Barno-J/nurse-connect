import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;