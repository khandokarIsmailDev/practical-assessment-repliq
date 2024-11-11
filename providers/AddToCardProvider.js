"use client"
import { useState, useEffect } from "react";
import { AddToCardContext } from "@/context";

export default function AddToCardProvider ({children}) {
    
    const [cart, setCart] = useState(() => {
        // Check if window is defined to ensure we're in the browser
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return []; // Default value if not in the browser
    });
    
    // Update localStorage whenever cart changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <AddToCardContext.Provider value={{cart, setCart}}>
            {children}
        </AddToCardContext.Provider>
    )
}
