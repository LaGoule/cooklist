import { IonItem, IonInput, IonButton } from "@ionic/react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <IonItem>
      <IonInput
        type="text"
        placeholder="Rechercher une recette..."
        value={searchTerm}
        onIonInput={(e) => setSearchTerm(e.detail.value!.toLowerCase())}
        style={{ background: "white", padding: "10px", borderRadius: "5px" }}
      />
      {searchTerm && (
        <IonButton fill="clear" onClick={() => setSearchTerm("")}>
          ❌
        </IonButton>
      )}
    </IonItem>
  );
};

export default SearchBar;
