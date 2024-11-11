"use client"
import Link from "next/link";
import React,{useContext} from "react";
import { AddToCardContext } from "@/context";

export default function NavAddToCard({onShowCart}) {
  const {cart} = useContext(AddToCardContext)
  
  return (
    <Link
      href=""
      onClick={() => onShowCart(true)}
      className="block md:px-4 font-bold transition hover:text-yellow-700 relative"
    >
      <span >Cart</span>
      <span className="text-white absolute top-[-4px] right-[-6px] text-xs h-4 w-4 p-[.6rem] rounded-full bg-[#713E12] flex items-center justify-center">{cart.length}</span>
    </Link>
  );
}
