"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProdSearch } from "./hooks/search";

type NavbarProps = {
    className?: string;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

export function MobileNavbar({className = "", searchTerm, setSearchTerm}: NavbarProps)  {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    //Categorias
    const categories = [ "Ferreteria", "Electrónica" ];

    // Cierra el menú si se hace click fuera
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            }
            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [open]);
    

    return (
        <nav className={`mobile-navbar w-full flex flex-col ${className}`} >
            {/*Fila principal*/}
            <div 
                style={{ 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "space-between", 
                    width: "100%"
                }}
            >
                {/*Logo y categoria a la izquierda*/}
                {/*Menu desplegable Categoria*/}
                <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", position: "relative"}} ref={menuRef} >
                    <button 
                        className={`bt-hamb ${open ? "open" : ""}`}
                        onClick={() => setOpen(o => !o)}
                    >
                        <div className="hamb-bars">
                            <div />
                            <div />
                            <div />
                        </div>
                    </button>
                    {/*Logo*/}
                    <a className="nav-link" href="/">
                        <Image src="/plug.png" alt="Logo" width={32} height={32} />
                    </a>
                    {open && (
                        <ul className="hamb-list"
                        >
                            {categories.map(cat => (
                                <li key={cat} className="hamb-catg">
                                    <a
                                        href={`/category/${cat}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
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
                    marginTop: 10, 
                    display: "flex", 
                    justifyContent: "center" 
                }}>
                <ProdSearch value={searchTerm} onChange={setSearchTerm} />
            </div>
        </nav>
    )
}