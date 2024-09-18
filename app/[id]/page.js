'use client'

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Topbar from "../components/Topbar";
import "./text.scss";
import Link from 'next/link';
import { SpeakerphoneIcon, StopIcon } from '@heroicons/react/outline';

export default function Text({ params }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();
  const { status } = useSession();
  const { id } = params;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis = useRef(null);
  const speechUtterance = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchText();
    }
  }, [status, id]);

  const fetchText = async () => {
    try {
      const response = await fetch(`/api/text/${id}`);
      if (response.ok) {
        const data = await response.json();
        setText(data.text || '');
        setTitle(data.title || '');
        const frenchDate = new Date(data.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          setDate(frenchDate);
      } else {
        console.error('Failed to fetch text');
      }
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesis.current = window.speechSynthesis;
      speechUtterance.current = new SpeechSynthesisUtterance();

      const setVoice = () => {
        const voices = speechSynthesis.current.getVoices();
        const frenchVoice = voices.find(voice => voice.name === "Microsoft Paul - French (France)");
        if (frenchVoice) {
          speechUtterance.current.voice = frenchVoice;
        }
      };

      speechSynthesis.current.onvoiceschanged = setVoice;
      setVoice();
    }
  }, []);

  const handleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
    } else {
      speechUtterance.current.text = text;
      speechSynthesis.current.speak(speechUtterance.current);
      setIsSpeaking(true);

      speechUtterance.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const stopSpeech = () => {
    speechSynthesis.current.cancel();
    setIsSpeaking(false);
  }

  if (status === 'loading') {
    return <div></div>;
  }

  return (
    <div className="text">
    <div onClick={stopSpeech}>
    <Topbar title={title} to={"/"} content={<Link href={`/${id}/edit`} className='button secondary rounded'>Modifier</Link>} />
    </div>
      <div className="content-wrapper">
        <div className="infos-wrapper">
            <span className='text-regular text-white'>{title}</span>
            <span className='text-small text-grey'>{date}</span>
        </div>
        <div className="text-wrapper">
            <div className="text-actions">
                <span className='text-medium text-white'>Cours</span>
                <button className="button-icon" id="audio-button" onClick={handleSpeech}>
                {isSpeaking ? (
                    <StopIcon className='regular-icon' />
                ) : (
                    <SpeakerphoneIcon className='regular-icon' />
                )}
                </button>
            </div>
            <span className='text-regular text-white'>{text}</span>
        </div>
      </div>
    </div>
  );
}