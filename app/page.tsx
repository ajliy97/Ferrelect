"use client"

import { Product } from "@/components/product";
import { Offer } from "@/components/offer";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { useProductList } from "@/components/provider";




export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { list } = useProductList();
  const hasSelected = list.some(item => item.amount > 0);

  return (
    <div className="font-sans grid  min-h-screen">
      <main className="mt-16 flex flex-col row-start-2 items-center">
        <div className="offer-lay w-8/11 mx-auto mb-3 mt-10 md:mb-3 md:mt-4 rounded">
          <Navbar className="hidden md:flex" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <MobileNavbar className="flex md:hidden" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Offer />
        </div>
        <div className="product-lay w-11/12 mx-auto mb-3 md:mb-4 rounded">
          <Product searchTerm={searchTerm}/>
        </div>
      </main>
      { hasSelected && (
        <button className="buy-btn">
          <a  href="/cart" >Comprar</a>
        </button>
      )}
    </div>
  );
}
