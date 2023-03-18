import type { EndPoints } from '../types/cms-types'
import { MicroCMS } from 'microcms-lib'

const cms = new MicroCMS<EndPoints>({
  service: process.env.MICRO_CMS_SERVICE_ID,
  apiKey: process.env.MICRO_CMS_API_KEY,
})

export default cms

export const getCampaignList = (offset = 0) => {
    
    return cms.gets("campaign", {
        limit: 10,
        offset,
        fields: ["id", "title"],
        orders: "published"
      })
}