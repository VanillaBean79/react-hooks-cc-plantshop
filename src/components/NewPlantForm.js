import React, { useState } from "react";

function NewPlantForm() {
  const [formData, setFormData] = useState({
    name:"",
    image:"",
    price:"",
  })

  const handleChange = (e)=>{
    // console.log(formData)
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
     
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price)
    }
    // console.log("JAM!")
  

  fetch("http://localhost:6001/plants", {
    method:"POST",
    headers: {
      "Content-Type": "Application/JSON"
    },
    body: JSON.stringify(newPlant)
  })
    .then((r)=> r.json())
    .then((addedPlant)=>{
      // onAddPlant(addedPlant)
      setFormData(formData)
      console.log(addedPlant)
    })
    
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />
        <button type="submit" >Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
