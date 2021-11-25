import Head from "next/head";

import { APIWordPress } from "../../utils";

import PreviewArticolo from "../../components/PreviewArticolo";
import Header from "../../components/Header";
import WidgetRicerca from "../../components/WidgetRicerca";

import styles from "../../styles/Home.module.css";

export async function getServerSideProps(context) {
  let pagina = parseInt(context.query.page) || 1;
  if (pagina < 1) {
    pagina = 1;
  }

  const ricerca = context.query.slug[0];

  const articoli = await APIWordPress("posts", {
    search: context.query.slug[0],
    page: pagina,
    per_page: 6,
    _embed: "wp:term",
    _fields: [
      "date",
      "slug",
      "title.rendered",
      "excerpt.rendered",
      "jetpack_featured_media_url",
      "_links",
      "_embedded",
    ],
  });

  const paginaSuccessiva = await APIWordPress("posts", {
    page: pagina + 1,
    per_page: 6,
    search: context.query.slug[0],
    _fields: ["pid"],
  });

  // Se non c'è una pagina successiva, la variabile "succ" è settata su false, per nascondere il tasto per la pagina successiva
  const succ = paginaSuccessiva?.data?.status !== 400;

  const categorie = await APIWordPress("categories", {
    _fields: ["name", "slug"],
  });

  return {
    props: { articoli, categorie, ricerca, pagina, succ },
  };
}

export default function Home({ articoli, categorie, ricerca, pagina, succ }) {
  return (
    <home>
      <Head>
        <title>thINK - News dall'ITIS Biella</title>
        <link
          rel="icon"
          href="https://notizie.itis.biella.it/wp-content/uploads/2021/11/think-150x150.jpg"
        />
      </Head>

      <div className={styles.wrapper}>
        <Header />

        <div className={styles.wrapperRicerca}>
          <h2>
            Risultati della ricerca per <i>{ricerca}</i>
          </h2>
          <WidgetRicerca categorie={categorie} />
        </div>

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
                    categoria={articolo?._embedded?.["wp:term"]?.[0]?.[0]}
                    mostraCategoria
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
            href={pagina - 1 === 1 ? "?" : `?page=${pagina - 1}`}
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
            href={`?page=${pagina + 1}`}
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
