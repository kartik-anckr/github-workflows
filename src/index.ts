import express from 'express';
import { AppConfigs } from './configs/app.config';
import GithubRoutes from './routes/github.route'

const app = express();

const PORT = AppConfigs.PORT

app.use(express.json())

app.use("/v1/github", GithubRoutes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));