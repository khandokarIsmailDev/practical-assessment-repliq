# Bug

- Modal is not showing the details of the recipe
- Modal is wraping the SingleRecipe component, so it is not working
- HttpKit.getRecipeDetails is not working; missing await
-  queryKey: ["recipe-details"] , here is the id is not passing in SingleRecipe.jsx; (i fix it)
- SingleRecipe.jsx has a bug "if (!isLoading) return "Loading...";" it should be "if (isLoading) return "Loading...";"
- RecipeCard.jsx use onClick, but there is missing 'use client'; onClick is client component


- Hero title should be big
- Navbar is responsive,but not add any humburger menu