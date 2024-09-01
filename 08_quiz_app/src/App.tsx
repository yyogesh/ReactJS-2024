import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { questions } from './data/question';

type GameState = 'playing' | 'reviewing' | 'finished'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('playing');

  const allQuestions = questions;

  useEffect(() => {
    //amount // timer

    // unmount // clear timer
  }, [gameState, currentQuestionIndex])

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [currentQuestionIndex])

  const handleAnswer = useCallback((optionIndex: number) => {
    setGameState('reviewing');
    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  }, [])

  const renderOption = (option: string, index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = index === currentQuestion.correctAnswer;
    let bgColor = "bg-white";
    if (gameState === 'reviewing') {
      bgColor = isCorrect ? 'bg-green-200' : (isSelected ? 'bg-red-200' : 'bg-white')
    }

    return <button
      key={index}
      onClick={() => handleAnswer(index)}
      className={`${bgColor} border-2 border-gray-300 rounded-lg p-4 mb-2 w-full text-left hover:bg-gray-100 transition-colors`}>
      {option}
    </button>
  }

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  }, [currentQuestionIndex])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to bg-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md">
        <h2 className='text-xl, font-bold text-gray-800'>Question {currentQuestionIndex + 1}/{allQuestions.length}</h2>
        <p className='text-lg text-gray-700 mb-4'>{currentQuestion.text}</p>
        <div className='space-y-2'>
          {
            currentQuestion.options.map(renderOption)
          }
        </div>
        {
          gameState === 'reviewing' && (
            <button
              onClick={goToNextQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors">
              Next Question
            </button>
          )
        }
      </div>

    </div>
  )
}

export default App
