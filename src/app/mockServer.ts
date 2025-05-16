import express from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import loginMockHandlers from '@/features/login/api/loginMockHandler';

const handlers = [...loginMockHandlers];
const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(PORT, () => console.log(`Mock server is running on port: ${PORT}`));
