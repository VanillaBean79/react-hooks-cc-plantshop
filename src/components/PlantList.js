import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

function PlantList() {
  const [plants, setPlants] = useState([])
  
  useEffect(()=>{
    fetch("http://localhost:6001/plants")
      .then((r)=>r.json())
      .then((data)=>setPlants(data))
  },[])

  const handlePriceUpdate = (id, updatedPrice) => {
    fetch(`http://localhost:6001/plants/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({price: updatedPrice}),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) => 
         prevPlants.map((plant) => 
        plant.id === updatedPlant.id ? updatedPlant : plant) )
      })
  }
  
  return (
    <ul className="cards">{plants.map((plant)=> (
      <PlantCard  
        key={plant.id}
        plant={plant}
        onUpdatePrice={handlePriceUpdate}
        
        />
    ))}
    </ul>
  );
}

export default PlantList;
