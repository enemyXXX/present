import Typewriter from "typewriter-effect";

const SimplePage = ({text, delay, buttonText, setActiveTab}) => {

    return <>
        <div className={'typingBlock'}>
            <Typewriter
                options={{
                    strings: text,
                    autoStart: true,
                    cursor: null,
                    delay: delay,
                }}
            />
            <div className={'bottomButtons'}>

                <div className={'bottomNextButton'} onClick={setActiveTab}>
                    {buttonText}
                </div>
            </div>
        </div>
    </>
}

export default SimplePage
