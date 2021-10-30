import Head from "next/head";

import { APIWordPress } from "../utils";

import PreviewArticolo from "../components/PreviewArticolo";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  let pagina = parseInt(context.query.p) || 1;
  if (pagina < 1) {
    pagina = 1;
  }

  const articoli = await APIWordPress("posts", {
    page: pagina,
    per_page: 6,
    _fields: [
      "date",
      "slug",
      "title.rendered",
      "excerpt.rendered",
      "jetpack_featured_media_url",
    ],
  });
  return {
    props: { articoli, pagina },
  };
}

export default function Home({ articoli, pagina }) {
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
        <div className={styles.paginazione}>
          {pagina > 1 ? (
            <a href={`/?p=${pagina - 1}`} className={styles.prec}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-arrow-left"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Pagina precedente
            </a>
          ) : (
            ""
          )}
          <a href={`/?p=${pagina + 1}`} className={styles.succ}>
            Pagina successiva
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <Footer />
    </home>
  );
}
