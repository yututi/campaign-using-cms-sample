import { fetchCampaigns } from '@/libs/api-client'
import cms, {getCampaignList} from '@/libs/microcms'
import type { NextApiRequest, NextApiResponse } from 'next'

export type CampaignList = {
  contents: {id: string, title:string}[]
  limit: number,
  offset: number,
  totalCount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CampaignList | null>
) {

  const {offset: offsetRaw} = req.query

  const campaigns = await getCampaignList(offsetRaw ? Number(offsetRaw) : 0) 

  res.json(campaigns)
}
