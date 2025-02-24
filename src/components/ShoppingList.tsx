import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonMenu, IonLabel } from "@ionic/react";
import { jsPDF } from "jspdf";
import { formatQuantity } from "../utils/formatQuantity";
import { ShoppingListProps } from "../types";
import { ingredients } from "../data/ingredients";

// Création d'un dictionnaire pour accéder rapidement aux catégories par nom d'ingrédient
const ingredientCategoryMap = ingredients.reduce((acc, ingredient) => {
  acc[ingredient.name] = ingredient.category;
  return acc;
}, {} as Record<string, string>);

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList, clearList }) => {
  // Fusionner les ingrédients identiques
  const mergedIngredients = shoppingList.flatMap(recipe => recipe.ingredients).reduce((acc, ingredient) => {
    const existing = acc.find(item => item.name === ingredient.name);
    if (existing) {
      existing.quantity += ingredient.quantity;
    } else {
      acc.push({ ...ingredient });
    }
    return acc;
  }, [] as { name: string; quantity: number; unit: string }[]);

  // Regrouper les ingrédients par catégorie
  const categorizedIngredients: Record<string, { name: string; quantity: number; unit: string }[]> = {};

  mergedIngredients.forEach((ingredient) => {
    const category = ingredientCategoryMap[ingredient.name] || "Autres";
    if (!categorizedIngredients[category]) {
      categorizedIngredients[category] = [];
    }
    categorizedIngredients[category].push(ingredient);
  });

  const categoryOrder = [
    "Fruits & Légumes",
    "Céréales & Féculents",
    "Viandes & Poissons",
    "Protéines",
    "Produits laitiers",
    "Épicerie",
    "Autres"
  ];

  // 🔹 Fonction pour exporter en PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CookList - Liste de Courses", 20, 20);

    let yPosition = 40;
    doc.setFontSize(12);
    
    categoryOrder.forEach((category) => {
      if (categorizedIngredients[category]) {
        doc.setFont("helvetica", "bold");
        doc.text(category, 20, yPosition);
        yPosition += 8;
        doc.setFont("helvetica", "normal");

        categorizedIngredients[category].forEach((item) => {
          doc.text(`- ${item.name} ${formatQuantity(item.quantity, item.unit)}`, 25, yPosition);
          yPosition += 7;
        });

        yPosition += 5;
      }
    });

    doc.save("liste_de_courses.pdf");
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>🛒 Liste de courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full" className="ion-no-padding ion-no-margin">
          {categoryOrder
            .filter(category => categorizedIngredients[category]) // Garde uniquement les catégories qui existent
            .map(category => (
              <div key={category}>
                <IonItem lines="none" color="light">
                  <IonLabel style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", opacity: 0.7 }}>
                    {category}
                  </IonLabel>
                </IonItem>
                {categorizedIngredients[category].map((item, index) => (
                  <IonItem key={index} style={{ minHeight: "35px" }}>
                    {item.name} {formatQuantity(item.quantity, item.unit)}
                  </IonItem>
                ))}
              </div>
            ))}
        </IonList>

        {shoppingList.length > 0 && (
          <>
            <IonButton expand="block" color="primary" onClick={exportToPDF} style={{ margin: "10px" }}>
              Exporter en PDF
            </IonButton>
            <IonButton expand="block" color="danger" onClick={clearList} style={{ margin: "10px" }}>
              Vider la liste
            </IonButton>
          </>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default ShoppingList;
