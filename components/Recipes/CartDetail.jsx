"use client";
import React, { useContext } from "react";
import { AddToCardContext } from "@/context";

export default function CartDetail({ onCloseCart }) {
  const { cart, setCart } = useContext(AddToCardContext);

  const handleRemove = (event, id) => {
    event.stopPropagation();
    setCart(cart.filter((item) => item.idMeal !== id));
  };

  console.log("all cart", cart);
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm"
      onClick={() => onCloseCart(false)}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[790px] p-4 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white shadow-md  rounded-2xl overflow-hidden p-5 md:p-9">
          <h2 className="text-2xl lg:text-[30px] mb-10 font-bold">
            Your Carts
          </h2>
          <div className="space-y-8 lg:space-y-12 max-h-[450px] overflow-auto mb-10 lg:mb-14">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.idMeal}
                  className="grid grid-cols-[1fr_auto] gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      className="rounded overflow-hidden"
                      src={item.strMealThumb}
                      alt=""
                      width={"50px"}
                      height={"50px"}
                    />
                    <div>
                      <h3 className="text-base md:text-xl font-bold">
                        {item.strMeal}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 items-center">
                    
                    <button
                      className="bg-[#713E12] rounded-md p-2 md:px-4 inline-flex items-center space-x-2 text-white"
                      onClick={(event) => handleRemove(event, item.idMeal)}
                    >
                      <img className="w-5 h-5" src="/delete.svg" alt="" />
                      <span className="max-md:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg">No items in cart</p>
            )}

            
          </div>
          <div className="flex items-center justify-end gap-2">
            <a
              className="rounded-md p-2 md:px-4 inline-flex items-center space-x-2 bg-primary text-[#171923] text-sm"
              href="#"
            >
              <img src="/images/checkout.svg" width={24} height={24} alt="" />
              <span>Checkout</span>
            </a>
            <a
              className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F]  font-semibold text-sm"
              href="#"
              onClick={() => {
                onCloseCart(false);
              }}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
