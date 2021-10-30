import React from "react";
import parse from "html-react-parser";

import styles from "../styles/components/PreviewArticolo.module.css";

export default class PreviewArticolo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={`/articolo/${this.props.slug}`} className={styles.previewArticolo}>
        <div
          className={styles.cover}
          style={{
            background: `no-repeat center/cover url(${this.props.cover})`,
          }}
        />
        <div className={styles.testo}>
          <h2 className={styles.titolo}>{parse(this.props.titolo)}</h2>
          {parse(this.props.estratto)}
          <p className={styles.dataPubblicazione}>
            {new Date(this.props.data).toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </a>
    );
  }
}