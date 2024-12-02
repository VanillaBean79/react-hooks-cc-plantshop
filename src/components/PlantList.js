import React, { useState } from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onPriceUpdate}) {
  const [editingPlant, setEditingPlant] = useState(null)

    const handlePriceChange = (e, plant)=> {
      const newPrice = parseFloat(e.target.value)
      if (!isNaN(newPrice)) {
        const updatedPlant = { ...plant, price: newPrice}
        onPriceUpdate(updatedPlant)
      }
    }
  
  return (
    <ul className="cards">{plants.map((plant)=> (
      <PlantCard  
        key={plant.id}
        name={plant.name}
        image={plant.image}
        price={plant.price}
        onChange={(e) => handlePriceChange(e, plant)}
        />
    ))}
    </ul>
  );
}

export default PlantList;
