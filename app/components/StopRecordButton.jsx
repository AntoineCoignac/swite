import "./StopRecordButton.scss";

export default function StopRecordButton({onClick}) {
    return(
        <div className="stop-record-button">
            <button className="stop-record-button-wrapper" onClick={onClick}>
                <span className="stop-record-button-icon"></span>
            </button>
        </div>
    )
}