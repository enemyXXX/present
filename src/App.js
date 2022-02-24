import './App.scss';
import Typewriter from 'typewriter-effect';
import {useMemo, useState} from "react";
import './confetti.scss';
import Confetti from "./Confetti";
import SimplePage from "./SimplePage";
import SimpleButton from "./SimpleButton";
import Form from "./Form";
import {girlsQuestions} from "./questions";



function App() {
    const [activeTab, setActiveTab] = useState(1);

    const getBackgroundImage = () => {
        return {backgroundImage: `url(./${activeTab}.jpg)`}
    }

    const displayActiveTab = () => {
        switch (activeTab) {
            case 1:
                return <SimplePage setActiveTab={() => setActiveTab(2)}
                                   delay={40} buttonText={'Ну давай'}
                                   text={'Ну привет, дружок. Дарить просто подарки скучно, поетому - заработай!'} />
            case 2:
                return <SimplePage setActiveTab={() => setActiveTab(3)}
                                   delay={40} buttonText={'Понятно. Где подарки?'}
                                   text={'Насколько ты хорошо нас знаешь - настолько же проще будет найти подарки. \n Надеемся ты найдешь!!!'} />
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
            <div className={'background'} style={getBackgroundImage()}/>
            <div className={'content'}>{displayActiveTab()}</div>
        </div>
    );
}

export default App;
