'use client'

import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CtaCard from "./CtaCard";
import "./Ctas.scss";
import { useState, useEffect } from "react";

export default function Ctas() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        isLoading ? 
        <div className="blank-ctas">
            <div className="blank-ctas-track">
                <div className="blank-ctas-slide"></div>
                <div className="blank-ctas-slide"></div>
                <div className="blank-ctas-slide"></div>
            </div>
            <div className="blank-ctas-pagination">
                <div className="blank-ctas-pagination-page"></div>
                <div className="blank-ctas-pagination-page"></div>
                <div className="blank-ctas-pagination-page"></div>
            </div>
        </div> 
        :
        <Splide className="ctas" options={{arrows: false, pagination: true, width: "100%", gap: "16px"}}>
            <SplideSlide>
                <CtaCard title="Crée un résumé de cours avec l’IA" button="Commencer à enregistrer" to="/record" style="magic" />
            </SplideSlide>
            <SplideSlide>
                <CtaCard title="Mets 5 étoiles à Swite sur le store" button="Donner mon avis" to="/" style="primary" />
            </SplideSlide>
            <SplideSlide>
                <CtaCard title="Partage l’application avec tes amis" button="Copier le lien" to="/" style="primary" />
            </SplideSlide>
        </Splide>
    );
}