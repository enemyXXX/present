import {useMemo, useState} from "react";
import Typewriter from "typewriter-effect";

const Form = ({questionsList, setActiveTab, foundPrizeDescription}) => {
    const [foundPrizes, setFoundPrizes] = useState([])
    const [questions, setQuestions] = useState(questionsList);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const question =  questions[activeQuestion];
    const [areYouSure, setAreYouSure] = useState(false);
    const [confirmedAnswer, setConfirmedAnswer] = useState(false);
    const [foundPrize, setFoundPrize] = useState(false);

    const onSelect = (value) => {
        setQuestions(questions.map(question => ({
            ...question,
            chosenAnswer: question.question === activeQuestion ? value : question.chosenAnswer
        })))
        setAreYouSure(true)
    }

    const confirmAnswer = () => {
        const isCorrect = question.chosenAnswer === question.correctAnswer;
        setAreYouSure(false);
        setConfirmedAnswer(true);
        setFoundPrizes([...foundPrizes, isCorrect ? question.prize : '']);
    }

    const isLastQuestion = () => {
        return activeQuestion === questions.length - 1;
    }

    const guessPresent = () => {
        setConfirmedAnswer(false);
        setFoundPrize(true)
    }

    const nextQuestion = () => {
        setActiveQuestion((prev) => prev+1)
        setConfirmedAnswer(false);
    }

    const resetForm = () => {
        setFoundPrize(false);
        setQuestions(questionsList);
        setActiveQuestion(0);
        setFoundPrizes([]);
        setActiveTab(setActiveTab);
    }

    const getConfirmedAnswer = () => {
        return question.chosenAnswer === question.correctAnswer ? question.correctAnswerDescription : question.incorrectAnswerDescription
    }

    const displayAnswerResult = () => {
        const isCorrect = question.chosenAnswer === question.correctAnswer;
        return <div className={'prizeContainer'}>
            <div className={'prize'}>{isCorrect ? question.prize : ''}</div>
            <div className={'presentButton'} onClick={isLastQuestion() ? guessPresent : nextQuestion}>
                {isLastQuestion() ? 'Найти подарок' : 'Дальше'}
            </div>
        </div>
    }

    const form = () => <>
        <div className="containerOuter">
            {!confirmedAnswer ? <>
                <div className={'progress'}>
                    <div>{activeQuestion + 1}/{questions.length}</div>
                    <Typewriter
                        options={{
                            strings: question.questionDescription,
                            autoStart: true,
                            cursor: null,
                            delay: 40,

                        }}
                    />
                </div>
                <div className="container">
                    {question.questions.map(question => <>
                        <input type="radio" onChange={() => onSelect(question.value)} className="hidden"
                               id={`input${question.value}`} name="inputs"/>
                        <label className="entry" htmlFor={`input${question.value}`}>
                            <div className="circle"/>
                            <div className="entry-label">{question.text}</div>
                        </label>
                    </>)}
                    {!!question.chosenAnswer && <div className="highlight"/>}
                </div>
            </> : null}
        </div>
    </>

    return <div className={'typingBlock'}>
        <Typewriter
            options={{
                strings: areYouSure ? question.areYouSureDescription : confirmedAnswer ? getConfirmedAnswer() : foundPrize ? foundPrizeDescription : question.questionPreparationDescription,
                autoStart: true,
                cursor: null,
                delay: 40,
            }}
        />
        {areYouSure ? <div className={'presentButton center'} onClick={confirmAnswer}>
            Я уверена!!!
        </div> : null}
        {
            confirmedAnswer ? displayAnswerResult() : null
        }
        {foundPrize ? <div className={'guessForm'}>
            {foundPrizes.map(prize => <div className={'prize'}>
                {prize}
            </div>)}
            <div className={'bottomButtons'}>
                <div className={'bottomNextButton'} onClick={resetForm}>
                    В начало
                </div>
            </div>
        </div> :<div className={'bottomButtons'}>
            {form()}
        </div>}
    </div>
}

export default Form;
