import axios from "axios"
import { GithubConfigs } from "../configs/app.config"


const getBranchData = async () => {
    const res: any = await axios.get(`${GithubConfigs.API_BASE_URL}/repos/ANCKR/mobilekit/git/ref/heads/CU-86cw3aqyd_user-location`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GithubConfigs.ACCESS_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
        .catch((err) => console.log({ err }))
    return res.data;
}

const createNewBranch = async (repoName: string, orgName: string, branchName: string, commitId: string) => {
    const res: any = await axios.post(`${GithubConfigs.API_BASE_URL}/repos/${orgName}/${repoName}/git/refs`, {
        owner: orgName,
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: commitId,
    }, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GithubConfigs.ACCESS_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
        .catch((err) => console.log({ err }))
    return res.data;
}

const createATag = async (repoName: string, orgName: string, version: string, commitId: string, remarks: string) => {
    const res = await axios.post(`${GithubConfigs.API_BASE_URL}/repos/${orgName}/${repoName}/git/tags`, {
        owner: orgName,
        repo: repoName,
        tag: `v${version}`,
        message: remarks,
        object: commitId,
        type: 'commit',
        tagger: {
            // TODO: Make this dynamic
            name: 'Kartik-anckr',
            email: 'kartik.gupta@xotiv.com',
            date: new Date().toISOString()
        },
    }, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GithubConfigs.ACCESS_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
        .catch((err) => console.log({ err }))


    const tagSha = res?.data?.sha;

    const resp: any = await axios.post(`${GithubConfigs.API_BASE_URL}/repos/${orgName}/${repoName}/git/refs`, {
        owner: orgName,
        repo: repoName,
        ref: `refs/tags/v${version}`,
        sha: tagSha,
    }, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GithubConfigs.ACCESS_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
        .catch((err) => console.log({ err }))
    return { ...resp.data, ...res?.data };
}

export {
    createNewBranch,
    createATag
}