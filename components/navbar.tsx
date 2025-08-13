"use client"

import Image from "next/image";
import { useState } from "react";


type NavbarProps = {
    className?: string;
};

export function Navbar({className = ""}: NavbarProps) {
    const [open, setOpen] = useState(false);

    //Categorias
    const categories = [ "Ferreteria", "Electrónica" ];

    return (
        <nav className={`navbar ${className}`}>
            {/* Logo a la izquierda */}
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <a className="nav-link" href="/">
                    <Image src="/plug.png" alt="Logo" width={40} height={40} />
                    <span style={{ marginLeft: "0.75rem", fontWeight: "bold", fontSize: "1.2rem", color: "black" }}>Ferrelect</span>
                </a>
                {/*Menu desplegable Categoria*/}
                <div style={{ marginLeft: "2rem", position: "relative" }}>
                    <button className="catg-btn"
                        style={{
                            background: "white",
                            border: "1.5px solid #ccc",
                            borderRadius: "8px",
                            padding: "0.3rem 1rem",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                        }}
                        onClick={() => setOpen(v => !v)}
                        onBlur={() => setTimeout(() => setOpen(false), 100)}
                    >
                        Categoría
                    </button>
                    {open && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "110%",
                                left: 0,
                                background: "white",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                minWidth: "150px",
                                zIndex: 10,
                                padding: 0,
                                margin: 0,
                                listStyle: "none"
                            }}
                        >
                            {categories.map(cat => (
                                <li key={cat}>
                                    <a
                                        href={`/category/${cat}`}
                                        style={{ 
                                            display: "block", 
                                            padding: "0.5rem 1rem", 
                                            textDecoration: "none", 
                                            color: "black" 
                                        }}
                                        onClick={() => setOpen(false)}
                                    >
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
        </div>

            {/* Barra de búsqueda en el centro */}
            <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} >
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    style={{
                        width: "100%",
                        maxWidth: "350px",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />
            </div>

            {/* Usuario y carro a la derecha */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <a className="nav-link" href="/user">
                    <Image className="nav-icon" src="/user.png" alt="user icon" width={24} height={24} />
                    <span style={{ marginLeft: "0.7rem" }}>Usuario</span>
                </a>
                <a className="nav-link" href="/cart">
                    <Image src="/shopping-cart.png"  alt="user icon" width={24} height={24} />
                    <span style={{ marginLeft: "0.7rem" }}>Carro</span>
                </a>
            </div>
        </nav>
    );
}