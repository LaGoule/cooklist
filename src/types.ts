export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category?: string;
  reference?: {
    quantity: number;
    unit: string;
  };
}

export interface Recipe {
  id: number;
  name: string;
  category: string;
  tags: string[];
  fixedPortions?: number;
  ingredients: Ingredient[];
}

export interface Category {
  name: string;
}

export interface Tag {
  name: string;
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
