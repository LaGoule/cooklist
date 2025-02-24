import { useState, useEffect } from "react";
import { recipes } from "../data/recipes";
import { ShoppingListItem } from "../types";

export const useCookListState = () => {
  // Gestion de la liste de courses
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const savedList = localStorage.getItem("shoppingList");
    return savedList ? JSON.parse(savedList) : [];
  });

  // Gestion des favoris
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Catégories et tags disponibles
  const availableCategories = Array.from(new Set(recipes.map(recipe => recipe.category))) ?? [];
  const availableTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags))) ?? [];

  // Gestion des filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter/Supprimer des favoris
  const toggleFavorite = (recipeId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(recipeId)
        ? prevFavorites.filter(id => id !== recipeId)
        : [...prevFavorites, recipeId]
    );
  };

  // Ajouter une recette à la liste de courses avec les bonnes proportions
  const addToShoppingList = (recipeId: number, portions: number) => {
    setShoppingList(prevList => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return prevList;

      const existingItem = prevList.find(item => item.recipeId === recipeId);
      if (existingItem) {
        return prevList.map(item =>
          item.recipeId === recipeId
            ? {
                ...item,
                portions,
                ingredients: recipe.ingredients.map(ingredient => ({
                  ...ingredient,
                  quantity: ingredient.quantity * portions,
                })),
              }
            : item
        );
      } else {
        const newIngredients = recipe.ingredients.map(ingredient => ({
          ...ingredient,
          quantity: ingredient.quantity * portions,
        }));

        return [...prevList, { recipeId, recipeName: recipe.name, portions, ingredients: newIngredients }];
      }
    });
  };

  // Supprimer une recette de la liste
  const removeRecipeFromList = (recipeId: number) => {
    setShoppingList(prevList => prevList.filter(item => item.recipeId !== recipeId));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSelectedCategories([]);
  };

  // Filtrer les recettes et mettre les favoris en premier
  const filteredRecipes = recipes
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(recipe.category);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => recipe.tags.includes(tag));
      return matchesSearch && matchesCategories && matchesTags;
    })
    .sort((a, b) => {
      const isAFav = favorites.includes(a.id);
      const isBFav = favorites.includes(b.id);
      return isAFav === isBFav ? 0 : isAFav ? -1 : 1;
    });

  return {
    shoppingList,
    setShoppingList,
    favorites,
    toggleFavorite,
    addToShoppingList,
    removeRecipeFromList,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    selectedCategories,
    setSelectedCategories,
    resetFilters,
    availableCategories,
    availableTags,
    filteredRecipes,
  };
};
