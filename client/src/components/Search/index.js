import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  const {onSubmit, ...otherProps} = props;
  return (
    <form className="form-group" onSubmit={onSubmit}>
      <input className="form-control" {...otherProps} />
    </form>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn">
      {props.children}
    </button>
  );
}
