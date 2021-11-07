import React from "react";
import parse from "html-react-parser";

import styles from "../styles/components/PreviewArticolo.module.css";

export default class PreviewArticolo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href={`/articolo/${this.props.slug}`}
        className={styles.previewArticolo}
        id="preview-articolo"
      >
        <div
          className={styles.cover}
          style={{
            background: `no-repeat center/cover url(${this.props.cover})`,
          }}
        ></div>
        <h2 className={styles.titolo}>{parse(this.props.titolo)}</h2>
        <div className={styles.estratto}>{parse(this.props.estratto)}</div>
        <div className={styles.footer}>
          {(() => {
            if (this.props.mostraCategoria) {
              return (
                <p
                  className={styles.categoria}
                  style={{
                    color: `rgb(var(--accent-${this.props.categoria.slug}, var(--accent-default)))`,
                    background: `rgba(var(--accent-${this.props.categoria.slug}, var(--accent-default)), 0.18)`,
                  }}
                >
                  #{this.props.categoria.name}
                </p>
              );
            }
          })()}

          <p className={styles.dataPub}>
            {new Date(this.props.data).toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <style jsx>{`
          #preview-articolo {
            color: rgb(
              var(--accent-${this.props.categoria?.slug}, var(--accent-default))
            );
            border: 2px solid
              rgba(
                var(
                  --accent-${this.props?.categoria?.slug},
                  var(--accent-default)
                ),
                0.2
              );
            background: ${this.props.background ||
            `rgba(var(--accent-${this.props?.categoria?.slug}, var(--accent-default)), 0.1)`};
          }
        `}</style>
      </a>
    );
  }
}
