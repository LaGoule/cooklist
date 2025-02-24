import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import RecipesFilter from "./RecipesFilter";
import RecipeCard from "./RecipeCard";
import { Recipe, Category, Tag } from "../types";

interface RecipesListProps {
  shoppingList: any[];
  favorites?: string[]; // Ajout du `?` et d'une valeur par défaut
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
  filteredRecipes?: Recipe[]; // Ajout du `?` pour éviter les erreurs
}

const RecipesList: React.FC<RecipesListProps> = ({
  shoppingList,
  favorites = [], // Valeur par défaut pour éviter undefined
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
  filteredRecipes = [], // Valeur par défaut pour éviter undefined
}) => {
  return (
    <IonGrid>
      {/* Filtres */}
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

      {/* Liste des recettes */}
      <IonRow>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
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
