import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { GetStaticProps } from 'next'
import cms, { getCampaignList } from '@/libs/microcms'
import { CampaignList } from './api/campaigns'
import Link from 'next/link'

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
        {campaigns.contents.map(campaign => (
          <CampaignLink key={campaign.id} {...campaign}/>
        ))}
      </main>
    </>
  )
}

const CampaignLink = ({id, title}: {id:string, title:string}) => {
  return (
    <div>
      <Link href={`/campaigns/${id}`}>{title}</Link>
    </div>
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