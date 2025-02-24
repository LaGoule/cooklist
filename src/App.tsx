import { setupIonicReact } from '@ionic/react';
setupIonicReact();

import { useState, useEffect } from "react";
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButtons,
  IonSplitPane,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { recipes } from "./data/recipes";
import RecipeCard from "./components/RecipeCard";
import RecipesFilter from "./components/RecipesFilter";
import ShoppingList from "./components/ShoppingList";
import { Recipe, ShoppingListItem } from "./types";

const App: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const savedList = localStorage.getItem("shoppingList");
    return savedList ? JSON.parse(savedList) : [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const availableCategories = Array.from(new Set(recipes?.map(recipe => recipe.category))) ?? [];
  const availableTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags))) ?? [];


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(recipeId)
        ? prevFavorites.filter((id) => id !== recipeId)
        : [...prevFavorites, recipeId]
    );
  };

  const addToShoppingList = (recipeId: number, portions: number) => {
    setShoppingList((prevList) => {
      const existingItem = prevList.find((item) => item.recipeId === recipeId);
      if (existingItem) {
        const recipe = recipes.find((r) => r.id === recipeId);
        if (!recipe) return prevList;

        return prevList.map((item) =>
          item.recipeId === recipeId
            ? {
                ...item,
                portions,
                ingredients: item.ingredients.map((ingredient, index) => {
                  const recipeIngredient = recipe.ingredients[index];
                  return recipeIngredient
                    ? { ...ingredient, quantity: recipeIngredient.quantity * portions }
                    : ingredient;
                }),
              }
            : item
        );
      } else {
        const recipe = recipes.find((r) => r.id === recipeId);
        if (!recipe) return prevList;

        const newIngredients = recipe.ingredients.map((ingredient) => ({
          ...ingredient,
          quantity: ingredient.quantity * portions,
        }));

        return [...prevList, { recipeId, recipeName: recipe.name, portions, ingredients: newIngredients }];
      }
    });
  };

  const removeRecipeFromList = (recipeId: number) => {
    setShoppingList((prevList) => prevList.filter((item) => item.recipeId !== recipeId));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSelectedCategories([]);
  };

  const filteredRecipes = (recipes ?? [])
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(recipe.category);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => recipe.tags.includes(tag));
      return matchesSearch && matchesCategories && matchesTags;
    })
    .sort((a, b) => (favorites.includes(a.id) ? -1 : 1) - (favorites.includes(b.id) ? -1 : 1));

  return (
    <IonApp>
      <IonSplitPane contentId="main-content">
        <ShoppingList shoppingList={shoppingList} clearList={() => setShoppingList([])} />

        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>CookList</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonGrid>
            <RecipesFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories} 
              resetFilters={resetFilters}
              availableCategories={availableCategories}
              availableTags={availableTags}
            />

              <IonRow>
                {filteredRecipes.map((recipe) => (
                  <IonCol key={recipe.id} size="12" size-md="4">
                    <RecipeCard
                      recipe={recipe}
                      isSelected={shoppingList.some((item) => item.recipeId === recipe.id)}
                      addToShoppingList={addToShoppingList}
                      removeRecipeFromList={removeRecipeFromList}
                      isFavorite={favorites.includes(recipe.id)}
                      toggleFavorite={toggleFavorite}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
