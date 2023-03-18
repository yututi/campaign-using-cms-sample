import cms from "@/libs/microcms"
import { campaign } from "@/types/cms-types"
import { GetStaticProps } from "next"

type CampaignProps = {
    campaign?: campaign<"get"> | null
}

const productStyle = {height: "300px", width: "200px", border: "1px dashed lightgray", padding: "2em"}

export default function Campaign({campaign}:CampaignProps) {

    console.log(campaign)

    const fields = campaign?.body.map(field => {
        if (field.fieldId === "productPickup") {
            return (
                <div>
                    <h2>{field.title}</h2>
                    <p>{field.description}</p>
                    <div style={productStyle}>
                    商品:{field.productId}
                    </div>
                </div>
            )
        }
        if (field.fieldId === "productListPickup") {
            return (
                <div>
                    <h2>{field.heading}</h2>
                    <p>{field.description}</p>
                    <div style={{display: "flex", gap: "20px"}}>
                        {field.list.map(product => (
                            <div style={productStyle}>
                                商品:{product.productId}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        if (field.fieldId === "text") {
            if (!field.text) return null;
            return (
                <section dangerouslySetInnerHTML={{__html:field.text}}></section>
            )
        }
    })

  return <div>
    {fields}
  </div>
}

export const getStaticProps: GetStaticProps<CampaignProps> = async (props) => {

    console.log(props)

    if (!props.params?.campaignId) {
        return {
            props : {},
            redirect: 404,
        }
    }

    const campaign = await cms.get("campaign", String(props.params!.campaignId))
    
    return {
      props: {
        campaign,
      },
    }
  }

export async function getStaticPaths() {
return {
    paths: [],
    fallback: "blocking"
}
}