import Head from "next/head";
import parse from "html-react-parser";

import { APIWordPress } from "../../utils";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "../../styles/Articolo.module.css";

export async function getServerSideProps(context) {
  let articolo = await APIWordPress("posts", {
    slug: context.query.slug,
    _embed: "wp:term",
    _fields: [
      "date",
      "title.rendered",
      "content.rendered",
      "categories",
      "_links",
      "_embedded",
    ],
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
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
        <div id="fb-root"></div>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0"
          nonce="zQ4M24rK"
        ></script>
      </Head>

      <div className={styles.wrapper}>
        <Header />
        <section className={styles.articolo}>
          <h1>{parse(articolo.title.rendered)}</h1>
          {parse(articolo.content.rendered)}
          <div className={styles.categorie}>
            Categorie:
            {articolo._embedded["wp:term"][0].map((categoria, i) => {
              if (i === 0) {
                return (
                  <div>
                    <p>&nbsp;</p>
                    <a href={`/categoria/${categoria.slug}`}>
                      {categoria.name}
                    </a>
                  </div>
                );
              } else {
                return (
                  <div>
                    <p>,&nbsp;</p>
                    <a href={`/categoria/${categoria.slug}`}>
                      {categoria.name}
                    </a>
                  </div>
                );
              }
            })}
          </div>
          <div className={styles.condividi}>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
              data-text={parse(articolo.title.rendered)}
              data-size="large"
              data-show-count="false"
            >
              Twitta
            </a>
            <div
              class="fb-share-button"
              data-layout="button"
              data-size="large"
            />
          </div>
        </section>
      </div>

      <Footer />
    </home>
  );
}
