import Head from "next/head";
import parse from "html-react-parser";
import { useEffect } from "react";

import { APIWordPress } from "../../utils";

import Header from "../../components/Header";

import styles from "../../styles/Articolo.module.css";

export async function getServerSideProps(context) {
  const urlCorrente = "https://" + context.req.headers.host + context.req.url;
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
    props: { articolo, urlCorrente },
  };
}

export default function Articolo({ articolo, urlCorrente }) {
  const accent = articolo?._embedded?.["wp:term"]?.[0]?.[0]?.slug;

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', `var(--accent-${accent})`);
  })

  return (
    <home>
      <Head>
        <title>thINK - News dall'ITIS Biella</title>
      </Head>

      <div className={styles.wrapper}>
        <Header />
        <section
          className={styles.articolo}
          style={{
            border: `2px solid rgba(var(--accent-${accent}, var(--accent-default)), 0.2)`,
          }}
        >
          <h1>{parse(articolo.title.rendered)}</h1>
          {parse(articolo.content.rendered)}
          <div className={styles.fondo}>
            <div className={styles.categorie}>
              {articolo._embedded["wp:term"][0].map((categoria, key) => {
                return (
                  <a
                    href={`/categoria/${categoria.slug}`}
                    className={styles.categoria}
                    key={key}
                    style={{
                      color: `rgb(var(--accent-${categoria.slug}, var(--accent-default)))`,
                      background: `rgba(var(--accent-${categoria.slug}, var(--accent-default)), 0.2)`,
                    }}
                  >
                    #{categoria.name}
                  </a>
                );
              })}
            </div>
            <div className={styles.social}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  parse(articolo.title.rendered)
                )}&url=${encodeURIComponent(urlCorrente)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.twitter}
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
                  className="feather feather-twitter"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                  urlCorrente
                )}&t=${encodeURIComponent(
                  parse(articolo.title.rendered)
                )}&display=popup`}
                target="_blank"
                rel="noopener noreferrer"
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
                  className="feather feather-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <p>thINK - News dall'ITIS Biella - © ITIS Q. SELLA - BIELLA</p>
        </footer>
      </div>
      <style global jsx>{`
        body {
          background: rgba(var(--accent-${accent}, var(--accent-default)), 0.15);
        }
        header p {
          color: rgb(var(--accent));
        }
      `}</style>
    </home>
  );
}
