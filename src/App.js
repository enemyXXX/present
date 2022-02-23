import './App.scss';
import Typewriter from 'typewriter-effect';
import {useState} from "react";
import './confetti.scss';

const firstQuestions = [
    {
        question: 0,
        correctAnswer: 1,
        chosenAnswer: 0,
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
        ]
    },
    {
        question: 1,
        correctAnswer: 1,
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
        ]
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
    const [questions, setQuestions] = useState(firstQuestions);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const question = questions[activeQuestion];

    const onSelect = (value) => {
        setQuestions(questions.map(question => ({
            ...question,
            chosenAnswer: question.question === activeQuestion ? value : question.chosenAnswer
        })))

    }

    const form = () => <>
        <div className="containerOuter">
            <div className={'progress'}>
                <div>{activeQuestion+1}/{questions.length}</div>
                <Typewriter
                    options={{
                        strings: 'Ну тут легко. Короче когда мы познакомились???',
                        autoStart: true,
                        cursor: null,
                        delay: 40,

                    }}
                />
            </div>
            <div className="container">
                {question.questions.map(question => <>
                        <input type="radio" onChange={() => onSelect(question.value)} className="hidden" id={`input${question.value}`} name="inputs"/>
                        <label className="entry" htmlFor={`input${question.value}`}>
                            <div className="circle"/>
                            <div className="entry-label">{question.text}</div>
                        </label>
                </>)}
                {!!questions[activeQuestion].chosenAnswer && <div className="highlight"/>}
            </div>
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
                            strings: 'Лизочка Торел. Тока попробуй не ответить',
                            autoStart: true,
                            cursor: null,
                            delay: 40,
                        }}
                    />
                    <div className={'bottomButtons'}>
                        {form()}
                    </div>
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
