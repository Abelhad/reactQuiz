import Question from "./Question";
import NextQuestionButt from "./NextQuestionButt";
import { useState } from "react";

let initialQuestions = [
    {
        question: "what is the answer of 1 + 1  :",
        answers: [
            {answer : "the answer is : 2", value: true, id: ""},
            {answer : "the answer is : 3", value: false, id: ""},
            {answer : "the answer is : 4", value: false, id: ""},
            {answer : "the answer is : 5", value: false, id: ""}
        ]
    },
    {
        question: "what is the answer of 2 + 2 equals :",
        answers: [
            {answer: "the answer is : 3", value: false, id: ""},
            {answer: "the answer is : 4", value: true, id: ""},
            {answer: "the answer is : 10", value: false, id: ""},
            {answer : "the answer is : 5", value: false, id: ""}
        ]
    },
    {
        question: "what is the answer of 3 + 3 equals :",
        answers: [
            {answer: "the answer is : 3", value: false, id: ""},
            {answer: "the answer is : 46", value: false, id: ""},
            {answer: "the answer is : 6", value: true, id: ""},
            {answer : "the answer is : 5", value: false, id: ""}
        ]
    }
]

const QuestionsContainer = () => {
    let [questions, setQuestions] = useState(initialQuestions);
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let [score, setScore] = useState(0);
    let [clickAuth, setClickAuth] = useState(true);
    console.log(currentQuestionIndex);
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    let nextQuestionCont = "Next Question";

    function checkAnswer(i){
        if (!clickAuth) return;

        setQuestions(prevQuestions =>{
            let newQuestions = [...questions];
            let answers = [...newQuestions[currentQuestionIndex].answers];

            if(answers[i].value){
                answers[i] = {...answers[i], id: "correct"};
                setScore(prev => prev + 1);
            } else {
                answers[i] = {...answers[i], id: "incorrect"};
                const correctIndex = answers.findIndex(a => a.value);
                answers[correctIndex] = {...answers[correctIndex], id: "correct"};
            }

            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex], 
                answers
            }

            return newQuestions;

        })

        setClickAuth(false);
        
    }

    function handleNextButton(){
        if(currentQuestionIndex < questions.length - 1 ){
            setCurrentQuestionIndex(prev => prev + 1);
            console.log(currentQuestionIndex);
            console.log("test");
            
        }else if(currentQuestionIndex == questions.length - 1){
            setCurrentQuestionIndex(prev => prev + 1);
            console.log("equals");
            console.log(currentQuestionIndex);
        }else{
            setCurrentQuestionIndex(0);
            console.log(currentQuestionIndex);
            setScore(0);
            setQuestions(initialQuestions);
        }
        setClickAuth(true);

    }
  return (
    <div className="backColor">
        <div className="QestionsCont">
            <h2>Quiz</h2>
            <hr />
            {currentQuestionIndex < questions.length 
                ?(
                    <Question> {questionNumber} - {currentQuestion.question} </Question>
                )
                : (
                    <Question> You answered all the questions  </Question>
                )
            }
            <div className="answersContainer">
                {currentQuestionIndex < questions.length 
                    ?(
                        currentQuestion.answers.map((a, index)=>(
                            <div onClick={()=>checkAnswer(index)} className="answer" id={a.id} key={index}> {a.answer} </div>
                        ))
                    ) 
                    : (
                        <div className="score"> score : {score}</div>
                    ) 
                }
            </div>
            <NextQuestionButt content={nextQuestionCont}  handleOnClick={handleNextButton} />
        </div>
    </div>
  )
}

export default QuestionsContainer