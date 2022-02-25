import './App.scss';
import {useEffect, useMemo, useState} from "react";
import './confetti.scss';
import Confetti from "./Confetti";
import SimplePage from "./SimplePage";
import SimpleButton from "./SimpleButton";
import Form from "./Form";
import {girlsQuestions} from "./questions";



function App() {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const backgroundMusic = document.getElementById('backgroundMusic');
        switch (activeTab) {
            case 1: backgroundMusic.volume = 0.8; break;
            case 2: backgroundMusic.volume = 0.6; break;
            case 3: backgroundMusic.volume = 0.4; break;
            case 4: backgroundMusic.volume = 0.2; break;
            default: backgroundMusic.volume = 0.8; break;
        }
    }, [activeTab])

    const getBackgroundImage = () => {
        return {backgroundImage: `url(./${activeTab}.jpg)`}
    }

    const displayActiveTab = () => {
        switch (activeTab) {
            case 1:
                return <>
                    <audio className="audio-element" autoPlay>
                        <source src="./first.mp3"/>
                    </audio>
                    <SimplePage setActiveTab={() => setActiveTab(2)}
                                   delay={40} buttonText={'Ну давай'}
                                   text={'Ну привет, дружок. Дарить просто подарки скучно, поетому - заработай!'} />
                    </>
            case 2:
                return <>
                    <audio className="audio-element" autoPlay>
                        <source src="./second.mp3"/>
                    </audio>
                    <SimplePage setActiveTab={() => setActiveTab(3)}
                                   delay={40} buttonText={'Понятно. Где подарки?'}
                                   text={'Насколько ты хорошо нас знаешь - настолько же проще будет найти подарки. \n Надеемся ты найдешь!!!'} />
                    </>
            case 3:
                return <>
                    <div className={'buttonsContainer'}>
                        <SimpleButton text={'47 квартира'} onClick={() => setActiveTab(4)} />
                        <SimpleButton text={'народная'} onClick={() => console.log(1)} />
                    </div>
                    <Confetti />
                </>
            case 4:
                return <Form setActiveTab={() => setActiveTab(3)} questionsList={girlsQuestions} foundPrizeDescription={'Ну всё. Как отвечала - столько и получила. А теперь гадай!'} />
            default:
                return <some>

                </some>
        }
    }

    return (
        <div className="App">
            <audio id={'backgroundMusic'} className="audio-element" autoPlay loop>
                <source src="./background_music.mp3"/>
            </audio>
            <div className={'background'} style={getBackgroundImage()}/>
            <div className={'content'}>{displayActiveTab()}</div>
        </div>
    );
}

export default App;
