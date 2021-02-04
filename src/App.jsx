import React from 'react'
import './assets/style.css';
import defaultDataset from './dataset'
import AnswersList from './components/answersList'
import Chats from './components/chats'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (NextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[NextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[NextQuestionId].answers,
      chats: chats,
      currentsId: NextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, NextQuestionId) => {
    switch(true) {
      case (NextQuestionId === 'init'):
        this.displayNextQuestion(NextQuestionId)
      break;
      case (/^https:*/.test(NextQuestionId)):
        const a = document.createElement("a");
        a.href = NextQuestionId;
        a.target = "_blank";
        a.click();
      break;

      default: //init以外
    const chats = this.state.chats
    chats.push({
      text: selectedAnswer,
      type: 'answer',
    })
    this.setState({
      chats: chats
    })
    setTimeout( () => this.displayNextQuestion(NextQuestionId), 1000)
      break;
    }
  }

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area");
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats}/>
          <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
        </div>
      </section>
    );
  }
}

export default App;
