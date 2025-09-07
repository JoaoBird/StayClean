"use client";
import { useState } from "react";
import Link from "next/link";
import "@/styles/header.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">StayClean</div>

        {/* Links Desktop */}
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/planos">Planos</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/page-faq">FAQ</Link>
        </div>

        {/* Botão Sanduíche (Mobile) */}
        <div
          className={`menu-btn ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/planos" onClick={() => setOpen(false)}>Planos</Link>
        <Link href="/contato" onClick={() => setOpen(false)}>Contato</Link>
        <Link href="/page-faq" onClick={() => setOpen(false)}>FAQ</Link>
      </div>
    </nav>
  );
}
