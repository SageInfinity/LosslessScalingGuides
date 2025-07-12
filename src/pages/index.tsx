import type {JSX, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React from 'react';
import styles from './index.module.css';
import Hero from '../components/Hero';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/*<Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
         <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/Guides/Initiation">
            Go to Guides
          </Link>
        </div> */}
      </div>
    </header>
  );
}


export default function Home(): JSX.Element {
  return (
    <Layout>
      <main>
        <Hero 
          title={<>LOSSLESS<br />SCALING</>}
          imageUrl="/img/d1.png"
        />
        
        {/* Rest of your content */}
      </main>
    </Layout>
  );
}
