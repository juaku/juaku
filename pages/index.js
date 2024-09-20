import Head from 'next/head'
// import Image from 'next/legacy/image'
import { React, useState } from 'react'
// import IpfsComponent from '../components/ipfs'
import { Provider } from '../context/Context'
import UploadButton from '../components/UploadButton'
import Feed from '../components/Feed'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'

export default function Home () {
  const [isComposing, setIsComposing] = useState(false);

  const handleUploadStart = () => {
    setIsComposing(true);
  };

  const handleUploadEnd = () => {
    setIsComposing(false);
  };

  return (
    <Provider>
      <div className={styles.container}>
        <Head>
          <title>Juaku</title>
          <meta name="description" content="Juaku" />
          <link rel="icon" href="" />
        </Head>

        <main className={styles.main}>
          {/* <h1 className={styles.title}>
            Bienvenido a <a href="/">Juaku</a>
          </h1>

          <p className={styles.description}>
            Puedes subir contenido usando el botón {' '}
            <code className={styles.code}>+</code>
          </p> */}

          <UploadButton onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} isComposing={isComposing} />
          {!isComposing && <Feed />}
        </main>

        <footer className={styles.footer}>
          <Nav />
        </footer>
      </div>
    </Provider>
  )
}
