import cms from "@/libs/microcms"
import { campaign } from "@/types/cms-types"
import { GetStaticProps } from "next"

type CampaignProps = {
    campaign?: campaign<"get"> | null
}

const productStyle = {height: "300px", width: "200px", border: "1px dashed lightgray", padding: "2em"}

export default function Campaign({campaign}:CampaignProps) {

    const fields = campaign?.body.map((field, index) => {
        if (field.fieldId === "productPickup") {
            return (
                <div>
                    <h2 id={`${field.fieldId}_${index}`}>{field.title}</h2>
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
                    <h2 id={`${field.fieldId}_${index}`}>{field.heading}</h2>
                    <p>{field.description}</p>
                    <div style={{display: "flex", gap: "20px"}}>
                        {field.list.map(product => (
                            <div key={product.fieldId} style={productStyle}>
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
                <div>
                    {field.title && <h2 id={`${field.fieldId}_${index}`}>{field.title}</h2>}
                    <div dangerouslySetInnerHTML={{__html:field.text}}></div>
                </div>
            )
        }
    })

  return (
    <div>
        <h1>{campaign?.title}</h1>
        <div>
            {campaign?.toc && <TOC campaign={campaign}/>}
        </div>
        {fields}
    </div>
  )

}

const TOC = ({campaign}: CampaignProps) => {
    
    const links = campaign?.body.map((field, index) => {
        
        const title = () => {
            if (field.fieldId === "productPickup") return field.title;
            if (field.fieldId === "productListPickup") return field.heading;
            if (field.fieldId === "text") return field.title;
        }
        
        return (
        <li>
            <a href={`#${field.fieldId}_${index}`}>{title()}</a>
        </li>
    )})

    return (
        <ul>
            {links}
        </ul>
    )
}

export const getStaticProps: GetStaticProps<CampaignProps> = async (props) => {

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