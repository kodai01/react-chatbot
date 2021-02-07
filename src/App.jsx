import React, {useCallback, useEffect, useState} from 'react'
import './assets/style.css';
import defaultDataset from './dataset'
import AnswersList from './components/answersList'
import Chats from './components/chats'
import FormDialog from './components/Forms/FormDialog'

const App = () => {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState("init")
  const [open, setOpen] = useState(false)

  const dataset = defaultDataset

  const displayNextQuestion = (NextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers)
    setCurrentId(NextQuestionId)
  }

  const selectAnswer = (selectedAnswer, NextQuestionId) => {
    switch(true) {
      case (NextQuestionId === 'init'):
        displayNextQuestion(NextQuestionId, dataset[NextQuestionId])
      break;
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
        type: 'answer',
      })
      setTimeout( () => displayNextQuestion(NextQuestionId, dataset[NextQuestionId]), 100)
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
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  },[setOpen])

  useEffect(() => {
    const initAnswer = "";
    selectAnswer(initAnswer, currentId)
  },[])

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
        <div className="c-box">
          <Chats chats={chats}/>
          <AnswersList answers={answers} select={selectAnswer}/>
          <FormDialog open={open} handleClose={() => handleClose()}/>
        </div>
      </section>
    );
  }
  
  export default App;
  