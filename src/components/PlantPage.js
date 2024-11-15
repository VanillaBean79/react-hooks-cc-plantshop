import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

 
  const addPlant = (plant) => {
    fetch('http://localhost:6001/plants', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    })
      .then((r) => r.json())
      .then((newPlant) => setPlants([...plants, newPlant]));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }
  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={plants.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm))}/>
    </main>
  );
}

export default PlantPage;
