import './App.scss';
import Typewriter from 'typewriter-effect';
import {useMemo, useState} from "react";
import './confetti.scss';

const firstQuestions = [
    {
        question: 0,
        questionDescription: 'Ну тут легко. Короче когда мы познакомились???',
        correctAnswer: 1,
        chosenAnswer: 0,
        incorrectAnswerDescription: 'Ну пиздец. Ващет мы познакомились вот так...',
        correctAnswerDescription: 'Да, всё правильно. Мы именно так и познакомились!',
        questions: [
            {
                text: 'Первый вариант',
                value: 1,
            },
            {
                text: 'Второй вариант',
                value: 2,
            },
            {
                text: 'Третий вариант',
                value: 3,
            },
        ],
        prize: 'A'
    },
    {
        question: 1,
        questionDescription: 'А какого числа мы в первый раз пошли на нжв?',
        correctAnswer: 1,
        incorrectAnswerDescription: 'Ну пиздец. Ващет мы познакомились вот так...',
        correctAnswerDescription: 'Да, всё правильно. Мы именно так и познакомились!',
        chosenAnswer: 0,
        questions: [
            {
                text: 'Четвертый вариант',
                value: 1,
            },
            {
                text: 'Пятый вариант',
                value: 2,
            },
            {
                text: 'Шестой вариант',
                value: 3,
            },
        ],
        prize: 'B'
    }
]

function App() {
    const confettiEffect = (item) => <div className={`confetti${item}`}>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
    </div>
    const [activeTab, setActiveTab] = useState(1);
    const [foundPrizes, setFoundPrizes] = useState([])
    const [questions, setQuestions] = useState(firstQuestions);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const question = useMemo(() => questions[activeQuestion], [questions]);
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
        if (isCorrect) setFoundPrizes([...foundPrizes, question.prize])
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
        setQuestions(firstQuestions);
        setActiveQuestion(0);
        setFoundPrizes([]);
        setActiveTab(3);
    }

    const getConfirmedAnswer = () => {
        return question.chosenAnswer === question.correctAnswer ? question.correctAnswerDescription : question.incorrectAnswerDescription
    }

    const displayAnswerResult = () => {
        const isCorrect = question.chosenAnswer === question.correctAnswer;
        return <div className={'prizeContainer'}>
            <div className={'prizeTitle'}>{isCorrect ? 'Ну ты заслужила, держи!' : 'Сори, подсказки не будет('}</div>
            {isCorrect ? <div className={'prize'}>{question.prize}</div> : null}
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
    const getBackgroundImage = () => {
        return {backgroundImage: `url(./${activeTab}.jpg)`}
    }

    const displayActiveTab = () => {
        switch (activeTab) {
            case 1:
                return <div className={'typingBlock'}>
                    <Typewriter
                        options={{
                            strings: 'Ну привет, дружок. Дарить просто подарки скучно, поетому - заработай!',
                            autoStart: true,
                            cursor: null,
                            delay: 40,
                        }}
                    />
                    <div className={'bottomButtons'}>

                        <div className={'bottomNextButton'} onClick={() => setActiveTab(2)}>
                            Ну давай
                        </div>
                    </div>
                </div>
            case 2:
                return <div className={'typingBlock'}>
                    <Typewriter
                        options={{
                            strings: 'Насколько ты хорошо нас знаешь - настолько же проще будет найти подарки. \n Надеемся ты найдешь!!!',
                            autoStart: true,
                            cursor: null,
                            delay: 40,
                        }}
                    />
                    <div className={'bottomButtons'}>

                        <div className={'bottomNextButton'} onClick={() => setActiveTab(3)}>
                            Понятно. Где подарки?
                        </div>
                    </div>
                </div>
            case 3:
                return <>
                    <div className={'buttonsContainer'}>
                        <div className={'presentButton'} onClick={() => setActiveTab(4)}>
                            47 квартира
                        </div>
                        <div className={'presentButton'} onClick={() => console.log(1)}>
                            народная
                        </div>
                    </div>
                    {[1, 2, 3, 4, 5, 6].map(item => confettiEffect(item))}
                </>
            case 4:
                return <div className={'typingBlock'}>
                    <Typewriter
                        options={{
                            strings: areYouSure ? 'Ты точно уверена????' : confirmedAnswer ? getConfirmedAnswer() : foundPrize ? 'Ну всё. Как отвечала - столько и получила. А теперь гадай!' : 'Лизочка Торел. Тока попробуй не ответить',
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
            default:
                return <some>

                </some>
        }
    }

    return (
        <div className="App">
            <div className={'background'} style={getBackgroundImage()}/>
            <div className={'content'}>{displayActiveTab()}</div>
        </div>
    );
}

export default App;
