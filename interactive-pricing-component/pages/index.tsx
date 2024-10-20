import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PricingComponent from '../components/PricingComponent'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Interactive Pricing Component</title>
        <meta name="description" content="Interactive pricing component challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Simple, traffic-based pricing
        </h1>
        <p className={styles.description}>
          Sign-up for our 30-day trial. No credit card required.
        </p>

        <PricingComponent />
      </main>

      <footer className={styles.footer}>
        <div className={styles.attribution}>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
          Coded by <a href="#">Your Name Here</a>.
        </div>
      </footer>
    </div>
  )
}

export default Home