
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.clearPreviewData({
        path: `/campaigns/${req.query.campaignId}`
    }).json({ok:true})
}