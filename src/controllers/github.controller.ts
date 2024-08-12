import { createATag, createNewBranch } from "../vendors/github.vendor"

const createBuildController = async (req: Request, res: any) => {
    const reqBody: any = req.body;

    // Validate request body
    if (!reqBody) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const requiredFields = ["version", "environment", "remarks", "commitId", "repoName", "orgName"];
    for (const field of requiredFields) {
        if (!reqBody[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    const buildVersion = reqBody?.version;
    const environment = reqBody?.environment;
    const qaRemarks = reqBody?.remarks;
    const commitId = reqBody?.commitId;
    const repoName = reqBody?.repoName;
    const orgName = reqBody?.orgName;

    const branchName = `${environment}_${buildVersion}_${Math.ceil(new Date().getTime() / 1000)}`

    const branchData = await createNewBranch(repoName, orgName, branchName, commitId);
    const tagData = await createATag(repoName, orgName, buildVersion, commitId, qaRemarks);

    return res.status(200).json({
        success: true,
        data: {
            branch: branchData,
            tag: tagData
        }
    })
}

export {
    createBuildController
}