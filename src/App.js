import './App.scss';
import {useCallback, useEffect, useMemo, useState} from "react";
import './confetti.scss';
import Confetti from "./Confetti";
import SimplePage from "./SimplePage";
import SimpleButton from "./SimpleButton";
import Form from "./Form";
import {girlsQuestions, myQuestions} from "./questions";



function App() {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const backgroundMusic = document.getElementById('backgroundMusic');
        switch (activeTab) {
            case 1: backgroundMusic.volume = 0.4; break;
            case 2: backgroundMusic.volume = 0.3; break;
            case 3: backgroundMusic.volume = 0.2; break;
            case 4: backgroundMusic.volume = 0.2; break;
            default: backgroundMusic.volume = 0.4; break;
        }
    }, [activeTab])

    const playMusic = useCallback(() => {
        const music = document.getElementsByTagName('audio');
        for (let item of music) {
            if (item.paused && !item.played.length) {
                if (item.tabIndex > 0) {
                    setTimeout(() => {
                        item.play();
                    }, [item.tabIndex])
                } else {
                    item.play();
                }
            }
            if (item.id === 'confirm') {
                const quizBackground = document.getElementById('quizBackground');
                if (quizBackground) {
                    quizBackground.volume = .2;
                }
            }
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab < 4) {
            if (document.getElementById('backgroundMusic').paused) {
                document.getElementById('backgroundMusic').play();
            }
            document.removeEventListener('click', playMusic)
            document.addEventListener('click', playMusic)
        } else {
            document.removeEventListener('click', playMusic)
            document.getElementById('backgroundMusic').pause();
        }
    }, [activeTab])

    const getBackgroundImage = () => {
        return {backgroundImage: `url(./${activeTab}.jpg)`}
    }

    const displayActiveTab = () => {
        switch (activeTab) {
            case 1:
                return <>
                    <audio id={'1'} className="audio-element">
                        <source src="./first.mp3" />
                    </audio>
                    <SimplePage setActiveTab={() => setActiveTab(2)}
                                   delay={40} buttonText={'Ну давай'}
                                   text={'Ну привет, дружок. Дарить просто подарки скучно, поетому - заработай!'} />
                    </>
            case 2:
                return <>
                    <SimplePage setActiveTab={() => setActiveTab(3)}
                                   delay={40} buttonText={'Понятно. Где подарки?'}
                                   text={'Насколько ты хорошо нас знаешь - настолько же проще будет найти подарки. \n Надеемся ты найдешь!!!'} />
                    <audio id={'2'} className="audio-element">
                        <source src="./second.mp3" />
                    </audio>
                </>
            case 3:
                return <>
                    <audio id={'3'} className="audio-element">
                        <source src="./third.mp3"/>
                    </audio>
                    <div className={'buttonsContainer'}>
                        <SimpleButton text={'47 квартира'} onClick={() => setActiveTab(4)} />
                        <SimpleButton text={'народная'} onClick={() => setActiveTab(5)} />
                    </div>

                    <Confetti />
                </>
            case 4:
                return <Form setActiveTab={() => setActiveTab(3)} questionsList={girlsQuestions} foundPrizeDescription={'Ну всё. Как отвечала - столько и получила. А теперь гадай!'} />
            case 5:
                return <Form setActiveTab={() => setActiveTab(3)} questionsList={myQuestions} foundPrizeDescription={'Ну всё. Как отвечала - столько и получила. А теперь гадай! (тут может быть лишняя буква)'} />

            default:
                return <some>

                </some>
        }
    }

    return (
        <div className="App">
            <div className={'background'} style={getBackgroundImage()}/>
            <div className={'content'}>{displayActiveTab()}</div>
            <audio id={'backgroundMusic'} className="audio-element" loop>
                <source src="./background_music.mp3"/>
            </audio>
        </div>
    );
}

export default App;
