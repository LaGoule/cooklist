import { setupIonicReact } from "@ionic/react";
setupIonicReact();

import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonSplitPane, IonPage, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useCookListState } from "./hooks/useCookListState";
import RecipeCard from "./components/RecipeCard";
import RecipesFilter from "./components/RecipesFilter";
import ShoppingList from "./components/ShoppingList";

const App: React.FC = () => {
  const {
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
  } = useCookListState();

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
                {filteredRecipes.map(recipe => (
                  <IonCol key={recipe.id} size="12" size-md="4">
                    <RecipeCard
                      recipe={recipe}
                      isSelected={shoppingList.some(item => item.recipeId === recipe.id)}
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
