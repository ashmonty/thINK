import Router from "next/router";

import styles from "../styles/components/WidgetRicerca.module.css";

export default function WidgetRicerca(props) {
  const expand = (e) => {
    document.querySelector("#thumb").style.display = "none";
    document.querySelector("#expanded").style.display = "block";
    document.querySelector("#widgetRicerca").style.padding = "24px";
    document.querySelector("#widgetRicerca").style.cursor = "default";
    document.querySelector("#widgetRicerca").style.border = "1px solid var(--text)";
  };

  const redirectToSearchPage = (e) => {
    e.preventDefault();
    Router.push(`/cerca/${e.target.ricerca.value}`);
  };
  return (
    <div className={styles.ricerca} id="widgetRicerca" onClick={expand}>
      <div className={styles.thumb} id="thumb">
        <span>Cerca</span>
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
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div className={styles.expanded} id="expanded">
        <form onSubmit={redirectToSearchPage}>
          <h2>
            Seleziona una categoria o{" "}
            <input
              id="ricerca"
              placeholder={"inserisci un termine"}
              className={styles.testo}
              required
            />
            <button type="submit" className={styles.invia}>
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
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </h2>
        </form>{" "}
        <div className={styles.listaCategorie}>
          {(() => {
            return props.categorie.map((categoria, index) => {
              return (
                <a
                  className={styles.categoria}
                  href={`/categoria/${categoria.slug}`}
                  style={{
                    color: `rgb(var(--accent-${categoria.slug}, var(--accent-default)))`,
                    background: `rgba(var(--accent-${categoria.slug}, var(--accent-default)), 0.18)`,
                  }}
                  key={index}
                >
                  #{categoria.name}
                </a>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
