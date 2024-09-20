'use client'

import {Splide, SplideTrack, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CtaCard from "./CtaCard";
import "./Ctas.scss";

export default function Ctas() {
    return (
        <Splide options={{arrows: false, pagination: true, width: "100%", gap: "16px"}}>
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