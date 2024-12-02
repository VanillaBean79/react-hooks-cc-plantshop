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
    plant.name.toLowerCase().includes(searchPlant.toLowerCase()))
   

   const handleAddPlant = (newPlant)=>{
    setPlants((prevPlants) => [...prevPlants, newPlant])
   }

   const handlePriceUpdate = (updatedPlant)=> {
    setPlants((prevPlants)=>
      prevPlants.map((plant)=>
    plant.id === updatedPlant.id ? {...plant, price: updatedPlant.price }
   : plant )
)
  fetch(`http://localhost:6001/plants/${updatedPlant.id}`,{
    method:"PATCH",
    headers: {
      "Content-Type":"Application/JSON",
    },
    body: JSON.stringify({
      price:updatedPlant.price,
    })
  })
    .then((r)=> r.json())
    .then((updatedPlantFromServer)=>{
      setPlants((prevPlants)=>
        prevPlants.map((plant)=>
          plant.id === updatedPlantFromServer.id
            ? { ...plant, price: updatedPlantFromServer.price}: plant))
    })
 }
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearchPlant}/>
      <PlantList plants={filteredPlants}
                 onPriceUpdate={handlePriceUpdate}/>
    </main>
  );
}

export default PlantPage;
