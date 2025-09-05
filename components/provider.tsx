"use client";
// Contexto para compartir la lista de productos y su estado

import { createContext, useContext, useEffect, useState } from "react";
import { CardItem } from "@/components/hooks/getproduct";

// Define el contexto y el proveedor

const ProductContext = createContext<{
    list: CardItem[];
    setList: React.Dispatch<React.SetStateAction<CardItem[]>>;
}>({
    list: [],
    setList: () => {}
});

export function useProductList() {
    return useContext(ProductContext);
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [list, setList] = useState<CardItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Solo lee localStorage en el cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("product-list");
            if (saved) setList(JSON.parse(saved));
            setIsMounted(true);
        }
    }, []);

    // Guarda la lista en localStorage cuando cambie
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("product-list", JSON.stringify(list));
        }
    }, [list]);

    // Evita renderizar los hijos hasta que esté montado en el cliente
    if (!isMounted) return null;

    return (
        <ProductContext.Provider value={{ list, setList }}>
            {children}
        </ProductContext.Provider>
    );
}