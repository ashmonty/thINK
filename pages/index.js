import Head from "next/head";

import { APIWordPress } from "../utils";

import PreviewArticolo from "../components/PreviewArticolo";
import Header from "../components/Header";

import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const articoli = await APIWordPress(
    "posts?page=1&per_page=6&_fields=date,slug,title.rendered,excerpt.rendered,jetpack_featured_media_url"
  );
  return {
    props: { articoli },
  };
}

export default function Home({ articoli }) {
  return (
    <home>
      <Head>
        <title>thINK - News dall'ITIS Biella</title>
      </Head>

      <Header />

      <div className={styles.wrapper}>
        <section className={styles.articoli}>
          {articoli.map((articolo, index) => {
            return (
              <PreviewArticolo
                cover={articolo.jetpack_featured_media_url}
                titolo={articolo.title.rendered}
                estratto={articolo.excerpt.rendered}
                data={articolo.date}
                slug={articolo.slug}
                key={index}
              />
            );
          })}
        </section>
      </div>
    </home>
  );
}
