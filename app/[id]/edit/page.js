'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Topbar from "../../components/Topbar";
import { SaveIcon } from '@heroicons/react/outline';
import "./edit.scss";

export default function Edit({ params }) {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { status } = useSession();
  const { id } = params;

  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchText();
    }
  }, [status, id]);

  const fetchText = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/text/${id}`);
      if (response.ok) {
        const data = await response.json();
        setText(data.text || '');
        setTitle(data.title || '');
        setSummary(data.summary ? data.summary : undefined);
      } else {
        console.error('Failed to fetch text');
      }
    } catch (error) {
      console.error('Error fetching text:', error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, text, title, summary }),
      });

      if (response.ok) {
        router.push(`/${id}`);
      } else {
        console.error('Failed to save text');
      }
    } catch (error) {
      console.error('Error saving text:', error);
    }
    setIsSaving(false);
  };

  return (
    <div className="edit">
      <Topbar isLoading={isLoading} title="Modifier" content={<button className='button primary rounded' onClick={handleSave} disabled={isSaving}><SaveIcon className='mini-icon black-icon'/><span>Sauvegarder</span></button>} />
      <div className="content-wrapper">
        <div className='form'>
          <div className="field">
            <span className='text-medium text-white'>Titre</span>
            {isLoading ?
            <div className="blank-text-regular blank-text-full"></div>
            :
            <input
              className='input'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Histoire - Chapitre 1"
            />
            }
          </div>
          {summary != undefined && (
            <div className="field">
              <span className='text-medium text-white'>Résumé</span>
              {isLoading ?
              <>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular blank-text-full"></div>
              <div className="blank-text-regular"></div>
              </>
              :
              <textarea
                className='input'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Résumé de l'histoire"
              />
              }
            </div>
          )}
          <div className="field height-full">
            <span className='text-medium text-white'>Cours</span>
            {isLoading ?
            <>
            <div className="blank-text-regular blank-text-full"></div>
            <div className="blank-text-regular blank-text-full"></div>
            <div className="blank-text-regular"></div>
            </>
            :
            <textarea
              className='input'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="En 1914, la guerre éclata entre l'Allemagne et la France."
            />
            }
          </div>
        </div>
      </div>
    </div>
  );
}