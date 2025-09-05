import React from "react";

interface ProdSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProdSearch({ value, onChange }: ProdSearchProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleClear = () => {
        onChange("");
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                className="input-search"
                type="text"
                placeholder="Buscar producto..."
                value={value}
                onChange={handleInputChange}
            />
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "1.2rem",
                        color: "#ffffff",
                        lineHeight: 1,
                    }}
                    aria-label="Limpiar búsqueda"
                >
                    ×
                </button>
            )}
        </div>
    );
}