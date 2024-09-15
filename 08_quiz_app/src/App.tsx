import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { Clock, Check, X, Award } from 'lucide-react';
import { Question } from './models/Question';

type GameState = 'playing' | 'reviewing' | 'finished'

const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following hooks would you use to optimize the performance of a component by memoizing the result of a computation?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "In React, what is the primary purpose of using React.memo on a functional component?",
    options: ["To handle side effects in a component", "To prevent unnecessary re-renders by memoizing the component", "To create a context for the application", "To manage the state of the component"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "In which scenario is it recommended to use React.Fragment?",
    options: ["When you need to render multiple sibling elements without adding extra nodes to the DOM", 
      "When you want to prevent a component from rendering", 
      "When you need to optimize performance by memoizing a component", 
      "When you need to handle side effects in a component"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "What is the purpose of the useReducer hook in React?",
    options: ["To manage global state across components", "To dispatch actions and manage state in complex components", "To perform side effects in a component", "To prevent unnecessary re-renders in a component"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What is the key difference between useRef and useState?",
    options: ["useRef is used to store mutable values that persist between renders, while useState triggers a re-render when the state changes", 
      "useRef triggers a re-render when its value changes, while useState does not", 
      "useRef is used only for form input handling, while useState is used for managing component state",
       "There is no difference; they are interchangeable"],
    correctAnswer: 0
  }
];


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('playing');

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (gameState !== 'playing') return;
    setSelectedAnswer(optionIndex);
    setGameState('reviewing');
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestion, gameState]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameState('reviewing');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuestionIndex]);

  const restartGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setGameState('playing');
  }, []);

  const renderOption = (option: string, index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = index === currentQuestion.correctAnswer;
    let bgColor = 'bg-white';
    if (gameState === 'reviewing') {
      bgColor = isCorrect ? 'bg-green-200' : (isSelected ? 'bg-red-200' : 'bg-white');
    }

    return (
      <button
        key={index}
        onClick={() => handleAnswer(index)}
        className={`${bgColor} border-2 border-gray-300 rounded-lg p-4 mb-2 w-full text-left hover:bg-gray-100 transition-colors ${
          gameState === 'playing' ? 'cursor-pointer' : 'cursor-default'
        }`}
        disabled={gameState !== 'playing'}
      >
        {option}
        {gameState === 'reviewing' && isCorrect && <Check className="inline ml-2 text-green-500" />}
        {gameState === 'reviewing' && isSelected && !isCorrect && <X className="inline ml-2 text-red-500" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      {gameState !== 'finished' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Question {currentQuestionIndex + 1}/{questions.length}</h2>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-1" />
              <span>{timeLeft}s</span>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-4">{currentQuestion.text}</p>
          <div className="space-y-2">
            {currentQuestion.options.map(renderOption)}
          </div>
          {gameState === 'reviewing' && (
            <button
              onClick={goToNextQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
            >
              Next Question
            </button>
          )}
        </>
      ) : (
        <div className="text-center">
          <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
          <p className="text-lg text-gray-600 mb-4">Your score: {score}/{questions.length}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  </div>
  )
}

export default App
