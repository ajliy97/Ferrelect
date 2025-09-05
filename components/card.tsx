import { Card, CardBody } from "@heroui/card";
import React from "react";
import { CardItem } from "./hooks/getproduct";

interface ProductCardProps {
    item: CardItem;
    index: number;
    activeCounters: number[];
    handleCartClick: (index: number) => void;
    handleAmountChange: (index: number, delta: number) => void;
    setList: React.Dispatch<React.SetStateAction<CardItem[]>>;
}

export function ProductCard({
    item,
    index,
    activeCounters,
    handleCartClick,
    handleAmountChange,
    setList,
    }: ProductCardProps) {
        return (
            <Card key={index} className="h-full">
                    <CardBody className="card-aspect flex flex-col h-full">
                        {/* Parte superior: imagen y texto */}
                        <div className="flex flex-row w-full flex-1">
                            {/* Bloque izquierdo: imagen */}
                            <div className="flex items-start justify-center w-1/3">
                                <img
                                    alt={item.title}
                                    className="card-image object-cover"
                                    src={
                                        item.img
                                            ? item.img 
                                            : item.db === "ferr"
                                                ? "/db/default-ferr.png"
                                                : item.db === "elect"
                                                    ? "/db/default-elect.png"
                                                    : item.db === "offer"
                                                        ? "/db/default-offer.png"
                                                        : "/db/default.png"
                                    }
                                    //Imagen por defecto si no hay foto
                                />
                            </div>
                            {/* Bloque derecho: texto */}
                            <div className="flex flex-col justify-start w-2/3 md:pl-3 pl-2 min-w-0">
                                <b className="card-title break-words whitespace-normal text-xs md:text-sm line-clamp-1">{item.title}</b>
                            </div>
                        </div>
                        {/* Parte inferior: precio y contador */}
                        <div className="flex flex-col items-center w-full mt-0">
                            <p className="card-price break-words whitespace-normal">{item.price}</p>
                            <div className="flex items-center gap-0.5 md:gap-2 mt-1 w-full justify-center max-w-full overflow-x-auto">
                                {/* Mostrar contador si activeCounters incluye el índice y amount > 0 */}
                                {activeCounters.includes(index) && item.amount > 0 ? (
                                    <>
                                        <button
                                            className="bt-add text-white rounded min-w-[24px] text-sm"
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
                                            className="bt-add text-white rounded min-w-[24px] text-sm"
                                            onClick={() => handleAmountChange(index, 1)}
                                        >+</button>
                                    </>
                                ) : (
                                    <button
                                        className="bt-cart rounded text-sm"
                                        onClick={() => handleCartClick(index)}
                                    >
                                        <img src="/shopping-cart.png" alt="cart" className="w-4 h-4 md:w-5 md:h-5 content-center" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
        );
}