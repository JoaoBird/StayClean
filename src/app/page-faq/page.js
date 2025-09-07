"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import "../globals.css";
import "../Planos.css";
import Navbar from "@/components/Navbar";
import "@/styles/pageFaq.css";
import Faq from "@/components/Faq";



export default function PageFaq() {
  return (
    <>
     <Navbar />

      {/* Banner principal */}
      <section className="banner">
        {/* Imagem de fundo */}
        <div className="banner-background">
          {/* Desktop */}
          <div className="desktop-banner">
            <Image
              src="/banner-place-holder.png"
              alt="Carro sendo lavado desktop"
              width={1920}
              height={800}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Mobile */}
          <div className="mobile-banner">
            <Image
              src="/banner-place-holder-mobile.png"
              alt="Carro sendo lavado mobile"
              width={800}
              height={600}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Overlay */}
        <div className="banner-overlay"></div>

        {/* Conteúdo sobreposto */}
        <div className="banner-content">
          <h2>Dúvidas frequentes</h2>
          <h1>Mantenha seu carro sempre impecável!</h1>
          <p>
            Faça sua assinatura e garanta que seu carro receba o melhor
            tratamento estético automotivo.
          </p>
        </div>
        
      </section>
      <Faq />

    </>
    
    
  );
}

    
    
