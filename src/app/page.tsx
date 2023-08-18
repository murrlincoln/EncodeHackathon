import SSXComponent from '@/components/SSXComponent';
import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>SSX Next Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SSXComponent />
    </>
  )
}

export default Home;