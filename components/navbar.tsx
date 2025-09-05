"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProdSearch } from "./hooks/search";


type NavbarProps = {
    className?: string;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

export function Navbar({className = "", searchTerm, setSearchTerm}: NavbarProps) {
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
        <nav className={`navbar ${className}`}>
            {/* Logo a la izquierda */}
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <a className="nav-link" href="/">
                    <Image src="/plug.png" alt="Logo" width={40} height={40} />
                    <span className="nav-text" style={{ marginLeft: "0.75rem", fontWeight: "bold", fontSize: "1.2rem", color: "white" }}>Ferrelect</span>
                </a>
                {/*Menu desplegable Categoria*/}
                <div style={{ marginLeft: "2rem", position: "relative" }} ref={menuRef} >
                    <button 
                        className={`bt-hamb ${open ? "open" : ""}`}
                        onClick={() => setOpen(o => !o)}
                    >
                        <span style={{ color: "white", marginRight: "0.2rem" }}>Categoría</span>
                        <div className="hamb-bars">
                            <div />
                            <div />
                            <div />
                        </div>
                    </button>
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
            </div>

            {/* Barra de búsqueda en el centro */}
            <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} >
                <ProdSearch value={searchTerm} onChange={setSearchTerm} />
            </div>

            {/* Usuario y carro a la derecha */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <a className="nav-link" href="/user">
                    <Image className="nav-icon" src="/user.png" alt="user icon" width={24} height={24} />
                    <span className="nav-text" style={{ marginLeft: "0.7rem", color: "white" }}>Usuario</span>
                </a>
                <a className="nav-link" href="/cart">
                    <Image src="/shopping-cart.png"  alt="user icon" width={24} height={24} color="white" />
                    <span className="nav-text" style={{ marginLeft: "0.7rem", color: "white" }}>Carro</span>
                </a>
            </div>
        </nav>
    );
}