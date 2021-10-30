import Head from "next/head";
import parse from 'html-react-parser';

import { APIWordPress } from "../../utils";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "../../styles/Articolo.module.css";

export async function getServerSideProps(context) {
  let articolo = await APIWordPress("posts", {
    slug: context.query.slug,
    _fields: ["date", "title.rendered", "content.rendered"],
  });

  articolo = articolo[0];

  return {
    props: { articolo },
  };
}

export default function Articolo({ articolo }) {
  return (
    <home>
      <Head>
        <title>thINK - News dall'ITIS Biella</title>
      </Head>

      <div className={styles.wrapper}>
      <Header />
        <section className={styles.articolo}>
          <h1>{parse(articolo.title.rendered)}</h1>
          {parse(articolo.content.rendered)}
        </section>
      </div>

      <Footer />
    </home>
  );
}
