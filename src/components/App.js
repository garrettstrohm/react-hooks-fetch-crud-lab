import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(r => r.json())
    .then(data => {
      setQuestions(data)
      setIsLoaded(isLoaded => !isLoaded)
    })
  },[])

  const handleSubmitEvent = (formData) => {
    console.log(formData)
    
    const newData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex
    }

    fetch(`http://localhost:4000/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    })
    .then(r => r.json())
    .then(newQuestion => {
      setQuestions([...questions, newQuestion])
    })
  }

  const handleDelete = (deletedQuestion) => {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  const handleChangeIndex = (updatedQuestion) => {
    const updatedQuestions = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmitEvent={handleSubmitEvent}/> : <QuestionList questions={questions} isLoaded={isLoaded} handleDelete={handleDelete} handleChangeIndex={handleChangeIndex}/>}
    </main>
  );
}

export default App;
