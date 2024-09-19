'use client'

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Topbar from "../components/Topbar";
import StopRecordButton from "../components/StopRecordButton";
import "./record.scss";
import NoResult from "../components/NoResult";

export default function Record() {
    const { status } = useSession();
    const router = useRouter();
    const textWrapperRef = useRef(null);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const { transcript } = useSpeechRecognition();

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
        
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });
            setIsRunning(true);
        }
    }, [status, router]);

    useEffect(() => {
        if (textWrapperRef.current) {
            textWrapperRef.current.scrollTop = textWrapperRef.current.scrollHeight;
        }
    })

    const handleStopRecord = async () => {
        SpeechRecognition.stopListening();
        setIsRunning(false);
        try {
            const response = await fetch("/api/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: transcript }),
            });
            
            if (response.ok) {
                const { data } = await response.json();
                router.push(`/${data.id}/edit`);
            } else {
                router.push(`/`);
            }
        } catch (error) {
            console.error("Error saving text:", error);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return [hours, minutes, remainingSeconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    };

    if (status === "loading") {
        return <div></div>;
    }

    return (
        <div className="record-wrapper">
            <Topbar title="Enregistrer"/>
            <div className="content-wrapper">
                <div className="text-wrapper" ref={textWrapperRef}>
                    {transcript.length > 0 ? 
                    <span className="text-medium text-white" id="speech-text">{transcript}</span>
                    :
                    <NoResult emotion="happy" text="Ah super ! J'écoute. Le texte s'affichera ici." />
                    }
                </div>
                <div className="time-wrapper">
                    <span className="text-medium text-grey font-mono" id="time">{formatTime(time)}</span>
                </div>
            </div>
            <StopRecordButton onClick={handleStopRecord}/>
        </div>
    )
}