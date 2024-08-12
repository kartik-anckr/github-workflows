import express from 'express';
import { createBuildController } from '../controllers/github.controller';

const app = express();

app.post('/branch', createBuildController)

export default app;