import React, { useState} from "react";


function PlantCard({ plant, onUpdatePrice}) {
  const [isInStock, setIsInStock] = useState(true)
  const [newPrice, setNewPrice] = useState(plant.price || "")

  const handleToggle = (e)=>{
    setIsInStock((prevIsInStock) => !prevIsInStock)
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(newPrice);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value)
  }

  const handlePriceSubmit = (e) => {
    e.preventDefault()
    
    const parsedPrice = parseFloat(newPrice)
    if (parsedPrice !== plant.price) {
      onUpdatePrice(plant.id, parsedPrice)
    }
  }
  
  return (
    
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {formattedPrice}</p>
      <button className={isInStock ? "primary" : ""} onClick={handleToggle}>
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          value={newPrice}
          onChange={handlePriceChange}
          placeholder="New Price"
          />
          <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
