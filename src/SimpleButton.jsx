
const SimpleButton = ({text, onClick}) => {

    return <div className={'presentButton'} onClick={onClick}>
        {text}
    </div>
}

export default SimpleButton;
