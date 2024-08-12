import dotenv from 'dotenv'
dotenv.config()

const AppConfigs = {
    PORT: process.env.PORT
}

const GithubConfigs = {
    ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    API_BASE_URL: `https://api.github.com`,
    USERNAME: 'ANCKR'
}

export {
    AppConfigs,
    GithubConfigs
}