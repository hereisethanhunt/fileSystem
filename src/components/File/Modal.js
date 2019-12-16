import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Modal.module.css";
import CloseIcon from "../../images/closeIcon.svg";
import FileIcon from "../../images/file.png";
import FolderIcon from "../../images/folder.png";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, modal, toggle } = this.props;
    return (
      <div
        ref={this.container}
        className={modal ? styles.modalOpen : styles.modalClose}
      >
        <img
          alt="CLOSE"
          src={CloseIcon}
          className={styles.modalToggler}
          onClick={toggle}
        />

        <div className={styles.modalBody}>
          <div className={styles.heading}>{"File Info"}</div>
          <div className={styles.imageWrapper}>
            {data.type === "file" ? (
              <Fragment>
                <img alt="FILE" src={FileIcon} />
                <span className={styles.fileExt}>
                  {data.name.split(".")[1]}
                </span>
              </Fragment>
            ) : (
              <img alt="FOLDER" src={FolderIcon} />
            )}
          </div>
          <div className={styles.description}>
            <div>
              <div className={styles.textItemsHead}>Name :</div>
              <div className={styles.textItems}>{data.name}</div>
            </div>
            <div>
              <div className={styles.textItemsHead}>Size :</div>
              <div className={styles.textItems}>{data.size}</div>
            </div>
            <div>
              <div className={styles.textItemsHead}>Creator Name :</div>
              <div className={styles.textItems}>{data.createdBy}</div>
            </div>
            <div>
              <div className={styles.textItemsHead}>Created Date :</div>
              <div className={styles.textItems}>{data.date}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Modal);
