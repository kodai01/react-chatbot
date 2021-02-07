import React from 'react'
import './assets/style.css';
import defaultDataset from './dataset'
import AnswersList from './components/answersList'
import Chats from './components/chats'
import FormDialog from './components/Forms/FormDialog'

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
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
      case (NextQuestionId === "contact"):
        this.handleClickOpen()
        break
      default: //init以外
    const chats = this.state.chats
    chats.push({
      text: selectedAnswer,
      type: 'answer',
    })
    this.setState({
      chats: chats
    })
    setTimeout( () => this.displayNextQuestion(NextQuestionId), 100)
      break;
    }
  }
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false})
  };

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
          <FormDialog open={this.state.open} handleClose={this.handleClose}/>
        </div>
      </section>
    );
  }
}

export default App;
