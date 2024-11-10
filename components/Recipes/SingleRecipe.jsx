import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details",id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  console.log("here is singleRecipe id", id);
  console.log("here is singleRecipe data", data);

  if (isLoading) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image src={data?.strMealThumb} width={500} height={500} alt="Image" />
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;
