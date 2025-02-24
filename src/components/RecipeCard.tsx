import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonChip, IonLabel, IonInput } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { formatQuantity } from "../utils/formatQuantity";

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  addToShoppingList: (recipeId: number, portions: number) => void;
  removeRecipeFromList: (recipeId: number) => void;
  isFavorite: boolean;
  toggleFavorite: (recipeId: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSelected, addToShoppingList, removeRecipeFromList, isFavorite, toggleFavorite }) => {
  const [portions, setPortions] = useState(2);

  const handlePortionChange = (e: CustomEvent) => {
    const newPortions = parseInt(e.detail.value, 10);
    if (!isNaN(newPortions) && newPortions > 0) {
      setPortions(newPortions);
      if (isSelected) addToShoppingList(recipe.id, newPortions);
    }
  };

  return (
    <IonCard 
      onClick={() => isSelected ? removeRecipeFromList(recipe.id) : addToShoppingList(recipe.id, portions)}
      className={isSelected ? "selected-recipe" : ""}
      style={{ 
        border: isSelected ? "4px solid var(--ion-color-primary)" : "4px solid transparent" ,
        background : isSelected ? "var(--ion-color-light)" : "white",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      <IonCardHeader style={{ 
        display: "flex", 
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <IonCardTitle 
          style={{ 
            flexGrow: 1, 
            maxWidth: "100%",
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis",
            textAlign: "left" 
          }}
        >
          {recipe.name}
        </IonCardTitle>
        <IonIcon 
          icon={isFavorite ? heart : heartOutline} 
          color="danger"
          style={{ 
            fontSize: "24px", 
            cursor: "pointer", 
            flexShrink: 0, 
            marginLeft: "8px" 
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
        />
      </IonCardHeader>
      <IonCardContent>
      <IonInput
        type="number"
        value={portions}
        placeholder="Nombre de portions"
        style={{ background: "white" }}
        label="Portions"
        min={1}
        labelPlacement="floating"
        fill="outline"
        onIonChange={handlePortionChange} // Utilisation de la fonction existante
        onClick={(e) => e.stopPropagation()}
      />

        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} {formatQuantity(ingredient.quantity * portions, ingredient.unit)}
            </li>
          ))}
        </ul>

        {/* Affichage de la catégorie */}
        <IonChip 
          color="primary" 
          style={{ marginTop: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
            onTagClick(recipe.category); // Permet de filtrer par catégorie
          }}
        >
          <IonLabel>{recipe.category}</IonLabel>
        </IonChip>

        {/* Affichage des tags */}
        {recipe.tags.map((tag, index) => (
          <IonChip 
            key={index} 
            color="medium"
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag); // Permet de filtrer par tag
            }}
          >
            <IonLabel>{tag}</IonLabel>
          </IonChip>

        ))}

      </IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;