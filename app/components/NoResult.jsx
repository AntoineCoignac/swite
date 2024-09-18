'use client'

import Image from "next/image";
import "./NoResult.scss";

export default function NoResult({text="Il serait temps d’enregistrer des cours si tu ne veux pas floper.", emotion="angry"}) {
    const getEmojiPath = (emotion) => require(`../assets/images/memojis/${emotion}.png`);
    return (
        <div className="no-result">
            <div className="no-result-infos">
                <Image src={getEmojiPath(emotion)} alt={emotion} width={128} height={128} />
                <p className="text-grey">Sarah de Swite</p>
            </div>
            <p className="no-result-text text-white">{text}</p>
        </div>
    )
}