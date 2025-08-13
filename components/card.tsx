"use client"
import { Card, CardBody, Image } from "@heroui/react";
import { useEffect, useState } from "react";

interface CardItem {
    _id: number;
    price: string;
    img: string;
    title: string;
    amount: number;
    dbamount: number; // cantidad máxima permitida
}

export function Cards() {
    const [list, setList] = useState<CardItem[]>([]);
    const [activeCounters, setActiveCounters] = useState<number[]>([]);

    // Maneja el click en el carrito
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

    useEffect(() => {
        fetch("/api/cards")
            .then(res => res.json())
            .then(data => setList(data));
    }, []);

    return (
        <div className="w-full max-w-full grid grid-cols-4 md:grid-cols-8 items-start mb-4 mt-4">
            {list.map((item, index) => (
                <Card key={index} className="h-full">
                    <CardBody className="card-aspect flex flex-col h-full">
                        {/* Parte superior: imagen y texto */}
                        <div className="flex flex-row w-full flex-1">
                            {/* Bloque izquierdo: imagen */}
                            <div className="flex items-start justify-center w-1/3">
                                {item.img && (
                                    <Image
                                        alt={item.title}
                                        className="card-image object-cover"
                                        src={item.img}
                                    />
                                )}
                            </div>
                            {/* Bloque derecho: texto */}
                            <div className="flex flex-col justify-start w-2/3 md:pl-3 pl-2 min-w-0">
                                <b className="card-title break-words whitespace-normal text-xs md:text-sm line-clamp-1">{item.title}</b>
                            </div>
                        </div>
                        {/* Parte inferior: precio y contador */}
                        <div className="flex flex-col items-center w-full mt-0">
                            <p className="card-title break-words whitespace-normal text-xs md:text-sm">{item.price}</p>
                            <div className="flex items-center gap-0.5 md:gap-2 mt-1 w-full justify-center max-w-full overflow-x-auto">
                                {/* Mostrar contador si activeCounters incluye el índice y amount > 0 */}
                                {activeCounters.includes(index) && item.amount > 0 ? (
                                    <>
                                        <button
                                            className="bt-add bg-red-700 text-white rounded min-w-[24px] text-sm"
                                            onClick={() => handleAmountChange(index, -1)}
                                        >-</button>
                                        <input
                                            type="number"
                                            min={1}
                                            max={item.dbamount}
                                            className="w-14 text-center border rounded"
                                            value={item.amount === 0 ? "" : item.amount}
                                            onFocus={e => e.target.select()}
                                            onChange={e => {
                                                let value = e.target.value === "" ? 0 : Number(e.target.value);
                                                if (value > item.dbamount) value = item.dbamount;
                                                setList(prev =>
                                                    prev.map((it, i) =>
                                                        i === index ? { ...it, amount: value } : it
                                                    )
                                                );
                                            }}
                                            onBlur={e => {
                                                if (e.target.value === "" || Number(e.target.value) < 1) {
                                                    setList(prev =>
                                                        prev.map((it, i) =>
                                                            i === index ? { ...it, amount: 1 } : it
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        <button
                                            className="bt-add bg-red-700 text-white rounded min-w-[24px] text-sm"
                                            onClick={() => handleAmountChange(index, 1)}
                                        >+</button>
                                    </>
                                ) : (
                                    <button
                                        className="bt-cart bg-amber-600 rounded text-sm"
                                        onClick={() => handleCartClick(index)}
                                    >
                                        <img src="/shopping-cart.png" alt="cart" className="w-4 h-4 md:w-6 md:h-6 content-center" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}