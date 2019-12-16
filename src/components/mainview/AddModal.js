import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./AddModal.module.css";
import CloseIcon from "../../images/closeIcon.svg";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      switch: "folder",
      name: "",
      creator: "",
      size: 0,
      date: ""
    };
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };

  selectedSwitch = val => {
    this.setState({ switch: val });
  };

  addData = () => {
    let newData = {
      name: this.state.name,
      size: this.state.size,
      createdBy: this.state.creator,
      date: this.state.date,
      type: this.state.switch,
      children: [],
      parentPath: "Root" + this.props.location.pathname
    };
    this.props.addData(newData);
  };

  render() {
    const { modal, toggle } = this.props;
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
          <div className={styles.heading}>{"Create New"}</div>
          <div className={styles.switch}>
            <div className={styles.switchContainer}>
              <div
                className={
                  this.state.switch === "file"
                    ? `${styles.switchOptions} ${styles.selected}`
                    : styles.switchOptions
                }
                onClick={() => this.selectedSwitch("file")}
              >
                File
              </div>
              <div
                className={
                  this.state.switch === "folder"
                    ? `${styles.switchOptions} ${styles.selected}`
                    : styles.switchOptions
                }
                onClick={() => this.selectedSwitch("folder")}
              >
                Folder
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={e => this.handleChange(e, "name")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Creator"
              type="text"
              value={this.state.creator}
              onChange={e => this.handleChange(e, "creator")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Size"
              type="number"
              value={this.state.size}
              onChange={e => this.handleChange(e, "size")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Date"
              type="date"
              value={this.state.date}
              onChange={e => this.handleChange(e, "date")}
            />
          </div>
          <div className={styles.inputContainer}>
            <button
              className={styles.button}
              disabled={
                !this.state.name || !this.state.date || !this.state.creator
              }
              onClick={this.addData}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AddModal);
