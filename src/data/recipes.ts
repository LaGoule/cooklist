export const recipes = [
    {
        id: 1,
        name: "Pâtes à la Carbonara",
        category: "Repas",
        tags: [],
        ingredients: [
            { name: "Pâtes", quantity: 150, unit: "g" },
            { name: "Lardons", quantity: 25, unit: "g" },
            { name: "Crème", quantity: 15, unit: "ml" },
            { name: "Parmesan", quantity: 15, unit: "g" }
        ]
    },
    {
        id: 2,
        name: "Salade César",
        category: "Salade",
        tags: [],
        ingredients: [
            { name: "Salade", quantity: 0.5, unit: "" },
            { name: "Blanc de poulet", quantity: 0.5, unit: "" },
            { name: "Croutons", quantity: 15, unit: "g" },
            { name: "Parmesan", quantity: 15, unit: "g" },
        ]
    },
    {
        id: 3,
        name: "Émincé à la zurichoise",
        category: "Repas",
        tags: ["En sauce"],
        ingredients: [
            { name: "Blanc de poulet", quantity: 0.5, unit: "" },
            { name: "Champignon", quantity: 6, unit: "" },
            { name: "Crème", quantity: 15, unit: "ml" },
            { name: "Oignons", quantity: 0.5, unit: "" }
        ]
    },
    {
        id: 4,
        name: "Ratatouille",
        category: "Repas",
        tags: ["Végétarien", "Sans-gluten"],
        ingredients: [
            { name: "Tomates", quantity: 2, unit: "" },
            { name: "Courgettes", quantity: 1, unit: "" },
            { name: "Aubergines", quantity: 1, unit: "" },
            { name: "Oignons", quantity: 1, unit: "" }
        ]
    },
    {
        id: 5,
        name: "Tortilla",
        category: "Repas",
        tags: ["Végétarien", "Sans-gluten"],
        ingredients: [
            { name: "Œufs", quantity: 1.5, unit: "" },
            { name: "Pommes de terre", quantity: 1.5, unit: "" },
            { name: "Oignons", quantity: 0.5, unit: "" },
            { name: "Sel", quantity: 1, unit: "pincée" }
        ]
    },
    {
        id: 6,
        name: "Soupe de légumes",
        category: "Soupe",
        tags: ["Végétarien", "Sans-gluten"],
        ingredients: [
            { name: "Carottes", quantity: 2, unit: "" },
            { name: "Pommes de terre", quantity: 1, unit: "" },
            { name: "Poireaux", quantity: 1, unit: "" },
            { name: "Oignons", quantity: 1, unit: "" }
        ]
    },
    {
        id: 7,
        name: "Crumble aux pommes",
        category: "Dessert",
        tags: ["Végétarien"],
        fixedPortions: 8,
        ingredients: [
            { name: "Pommes", quantity: 2, unit: "" },
            { name: "Farine", quantity: 40, unit: "g" },
            { name: "Beurre", quantity: 25, unit: "g" },
            { name: "Sucre", quantity: 20, unit: "g" }
        ]
    }
];
