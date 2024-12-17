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
      .then(plants=> {
        console.log("Fetched data:", plants)
           setPlants(plants)
            console.log("the side effect function just ran")
      })
   },[])

   const filteredPlants = plants.filter((plant) => 
    plant.name && plant.name.toLowerCase().includes(searchPlant.toLowerCase()))
   

   const handleAddPlant = (newPlant)=>{
    setPlants((prevPlants) => [...prevPlants, newPlant])
   }

   const handlePriceUpdate = (id, updatedPlant)=> {
    setPlants((prevPlants)=>
      prevPlants.map((plant)=>
    plant.id === updatedPlant.id ? {...plant, price: updatedPlant.price }
   : plant )
)
  fetch(`http://localhost:6001/plants/${id}`,{
    method:"PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify({
      price:updatedPlant
    })
  })
    .then((r)=> r.json())
    .then()
      setPlants((prevPlants)=>
        prevPlants.map((plant)=>
          plant.id === updatedPlant.id
            ? { ...plant, price: updatedPlant.price, image: updatedPlant.image }
            : plant))
    
 }
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearchPlant}/>
      <PlantList  plants={filteredPlants} onPriceUpdate={handlePriceUpdate} />
    </main>
  );
}

export default PlantPage;
