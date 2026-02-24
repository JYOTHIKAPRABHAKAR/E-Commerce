import { useEffect, useState } from "react";
import "./quiz.css"
import axios from "axios";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    //const [selectedOption, setSelectedOption] = useState(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3005/quiz');
                setQuestions(response.data.questions);
                setLoading(false);
                //console.log(response.data.questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);
    if(loading){
        return <div>Loading Quiz...</div>
    }
    if(finished){
        return <div className="flex justify-center mt-10">
            <div className="quiz-container m-3">
                <h1>Quiz Completed 🎉</h1>
                <p>Your Score: {score} / {questions.length}</p>
            </div>
        </div>
    }

    const handleOptionClick = (option, index) => {
        //setSelectedOption(option);
        // console.log(option);
        // console.log(questions[currentQuestion].correctAnswer);
        if(index === questions[currentQuestion].correctAnswer){
            setScore(prev => prev + 1);
            // console.log(score);
            // console.log(option)
        }
        if(currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }else{
            setFinished(true);
        }
    }

    return(
        <div className="flex justify-center mt-10">
            <div className="quiz-container-question m-3">
                <h5><strong>Question {currentQuestion + 1} </strong> / <span className="total-score">{questions.length}</span></h5>
                <h4 className="mt-3 question">{questions[currentQuestion].question}</h4>
                <div className="options">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button key={index} className="option" onClick={() => handleOptionClick(option, index)}>{option}</button>
                    ))}
                </div>
            </div>
        </div>
    )
    
}

export default Quiz