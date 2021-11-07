import Head from "next/head";

import { useEffect } from "react";

import { APIWordPress } from "../../utils";

import PreviewArticolo from "../../components/PreviewArticolo";
import Header from "../../components/Header";

import styles from "../../styles/Home.module.css";

export async function getServerSideProps(context) {
  let pagina = parseInt(context.query.p) || 1;
  if (pagina < 1) {
    pagina = 1;
  }

  let categoria = await APIWordPress(`categories`, {
    search: context.query.slug[0],
    _fields: ["id", "name", "slug"],
  });

  categoria = categoria[0] || null;

  const articoli = await APIWordPress("posts", {
    page: pagina,
    per_page: 6,
    categories: categoria?.id,
    _fields: [
      "date",
      "slug",
      "title.rendered",
      "excerpt.rendered",
      "jetpack_featured_media_url",
    ],
  });

  const paginaSuccessiva = await APIWordPress("posts", {
    page: pagina + 1,
    per_page: 6,
    categories: categoria?.id,
    _fields: ["pid"],
  });

  // Se non c'è una pagina successiva, la variabile "succ" è settata su false, per nascondere il tasto per la pagina successiva
  const succ = paginaSuccessiva?.data?.status !== 400;

  return {
    props: { articoli, pagina, categoria, succ },
  };
}

export default function Home({ articoli, pagina, categoria, succ }) {
  const accent = categoria.slug;
  useEffect(() => {
    document.body.style.backgroundColor = `rgba(var(--accent-${accent}, var(--accent-default)), 0.1)`;
    document.documentElement.style.setProperty(
      "--accent",
      `rgb(var(--accent-${accent}, var(--accent-default))`
    );
    document.documentElement.style.setProperty(
      "--text",
      `rgb(var(--accent-${accent}, var(--accent-default))`
    );
  });
  return (
    <home>
      <Head>
        <title>thINK - News dall'ITIS Biella</title>
      </Head>

      <div className={styles.wrapper}>
        <Header />

        <h2>#{categoria?.name}</h2>

        <section className={styles.articoli}>
          {(() => {
            try {
              return articoli.map((articolo, index) => {
                return (
                  <PreviewArticolo
                    cover={articolo.jetpack_featured_media_url}
                    titolo={articolo.title.rendered}
                    estratto={articolo.excerpt.rendered}
                    data={articolo.date}
                    categoria={categoria}
                    background={`rgba(255, 255, 255, 0.7)`}
                    slug={articolo.slug}
                    key={index}
                  />
                );
              });
            } catch (err) {
              console.log(err);
              return (
                <div style={{ marginBottom: "192px" }}>
                  <h1>404</h1>
                  <p>Sicuro di essere alla pagina giusta?</p>
                  <a href="/">Torna alla pagina principale</a>
                </div>
              );
            }
          })()}
        </section>
        <div className={styles.paginazione}>
          <a
            href={pagina - 1 === 1 ? "?" : `?p=${pagina - 1}`}
            className={pagina > 1 ? "" : "visibilityHidden"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className={styles.nascondiMobile}>Pagina precedente</span>
          </a>

          <a
            href={`?p=${pagina + 1}`}
            className={succ ? "" : "visibilityHidden"}
          >
            <span className={styles.nascondiMobile}>Pagina successiva</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
        <footer className={styles.footer}>
          <p>thINK - News dall'ITIS Biella - © ITIS Q. SELLA - BIELLA</p>
        </footer>
      </div>
    </home>
  );
}
