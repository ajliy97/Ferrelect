"use client"
//Componente que muestra la coleccion de productos

import { useEffect, useState } from "react";
import { useProduct, CardItem } from "./hooks/getproduct";
import { ProductCard } from "./card";
import { useProductList } from "./provider";


// Obtener los elementos donde la cantidad seleccionada es mayor q 0
export function getSelectedItems(list: CardItem[]): CardItem[] {
        return list.filter(item => item.amount > 0);
    }

export function Product({ searchTerm}: { searchTerm: string }) {
    const products = useProduct(["ferr", "elect"]);
    const { list, setList } = useProductList();
    const [activeCounters, setActiveCounters] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 24;


    /*Mensaje en consola cuando va aumentando la cantidad de un producto
    useEffect(() => {
    // Verifica si hay algún producto con amount > 0
    const added = list.filter(item => item.amount > 0);
    if (added.length > 0) {
        console.log("¡Elemento añadido al carrito!", added);
    }
}, [list]);*/

    useEffect(() => {
            setList(products.map(item => ({ ...item })));
            setPage(1); //Reinicia a la primera pagina
    }, [products]);

    // Función para quitar tildes
    function removeAccents(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    //Filtrar por el atributo title
    const filteredList = list.filter(item => 
        removeAccents(item.title.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase()))
    );

    // Controla click para añadir al carro amount=1
    const handleCartClick = (index: number) => {
        setList(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, amount: 1 } : item
            )
        );
        setActiveCounters(prev =>
            prev.includes(index) ? prev : [...prev, index]
        );
    };

    // Maneja el cambio de cantidad
    const handleAmountChange = (index: number, delta: number) => {
        setList(prev =>
            prev.map((item, i) => {
                if (i === index) {
                    const newAmount = Math.max(0, Math.min(item.amount + delta, item.dbamount));
                    return { ...item, amount: newAmount };
                }
                return item;
            })
        );
        setActiveCounters(prev =>
            list[index].amount + delta <= 0
                ? prev.filter(i => i !== index)
                : prev.includes(index)
                    ? prev
                    : [...prev, index]
        );
    };

    
    //Calcular los elementos a mostrar en la pagina actual (Sobre la lista filtrada)
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pagedList = filteredList.slice(startIdx, endIdx);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    return (
        <div className="w-full max-w-full flex flex-col items-center">
            <div className="grid grid-cols-4 md:grid-cols-8 items-start mb-0 md:mt-4 mt-2 w-full">
                {pagedList.map((item, index) => {
                    const globalIndex = list.findIndex(prod => prod.title === item.title && prod.price === item.price); // Índice global en la lista completa
                    return (
                        <ProductCard
                            key={globalIndex}
                            item={item}
                            index={globalIndex}
                            activeCounters={activeCounters}
                            handleCartClick={handleCartClick}
                            handleAmountChange={handleAmountChange}
                            setList={setList}
                        />
                    );
                })}
            </div>
            {/*Controles de paginacion*/}
            <div className="flex gap-2 mt-0 md:mb-1 mb-0.5">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="disabled:opacity-20"
                >
                    {"<"}
                </button>
                <span>Página {page} de {totalPages}</span>
                <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="disabled:opacity-20"
                >
                    {">"} 
                </button>  
            </div>
        </div>
    );
}