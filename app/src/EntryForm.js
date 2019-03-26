import React from "react";

// controlled component
export const EntryForm = props => (
  <form onSubmit={props.handleFormSubmit} style={{ maxWidth: "750px" }}>
    <Row>
      <Column>
        <Row>
          <label style={labelStyle}>Start: </label>
          <input
            type="number"
            style={inputStyle}
            value={props.start}
            onChange={props.handleStartNumberChange}
          />
        </Row>
        <Warning display={false} />
      </Column>
      <Column>
        <Row>
          <label style={labelStyle}>End: </label>
          <input
            type="number"
            style={inputStyle}
            value={props.end}
            onChange={props.handleEndNumberChange}
          />
        </Row>
        <Warning display={false} warning={"Please enter a positive integer"} />
      </Column>
      <Column>
        <Row>
          <label style={labelStyle}>Letter: </label>
          <input
            style={inputStyle}
            value={props.letter}
            onChange={props.handleLetterChange}
          />
        </Row>
        <Warning display={false} warning={"Please enter a valid letter"} />
      </Column>
    </Row>
  </form>
);

const Row = props => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }}
    {...props}
  />
);

const labelStyle = {
  paddingRight: "16px"
};

const inputStyle = {
  maxWidth: "100px",
  height: "30px",
  background: "#fff",
  border: "1px solid lightGray",
  color: "black",
  padding: "0 10px",
  outline: "none",
  fontSize: "20",
  borderRadius: "6px",
  fontSize: "12px"
};

const Column = props => (
  <div style={{ display: "flex", flexDirection: "column" }} {...props} />
);

const Warning = props => (
  <p
    style={{
      fontSize: 14,
      display: props.display ? "block" : "none",
      color: "blue"
    }}
  >
    {props.warning}
  </p>
);
