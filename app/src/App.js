import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Chart } from "./BarChart";
import { EntryForm } from "./EntryForm";
import { validateState } from "./validate";
import { newModel, charsInNumber } from "./model3";
import { makeDataObjects } from "./model2";
import { characterCountInNum } from "./model3.test";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1,
      end: 123,
      letter: "e"
    };
  }

  render() {
    const data = newModel();
    const { start, end, letter } = this.state;
    const startString = makeDataObjects(start).string;
    const endString = makeDataObjects(end).string;

    const { length, probOfLetter } = data;

    const handleFormSubmit = e => {
      e.preventDefault();
      clearWarnings();
      updateModel(data);
    };

    const clearWarnings = () => "";
    const updateModel = data => "";
    const updateStartNumber = e => this.setState({ start: e.target.value });
    const updateLetter = e => {
      this.setState({ letter: e.target.value });
    };

    const updateEndNumber = e => this.setState({ end: e.target.value });

    var chartData = [];
    var total = 0;

    const charMapEnd = characterCountInNum(end);

    // get range between start and end
    if (start != 1) {
      const charMapStart = characterCountInNum(start);
      charMapStart.forEach((v, k) => {
        charMapEnd.set(k, charMapEnd.get(k) - v);
      });
    }

    console.log(charMapEnd);

    charMapEnd.forEach((v, k) => {
      chartData.push({ name: k, count: v });
      total += v;
    });

    chartData = chartData.sort((a, b) => {
      if (a.name > b.name) return 1;
      return -1;
    });

    console.log(end);
    console.log(chartData);
    console.log(chartData.length > 0);

    const prob = (charMapEnd.get(letter) / total) * 100;

    // const validState = validateState(start, end, letter);

    return (
      <Root>
        <Header />
        <Main>
          <ContentFrame>
            <EntryForm
              start={start}
              end={end}
              letter={letter}
              handleFormSubmit={handleFormSubmit}
              handleStartNumberChange={updateStartNumber}
              handleEndNumberChange={updateEndNumber}
              handleLetterChange={updateLetter}
            />
          </ContentFrame>
          <ContentFrame>
            <Output
              string={endString}
              start={startString}
              totalCharacters={total}
              end={endString}
              letter={letter}
              probability={isNaN(prob) ? 0 : prob.toFixed(2)}
            />
          </ContentFrame>
          {chartData.length > 0 && <Chart data={chartData} />}
        </Main>
      </Root>
    );
  }
}

const Root = props => (
  <div
    style={{
      background: "#E3F2FD",
      height: "100hv",
      width: "100wv",
      lineHeight: 1.5,
      fontSize: 20,
      paddingBottom: "200px"
    }}
    {...props}
  />
);

const Main = props => (
  <div
    style={{
      margin: "0 auto",
      maxWidth: 900,
      background: "#F5F8FA",
      border: "1px solid #EBF1F5"
    }}
    {...props}
  />
);

const ContentFrame = props => (
  <div
    style={{
      padding: "25px"
    }}
    {...props}
  />
);

// put hovers

const Output = props => (
  <div>
    <label>
      Length of string from {props.start} to {props.end}:{" "}
      <span style={{ color: "blue" }}>{props.totalCharacters} characters</span>
    </label>
    <label style={{ display: "block" }}>
      Probability of selecting the letter {props.letter}:{" "}
      <span style={{ color: "blue" }}>{props.probability}%</span>
    </label>
  </div>
);

export default App;
