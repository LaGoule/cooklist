import { setupIonicReact } from "@ionic/react";
setupIonicReact();

import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonSplitPane, IonPage } from "@ionic/react";
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
            <RecipesList
              shoppingList={shoppingList}
              favorites={favorites as any}
              toggleFavorite={toggleFavorite as any}
              addToShoppingList={addToShoppingList as any}
              removeRecipeFromList={removeRecipeFromList as any}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedTags={selectedTags as any}
              setSelectedTags={setSelectedTags as any}
              selectedCategories={selectedCategories as any}
              setSelectedCategories={setSelectedCategories as any}
              resetFilters={resetFilters}
              availableCategories={availableCategories as any}
              availableTags={availableTags as any}
              filteredRecipes={filteredRecipes}
            />
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
