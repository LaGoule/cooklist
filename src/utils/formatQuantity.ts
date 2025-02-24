export const formatQuantity = (quantity: number, unit: string) => {
    const conversions: { [key: string]: { factor: number; newUnit: string } } = {
      g: { factor: 1000, newUnit: "kg" },
      ml: { factor: 1000, newUnit: "L" },
    };
  
    if (conversions[unit] && quantity >= conversions[unit].factor) {
      return `${(quantity / conversions[unit].factor).toFixed(2)} ${conversions[unit].newUnit}`;
    }
  
    return `${quantity} ${unit}`;
  };
  