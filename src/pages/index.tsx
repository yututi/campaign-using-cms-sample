import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { GetStaticProps } from 'next'
import cms, { getCampaignList } from '@/libs/microcms'
import { CampaignList } from './api/campaigns'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  campaigns: CampaignList
}

export default function Home({campaigns}: Props) {
  
  return (
    <>
      <Head>
        <title>campaign using microcms sample</title>
        <meta name="description" content="test app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ul>
          {campaigns.contents.map(campaign => (
            <CampaignLink key={campaign.id} {...campaign}/>
          ))}
        </ul>
        <details>
          <summary>revalidateについて</summary>
          コンテンツの更新があったていでサーバ側のキャッシュを削除し、次にページを表示する際に最新のコンテンツで静的ファイルを生成し直します。<br/>
          本来はCMS側からwebhookなどで呼び出されるものですが、ローカルではやりようがないのでボタンでreavalidateするようにしています。<br/>
          <code>npm run dev</code>では動作しない(SSRになるので毎回最新コンテンツを取得する)ので、<code>npm run build & npm run start</code>で確認できます。
        </details>
      </main>
    </>
  )
}

const CampaignLink = ({id, title}: {id:string, title:string}) => {

  const [revalidated, setRevalidate] = useState(false)

  const onClick = async () => {
    await fetch(`/api/revalidate?${new URLSearchParams({
      campaignId: id
    })}`)
    setRevalidate(true)
  }

  return (
    <li>
      <Link href={`/campaigns/${id}`}>{title}</Link>
      <button onClick={onClick} disabled={revalidated}>Revalidate{revalidated && "d"}</button>
    </li>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {

  const campaigns = await await getCampaignList(0) 
  return {
    props: {
      campaigns,
    },
  }
}