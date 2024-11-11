"use client";
import Image from "next/image";
import AddToCard from "./AddToCard";



const RecipeCard = ({ recipe, handleDetailsOpen, handleAddToCart }) => {
  // console.log("here is recipe", recipe.idMeal);

  

  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group space-y-6 border border-gray-100  rounded-md bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-500 shadow-gray-600/10 hover:translate-y-[-30px]"
    >
      <Image
        className="mx-auto rounded-md"
        src={recipe?.strMealThumb}
        alt="Web Development"
        loading="lazy"
        width={500}
        height={500}
      />
      <h3 className="text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p>
        Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
        consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
        animi officiis.
      </p>
      <div className="relative mx-auto flex gap-3 items-center justify-between invisible scale-0 group-hover:scale-100 transition-all duration-500  group-hover:visible">
        <button className="text-primary text-[#713E12]">Click to see details</button>
        <AddToCard 
          padding={0} 
          handleAddToCart={(event) => {
            event.stopPropagation(); // Prevents the click event from bubbling up
            handleAddToCart(recipe);
          }} 
        />
      </div>
    </div>
  );
};

export default RecipeCard;
