"use client";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="navbar">
        <div className="logo">LOGO</div>
        <nav className="menu-desktop">
          <a href="#">Assinaturas</a>
          <a href="#">Agendamento</a>
          <a href="#">Checkout</a>
          <a href="#">Contato</a>
          <a href="#">Sobre nós</a>
        </nav>
        <div className="menu-toggle" onClick={() => setMenuOpen(true)}>☰</div>
      </header>

      {/* Menu Mobile */}
      <nav className={`menu-mobile ${menuOpen ? "open" : ""}`}>
        <a href="#">Assinaturas</a>
        <a href="#">Agendamento</a>
        <a href="#">Checkout</a>
        <a href="#">Contato</a>
        <a href="#">Sobre nós</a>
        <button onClick={() => setMenuOpen(false)}>✕</button>
      </nav>

      {/* Conteúdo principal */}
      <main className="container">
        <div className="content">
          <h1>Placeholder de título</h1>
          <p>
            Espaço para texto descritivo. Esse texto é apenas um placeholder
            para conteúdo futuro.
          </p>
          <button className="btn">Botão Placeholder</button>
        </div>
        <div className="image-space">
          <p>[ Espaço reservado para imagem ]</p>
        </div>
      </main>
    </>
  );
}
