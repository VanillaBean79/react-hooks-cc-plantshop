import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
   const [plants, setPlants] = useState([])
   const [ searchPlant, setSearchPlant] = useState("")


   useEffect(()=>{
    fetch("http://localhost:6001/plants")
      .then((r)=> r.json())
      .then(data=> {
           setPlants(data)
            console.log("the side effect function just ran")
      })
   },[])

   const filteredPlants = plants.filter((plant) => 
    plant?.name?.toLowerCase()?.includes(searchPlant.toLowerCase()) || false)
   

   const handleAddPlant = (newPlant)=>{
    setPlants((prevPlants) => [...prevPlants, newPlant])
   }
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearchPlant}/>
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
