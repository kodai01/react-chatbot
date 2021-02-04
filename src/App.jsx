import React, {useState, useEffect, useCallback, useDebugValue} from 'react'
import './assets/style.css';
import defaultDataset from './dataset'
import AnswersList from './components/answersList'
import Chats from './components/chats'
import FormDialog from './components/Forms/FormDialog'

const App = () => {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState("init")
  const [dataset, setDataset] = useState({})
  const [open, setOpen] = useState(false)

  const displayNextQuestion = (NextQuestionId, NextDataset) => {
    addChats({
      text: this.state.dataset[NextQuestionId].question,
      type: 'question'
    })

      setAnswers(NextDataset.answers)
      setCurrentId(NextQuestionId)
  }

  const selectAnswer = (selectedAnswer, NextQuestionId) => {
    switch(true) {
      case (/^https:*/.test(NextQuestionId)):
        const a = document.createElement("a");
        a.href = NextQuestionId;
        a.target = "_blank";
        a.click();
      break;
      case (NextQuestionId === "contact"):
        handleClickOpen()
        break
      default: //init以外
      addChats({
        text: selectedAnswer,
        type: "answer"
      })
    setTimeout( () => this.displayNextQuestion(NextQuestionId, dataset.NextQuestionId), 1000)
      break;
    }
  }
  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }
  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  useEffect(() => {
    displayNextQuestion(currentId, initDataset)
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  },[])

    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats}/>
          <AnswersList answers={answers} select={selectAnswer}/>
          <FormDialog open={open} handleClose={handleClose}/>
        </div>
      </section>
    );
}

export default App;
