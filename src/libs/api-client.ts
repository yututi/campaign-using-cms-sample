import { CampaignList } from "@/pages/api/campaigns"

export const fetchCampaigns = async (offset = 0) => {
    return await fetch(`/api/campaigns?${new URLSearchParams({offset: String(offset)}).toString()}`).then(res => res.json()) as Promise<CampaignList>
}