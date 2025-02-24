import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import RecipesFilter from "./RecipesFilter";
import RecipeCard from "./RecipeCard";
import { Recipe, Category, Tag } from "../types";

interface RecipesListProps {
  shoppingList: any[];
  favorites?: string[]; 
  toggleFavorite: (recipeId: string) => void;
  addToShoppingList: (recipe: Recipe) => void;
  removeRecipeFromList: (recipeId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  resetFilters: () => void;
  availableCategories: Category[];
  availableTags: Tag[];
  filteredRecipes?: Recipe[]; 
}

const RecipesList: React.FC<RecipesListProps> = ({
  shoppingList,
  favorites = [] as string[], 
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
  filteredRecipes = [],
}) => {
  return (
    <IonGrid>
      {/* Filtres */}
      <RecipesFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags as any}
        setSelectedTags={setSelectedTags as any}
        selectedCategories={selectedCategories as any}
        setSelectedCategories={setSelectedCategories as any}
        resetFilters={resetFilters}
        availableCategories={availableCategories as any}
        availableTags={availableTags as any}
      />

      {/* Liste des recettes */}
      <IonRow>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <IonCol key={recipe.id} size="12" size-md="4">
              <RecipeCard
                recipe={recipe}
                isSelected={shoppingList.some((item) => item.recipeId === recipe.id)}
                addToShoppingList={addToShoppingList as any}
                removeRecipeFromList={removeRecipeFromList as any}
                isFavorite={favorites.includes(recipe.id as any)}
                toggleFavorite={toggleFavorite as any}  
              />
            </IonCol>
          ))
        ) : (
          <IonCol size="12" className="ion-text-center">
            <IonText color="medium" className="" style={{  }}>
              <p>&nbsp;&nbsp;&nbsp;Aucune recette ne correspond aux filtres.</p>
            </IonText>
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default RecipesList;
