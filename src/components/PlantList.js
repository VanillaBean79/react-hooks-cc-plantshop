import React,{useState, useEffect} from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  const [plantList, setPlantList] = useState([])

  useEffect(()=>{
    fetch('http://localhost:6001/plants')
      .then((r)=>r.json())
      .then(data => setPlantList(data))
  },[])

  
 
  return (
    <ul className="cards">
      {plantList.map((plant)=>(
        <PlantCard key={plant.id} plant={plant}
                   
        />
      ))}
    </ul>
  );
}

export default PlantList;
