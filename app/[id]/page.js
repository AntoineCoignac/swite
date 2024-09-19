"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Topbar from "../components/Topbar";
import "./text.scss";
import Link from "next/link";
import {
  SpeakerphoneIcon,
  StopIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/react/outline";

export default function Text({ params }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const { status } = useSession();
  const { id } = params;

  const [isSpeakingText, setIsSpeakingText] = useState(false);
  const [isSpeakingSummary, setIsSpeakingSummary] = useState(false);
  const speechSynthesis = useRef(null);
  const speechUtterance = useRef(null);

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchText();
    }
  }, [status, id]);

  const fetchText = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/text/${id}`);
      if (response.ok) {
        const data = await response.json();
        setText(data.text || "");
        setTitle(data.title || "");
        setSummary(data.summary || "");
        const frenchDate = new Date(data.createdAt).toLocaleDateString(
          "fr-FR",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        setDate(frenchDate);
      } else {
        console.error("Failed to fetch text");
      }
    } catch (error) {
      console.error("Error fetching text:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis;
      speechUtterance.current = new SpeechSynthesisUtterance();

      const setVoice = () => {
        const voices = speechSynthesis.current.getVoices();
        const frenchVoice = voices.find(
          (voice) => voice.name === "Microsoft Paul - French (France)"
        );
        if (frenchVoice) {
          speechUtterance.current.voice = frenchVoice;
        }
      };

      speechSynthesis.current.onvoiceschanged = setVoice;
      setVoice();
    }
  }, []);

  const handleSpeech = () => {
    if (isSpeakingText) {
      stopSpeech();
    } else {
      stopSpeech();
      speechUtterance.current.text = text;
      speechSynthesis.current.speak(speechUtterance.current);
      setIsSpeakingText(true);

      speechUtterance.current.onend = () => {
        setIsSpeakingText(false);
      };
    }
  };

  const handleSummarySpeech = () => {
    if (isSpeakingSummary) {
      stopSpeech();
    } else {
      stopSpeech();
      speechUtterance.current.text = summary;
      speechSynthesis.current.speak(speechUtterance.current);
      setIsSpeakingSummary(true);

      speechUtterance.current.onend = () => {
        setIsSpeakingSummary(false);
      };
    }
  };

  const stopSpeech = () => {
    speechSynthesis.current.cancel();
    setIsSpeakingText(false);
    setIsSpeakingSummary(false);
  };

  if (status === "loading") {
    return <div></div>;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/text/${id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to hide text");
      }
    } catch (error) {
      console.error("Error hiding text:", error);
    }
    setIsDeleting(false);
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await fetch(`/api/text/${id}/summary`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        console.error("Échec de la génération du résumé");
      }
    } catch (error) {
      console.error("Erreur lors de la génération du résumé:", error);
    }
    setIsGeneratingSummary(false);
  };

  const formatSummary = (summary) => {
    return (
      <ul className="summary-list">
        {summary.split("\n").map((line, index) => (
          <li key={index}>{line.trim().replace(/^-\s*/, "")}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="text">
      <div onClick={stopSpeech}>
        <Topbar
          isLoading={isLoading}
          title={title ? title : "Sans titre"}
          to={"/"}
          content={
            <>
              <button
                className="button secondary rounded"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <TrashIcon className="mini-icon white-icon" />
              </button>
              <Link href={`/${id}/edit`} className="button secondary rounded">
                <PencilIcon className="mini-icon white-icon" />
                <span>Modifier</span>
              </Link>
            </>
          }
        />
      </div>
      <div className="content-wrapper">
        <div className="infos-wrapper">
          {isLoading ? (
            <>
              <div className="blank-text-regular"></div>
              <div className="blank-text-small"></div>
            </>
          ) : (
            <>
              <span className="text-regular text-white">
                {title ? title : "Sans titre"}
              </span>
              <span className="text-small text-grey">{date}</span>
            </>
          )}
        </div>
        <div className="text-wrapper">
          <div className="text-actions">
            <span className="text-large text-white">Résumé</span>
            {summary && (
              <button
                className={`button-icon ${isSpeakingSummary ? "active" : ""}`}
                id="audio-button"
                onClick={handleSummarySpeech}
              >
                {isSpeakingSummary ? (
                  <StopIcon className="regular-icon" />
                ) : (
                  <SpeakerphoneIcon className="regular-icon" />
                )}
              </button>
            )}
          </div>
          {isLoading ? (
            <>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular"></div>
            </>
          ) : summary ? (
            <span className="text-regular text-grey">
              {formatSummary(summary)}
            </span>
          ) : (
            <button
              className="button magic"
              onClick={generateSummary}
              disabled={isGeneratingSummary}
            >
              <SparklesIcon className="regular-icon white-icon" />
              <span className="text-white">
                {isGeneratingSummary
                  ? "Génération en cours"
                  : "Générer un résumé IA"}
              </span>
            </button>
          )}
        </div>
        <div className="text-wrapper">
          <div className="text-actions">
            <span className="text-large text-white">Cours</span>
            <button
              className={`button-icon ${isSpeakingText ? "active" : ""}`}
              id="audio-button"
              onClick={handleSpeech}
            >
              {isSpeakingText ? (
                <StopIcon className="regular-icon" />
              ) : (
                <SpeakerphoneIcon className="regular-icon" />
              )}
            </button>
          </div>
          {isLoading ? (
            <>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular"></div>
            </>
          ) : (
            <span className="text-regular text-grey">{text}</span>
          )}
        </div>
      </div>
    </div>
  );
}
