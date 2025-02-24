export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: number;
  name: string;
  defaultPortions: number;
  ingredients: Ingredient[];
}

export interface ShoppingListItem {
  recipeId: number;
  recipeName: string;
  portions: number;
  ingredients: Ingredient[];
}

export interface ShoppingListProps {
  shoppingList: ShoppingListItem[];
  clearList: () => void;
}
