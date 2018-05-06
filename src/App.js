import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WordViewer extends Component {
  constructor(){
    super();
    this.state = {
      word: "Start",
      toggle: false,
      button: "Start"
    }
    this.loop = this.loop.bind(this)
  }
  render() {
    return (
      <div>
        <h1 className="viewer">{this.state.word}</h1>
        <button onClick={this.loop}>{this.state.button}</button>
      </div>
    )
  }
  loop(){
    if (this.state.toggle){
      clearInterval(this.state.interval);
      this.setState({
        toggle: false,
        word: "Stopped",
        button: "Start"
      })
      return;
    }
    if (this.props.text === ""){
      return;
    }
    let time = 60*1000/Number(this.props.speed)
    let words = this.props.text.split(/[\s\n]/g)
    let current = 0;
    let context = this;
    let skip = false;
    let steps = 0;
    this.setState({ interval: setInterval(() => {
      if (current === words.length){
        clearInterval(context.state.interval);
        context.setState({
          word: "Done",
          button: "Start"
        })
        return;
      }
      if (skip){
        if(steps > context.props.dotinterval){
          skip = false;
          steps = 0;
        }else{
          steps += 1;
          return;
        }
      }
    if (words[current].match(/.*[.\?!,:].*/g)){
        skip = true;
      }
      while (true){
        if (current-1 < words.length){
          if (words[current] === " " || words[current] === ""){
            current += 1;
          }else{
            break;
          }
        }else{
          return;
        }
      }
      context.setState({
        word: words[current]
      })
      current += 1
    }, time),
    toggle: true,
    button: "Stop"
  });
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      speed: 400,
      text: "",
      dotinterval: 2
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fast Reader</h1>
        </header>
        <WordViewer speed={this.state.speed} text={this.state.text} dotinterval={this.state.dotinterval}/>
        <form>
          <row>
            <label>Speed in wpm: </label>
            <input type="number" className="App-input" onChange={this.handleUpdate} value={this.state.speed} name="speed" min="1"/>
          </row>
          <row>
            <label>Pulses per separator: </label>
            <input type="number" className="App-input" name="dotinterval" onChange={this.handleUpdate} value={this.state.dotinterval} min="1"/>
          </row>
          <row>
            <label>Text to read: </label>
            <textarea onChange={this.handleUpdate} value={this.state.text} name="text"/>
          </row>
        </form>
      </div>
    );
  }
  handleUpdate(e){
    this.setState({[e.target.name]: e.target.value});
  }
}

export default App;
