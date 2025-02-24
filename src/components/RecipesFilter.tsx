import { IonItem, IonInput, IonChip, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

interface RecipesFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[] | ((prev: string[]) => string[])) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[] | ((prev: string[]) => string[])) => void;
  availableTags: string[];
  availableCategories: string[];
  resetFilters: () => void;
}

const RecipesFilter: React.FC<RecipesFilterProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedTags, 
  setSelectedTags,
  selectedCategories,
  setSelectedCategories,
  availableTags,
  availableCategories,
  resetFilters
}) => {

  // Gestion des Tags (mode "ET")
  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) => 
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  // Gestion des Catégories (mode "OU")
  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) => 
      prevCategories.includes(category) ? prevCategories.filter(c => c !== category) : [...prevCategories, category]
    );
  };

  return (
    <>
      {/* Barre de recherche avec bouton reset */}
      <IonItem>
        <IonInput
          type="text"
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value?.toLowerCase() || "")}
          style={{ background: "white", padding: "10px", borderRadius: "5px", flex: "1" }}
        />
        <IonButton fill="clear" color="danger" onClick={resetFilters}>
          <IonIcon icon={closeCircleOutline} />
        </IonButton>
      </IonItem>

      {/* Filtres par Catégories */}
      <IonItem>
        <IonLabel>Catégories :</IonLabel>
        { (availableCategories ?? []).map((category) => (
          <IonChip 
            key={category} 
            color={selectedCategories.includes(category) ? "primary" : "medium"}
            onClick={() => toggleCategory(category)}
          >
            <IonLabel>{category}</IonLabel>
          </IonChip>
        ))}
      </IonItem>

      {/* Filtres par Tags */}
      <IonItem>
        <IonLabel>Tags :</IonLabel>
        { (availableTags ?? []).map((tag) => (
          <IonChip 
            key={tag} 
            color={selectedTags.includes(tag) ? "primary" : "medium"}
            onClick={() => toggleTag(tag)}
          >
            <IonLabel>{tag}</IonLabel>
          </IonChip>
        ))}
      </IonItem>
    </>
  );
};

export default RecipesFilter;
