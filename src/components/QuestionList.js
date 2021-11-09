import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, isLoaded, handleDelete, handleChangeIndex}) {

  const questionsList = questions.map(question => <QuestionItem key = {question.id} handleChangeIndex={handleChangeIndex} handleDelete={handleDelete} question = {question}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{isLoaded ? questionsList : "Loading..."}</ul>
    </section>
  );
}

export default QuestionList;
