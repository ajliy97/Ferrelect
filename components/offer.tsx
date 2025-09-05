"use client"

import { useEffect, useState } from "react";
import { useProduct, CardItem } from "./hooks/getproduct";
import { ProductCard } from "./card";

export function Offer() {
    const products = useProduct(["offer"]);
    const [list, setList] = useState<CardItem[]>([]);
    const [activeCounters, setActiveCounters] = useState<number[]>([]);
    const [start, setStart] = useState(0);

    // Responsive: cambia visibleCount y cardWidth según el ancho de pantalla
    const [visibleCount, setVisibleCount] = useState(3);
    const [cardWidth, setCardWidth] = useState(270);

    useEffect(() => {
        setList(products.map(item => ({ ...item })));
        setStart(0);
    }, [products]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 640) { // sm Telefono
                setVisibleCount(2);
                setCardWidth(100);
            } else if (window.innerWidth < 1024) { // md Tablet
                setVisibleCount(3);
                setCardWidth(150);
            } else {                             // lg Computador
                setVisibleCount(5);
                setCardWidth(185);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const handlePrev = () => setStart(s => Math.max(0, s - 1));
    const handleNext = () => setStart(s => Math.min(list.length - visibleCount, s + 1));

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative flex items-center justify-center w-full">
                <button
                    onClick={handlePrev}
                    disabled={start === 0}
                    className="offer-btn absolute left-1 top-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded disabled:opacity-50"
                >
                    {"<"}
                </button>
                <div
                    className="overflow-hidden"
                    style={{ width: `${cardWidth * visibleCount}px`, maxWidth: "100vw" }}
                >
                    <div
                        className="flex transition-transform duration-500 gap-0"
                        style={{
                            transform: `translateX(-${start * cardWidth}px)`,
                        }}
                    >
                        {list.map((item, index) => (
                            <div
                                key={index}
                                style={{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }}
                                className="offer-card"
                            >
                                <ProductCard
                                    item={item}
                                    index={index}
                                    activeCounters={activeCounters}
                                    handleCartClick={handleCartClick}
                                    handleAmountChange={handleAmountChange}
                                    setList={setList}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleNext}
                    disabled={start >= list.length - visibleCount}
                    className= "offer-btn absolute right-1 top-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded disabled:opacity-50"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}