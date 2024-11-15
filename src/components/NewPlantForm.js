import React,{useState} from "react";

function NewPlantForm({addPlant}) {
  const[newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: ""
    })

    const handleChange = (e) => {
      const { name, value } = e.target
      setNewPlant({
        ...newPlant,
        [name]: value
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      addPlant(newPlant)
      setNewPlant({ name:"", image:"", price:""})
    }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} 
                onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image}
                onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price}
                onChange={handleChange}/>
        <button type="submit" >Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
