import { useEffect, useState } from "react";

export interface CardItem {
    _id: number;
    price: string;
    img: string;
    title: string;
    amount: number;
    db: string;
    dbamount: number;
}

export function useProduct(filterKeys?: string[]) {
    const [list, setList] = useState<CardItem[]>([]);

    useEffect(() => {
        fetch("/api/dbproducts")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setList(data);
                } else if (typeof data === "object" && data !== null) {
                    const allowedKeys = filterKeys ?? Object.keys(data);
                    const all = Object.entries(data)
                        .filter(([key]) => allowedKeys.includes(key))
                        .map(([key, value]) =>
                            Array.isArray(value)
                                ? value.map(item => ({ ...item, db: key }))
                                : []
                        )
                        .flat();
                    setList(all);
                } else {
                    setList([]);
                }
            });
    }, [JSON.stringify(filterKeys)]);

    return list;
}