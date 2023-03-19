import cms from '@/libs/microcms'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // プロダクトならここでシークレットトークンの検証を行う
    const {
        campaignId,
        draftKey
    } = req.query

    const previewApplyPath = `/campaigns/${campaignId}`

    try {
        await res.setPreviewData(String(draftKey), { 
            path: previewApplyPath
        })
        return res.redirect(previewApplyPath)
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error revalidating')
    }
}