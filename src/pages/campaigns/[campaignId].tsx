import cms from "@/libs/microcms"
import { campaign } from "@/types/cms-types"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"

type CampaignProps = {
    campaign?: campaign<"get"> | null
    isPreview?: boolean
}

const productStyle = {height: "300px", width: "200px", border: "1px dashed lightgray", padding: "2em"}

export default function Campaign({campaign, isPreview = false}:CampaignProps) {

    if (!campaign) return null;

    const fields = campaign?.body.map((field, index) => {
        const key = `${field.fieldId}_${index}`
        if (field.fieldId === "productPickup") {
            return (
                <section key={key}>
                    <h2 id={key}>{field.title}</h2>
                    <p>{field.description}</p>
                    <div style={productStyle}>
                    商品:{field.productId}
                    </div>
                </section>
            )
        }
        if (field.fieldId === "productListPickup") {
            return (
                <section key={key}>
                    <h2 id={key}>{field.heading}</h2>
                    <p>{field.description}</p>
                    <div style={{display: "flex", gap: "20px"}}>
                        {field.list.map(product => (
                            <div key={product.productId} style={productStyle}>
                                商品:{product.productId}
                            </div>
                        ))}
                    </div>
                </section>
            )
        }
        if (field.fieldId === "text") {
            if (!field.text) return null;
            return (
                <section key={key}>
                    {field.title && <h2 id={key}>{field.title}</h2>}
                    <div dangerouslySetInnerHTML={{__html:field.text}}></div>
                </section>
            )
        }
    })

  return (
    <main>
        {isPreview && <PreviewHeader campaignId={campaign.id}/>}
        <h1>{campaign?.title}</h1>
        {campaign?.toc && (
            <nav>
                <TOC campaign={campaign}/>
            </nav>
        )}
        {fields}
    </main>
  )

}

const PreviewHeader = ({campaignId}:{campaignId:string}) => {

    const router = useRouter()
    const onClick = async () => {
        await fetch(`/api/clearPreview?${new URLSearchParams({campaignId}).toString()}`)
        router.reload()
    }

    return (
        <header>
            これはプレビューモードです。
            <button onClick={onClick}>プレビューの終了</button>
        </header>
    )
}

const TOC = ({campaign}: CampaignProps) => {
    
    const links = campaign?.body.map((field, index) => {
        
        const title = (() => {
            if (field.fieldId === "productPickup") return field.title;
            if (field.fieldId === "productListPickup") return field.heading;
            if (field.fieldId === "text") return field.title;
        })()
        if (title) return null;
        const key = `${field.fieldId}_${index}`
        return (
        <li key={key}>
            <a href={`#${key}`}>{title}</a>
        </li>
    )}).filter(Boolean)

    return (
        <ul>
            {links}
        </ul>
    )
}

const allowPreviewDraft = process.env.ALLOW_PREVIEW_DRAFT === "yes"
export const getStaticProps: GetStaticProps<CampaignProps> = async (props) => {

    if (!props.params?.campaignId) {
        return {
            props : {},
            redirect: 404,
        }
    }

    const isPreview = !!(allowPreviewDraft && props.previewData)
    const campaign = await cms.get("campaign", String(props.params!.campaignId), {
        draftKey: isPreview ? String(props.previewData): undefined
    })

    return {
        props: {
        campaign,
        isPreview
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}