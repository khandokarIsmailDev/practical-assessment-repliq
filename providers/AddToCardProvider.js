"use client"
import { useState, useEffect } from "react";
import { AddToCardContext } from "@/context";

export default function AddToCardProvider ({children}) {
    
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      });
    
      // Update localStorage whenever cart changes
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

    return (
        <AddToCardContext.Provider value={{cart, setCart}}>
            {children}
        </AddToCardContext.Provider>
    )
}
