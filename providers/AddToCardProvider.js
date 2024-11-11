"use client"
import { useState, useContext } from "react";
import { AddToCardContext } from "@/context";

export default function AddToCardProvider ({children}) {
    const [cart, setCart] = useState([])

    return (
        <AddToCardContext.Provider value={{cart, setCart}}>
            {children}
        </AddToCardContext.Provider>
    )
}
