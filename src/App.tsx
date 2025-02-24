import { setupIonicReact } from "@ionic/react";
setupIonicReact();

import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonSplitPane, IonPage, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useCookListState } from "./hooks/useCookListState";
import RecipesList from "./components/RecipesList";
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
          <IonContent className="ion-padding">
            <RecipesList
              shoppingList={shoppingList}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToShoppingList={addToShoppingList}
              removeRecipeFromList={removeRecipeFromList}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              resetFilters={resetFilters}
              availableCategories={availableCategories}
              availableTags={availableTags}
              filteredRecipes={filteredRecipes}
            />
          </IonContent>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
