"use client";
import React from 'react'

export default function AddToCard({padding, handleAddToCart}) {
  return (
    <button className={`bg-[#713E12] font-semibold hover:bg-[#713E12]/80 transition-all duration-300 text-white px-4 py-${padding} group-hover:py-2  rounded-md`} onClick={handleAddToCart}>Add To Cart</button>
  )
}
