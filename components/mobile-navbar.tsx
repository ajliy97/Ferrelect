"use client"

import Image from "next/image";
import { useState } from "react";

type NavbarProps = {
    className?: string;
};

export function MobileNavbar({className = ""}: NavbarProps)  {
    const [open, setOpen] = useState(false);
    
        //Categorias
        const categories = [ "Ferreteria", "Electrónica" ];

    return (
        <nav className={`mobile-navbar w-full flex flex-col ${className}`} >
            {/*Fila principal*/}
            <div style={{ 
                display: "flex", 
                alignItems: "center",
                justifyContent: "space-between", 
                width: "100%"
            }}>
            {/*Logo y categoria a la izquierda*/}
            <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
                <a className="nav-link" href="/">
                    <Image src="/plug.png" alt="Logo" width={32} height={32} />
                </a>
                {/*Menu desplegable Categoria*/}
                <div style={{  position: "relative" }}>
                    <button className="catg-btn"
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
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <a className="nav-link" href="/user">
                    <Image className="nav-icon" src="/user.png" alt="user icon" width={25} height={25} />
                </a>
                <a className="nav-link" href="/cart">
                    <Image src="/shopping-cart.png" alt="cart icon" width={25} height={25} />
                </a>
            </div>
        </div>
        
        {/* Barra de búsqueda centrada debajo */}
        <div 
            style={{ 
                width: "100%", 
                marginTop: "0.4rem", 
                display: "flex", 
                justifyContent: "center" 
            }}>
            <input
                type="text"
                placeholder="Buscar productos..."
                style={{
                    height: "30px",
                    width: "180px",
                    maxWidth: "250px",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                    outline: "none",
                    textAlign: "center",
                }}
            />
        </div>
    </nav>
    )
}