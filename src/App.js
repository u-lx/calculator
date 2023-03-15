import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      output: '',
      input: '0'
    }

    this.clickHandle = this.clickHandle.bind(this);
  }

  componentDidMount() {
    const pads = document.querySelectorAll('.pad');
    pads.forEach(elem => elem.addEventListener('click', this.clickHandle))
  }

  clickHandle(e) {
    const pad = e.target;
    pad.style.backgroundColor = 'orange';

    switch(pad.id) {
      case 'zero':
        if(this.state.input === '0') {
          this.setState(() => ({input: '0'}));
        } else {
          this.setState(state => ({output: state.output + pad.innerText, input: state.input + pad.innerText}));
        }
        break;

      case 'decimal':
        if(!this.state.input.includes('.')) {
          this.setState(state => ({output: state.output + pad.innerText, input: state.input + pad.innerText}));
        }
        break;

      case 'clear':
        this.setState(() => ({output: '', input: '0'}));
        break;

      case 'equals':
        this.setState(state => ({output: state.output + pad.innerText + eval(state.output), input: eval(state.output)}))
        break;

      case 'one': case 'two': case 'three': case 'four': case 'five': case 'six': case 'seven': case 'eight': case 'nine':
        let opZero = /[0\+\*\/]/;
        if(opZero.test(this.state.input)) {
          this.setState(state => ({output: state.output + pad.innerText, input: pad.innerText}));
        } else {
          this.setState(state => ({output: state.output + pad.innerText, input: state.input + pad.innerText}));
        }
        break;

      case 'add':  case 'multiply':  case 'divide':
        let opRegex = /[\+\*\-\/]/

        // Prevent string from starting with operator
        if(this.state.output === '') {
          this.setState(() => ({output: '', input: '0'}))
        } else {

        // if last is '-' =>
        if(this.state.input === '-') {
          if(opRegex.test(this.state.output[this.state.output.length-2])) {
            this.setState(state => ({
              output: state.output.slice(0,-2) + pad.innerText,
              input: pad.innerText
            }))
          }
        }

        if(opRegex.test(this.state.input[this.state.input.length-1])) {
          if(!this.state.output.includes('=')) {
            this.setState(state => ({
              output: state.output.slice(0,-1) + pad.innerText,
              input: pad.innerText
            }))
          } else {
            this.setState(state => ({
              output: state.input + pad.innerText,
              input: pad.innerText
            }));
          }
        } else if(!opRegex.test(this.state.input[this.state.input.length-1])) {
          if(!this.state.output.includes('=')) {
            this.setState(state => ({
              output: state.output + pad.innerText,
              input: pad.innerText
            }));
          } else {
            this.setState(state => ({
              output: state.input + pad.innerText,
              input: pad.innerText
            }));
          }
        }
      }
        break;

      case 'subtract':

        if(this.state.input === '-') {
          this.setState(state => ({output: state.output, input: state.input}));
        } else {
          if(!this.state.output.includes('=')) {
            this.setState(state => ({output: state.output + pad.innerText, input: pad.innerText}))
          } else {
            this.setState(state => ({output: state.input + pad.innerText, input: pad.innerText}))
          }
        }
        break;

    }


    setTimeout(() => {
      pad.style.backgroundColor = 'grey';
    },70)
  }

  render () {
    return (
      <div id='container'>
        <div id='display-area'>
          <div id='output'>{this.state.output}</div>
          <div id='display'>{this.state.input}</div>
        </div>
        <div id='keypad'>
          <div id='clear' class='pad'>AC</div>
          <div id='divide' class='pad'>/</div>
          <div id='multiply' class='pad'>*</div>
          <div id='seven' class='pad'>7</div>
          <div id='eight' class='pad'>8</div>
          <div id='nine' class='pad'>9</div>
          <div id='subtract' class='pad'>-</div>
          <div id='four' class='pad'>4</div>
          <div id='five' class='pad'>5</div>
          <div id='six' class='pad'>6</div>
          <div id='add' class='pad'>+</div>
          <div id='one' class='pad'>1</div>
          <div id='two' class='pad'>2</div>
          <div id='three' class='pad'>3</div>
          <div id='equals' class='pad'>=</div>
          <div id='zero' class='pad'>0</div>
          <div id='decimal' class='pad'>.</div>
        </div>
      </div>
    )
  }
}
