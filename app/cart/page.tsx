"use client";

import { getSelectedItems } from "@/components/product";
import { useProductList } from "@/components/provider";


export default function Cart() {
    const { list } = useProductList();
    console.log("Lista en cart:", list); // <-- Verifica aquí 
    const selected = list.filter(item => item.amount > 0);
    return (
        <div>
            <h1>Carrito de Compras</h1>
            <ul>
                {selected.length === 0 && <li>No hay productos seleccionados.</li>}
                {selected.map(item => (
                    <li key={item._id || item.title}>
                        {item.title} - Cantidad: {item.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}