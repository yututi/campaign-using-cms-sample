import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    // プロダクトならここでシークレットトークンの検証を行う

    try {
        await res.revalidate(`/campaigns/${req.query.campaignId}`)
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}