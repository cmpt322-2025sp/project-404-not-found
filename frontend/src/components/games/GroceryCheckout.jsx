import React, { useRef } from "react";
// import groceryCheckout from "../asset/images/GroceryCheckout.png";
import GroceryCheckoutbg from '../../asset/images/GroceryCheckout.png'


const itemData = [
  { name: "Oranges", price: 4 },
  { name: "Apples",  price: 2 },
  { name: "Bananas", price: 3 },
  { name: "Milk",    price: 3 },
  { name: "Bread",   price: 2 },
  { name: "Eggs",    price: 5 },
];

function generateRandomGroceries() {
  const itemCount = Math.floor(Math.random() * 7) + 4;
  const groceries = [];
  for (let i = 0; i < itemCount; i++) {
    const randomIndex = Math.floor(Math.random() * itemData.length);
    const chosenItem = itemData[randomIndex];
    groceries.push({
      id: i + 1,
      name: chosenItem.name,
      price: chosenItem.price,
    });
  }
  return groceries;
}

const GroceryCheckout = () => {
  const groceries = generateRandomGroceries();
  
  const totalRef = useRef(null);

  const actualTotal = groceries.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    const userTotal = parseInt(totalRef.current.value, 10) || 0;
    if (userTotal === actualTotal) {
      alert(`Hooray! You got it right! The total is $${actualTotal}.`);
    } else {
      alert(`Oops! You entered $${userTotal}, but the total is $${actualTotal}. Try again!`);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${GroceryCheckoutbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <div
        style={{
          position: "relative",
          width: "360px",
          minHeight: "520px",
          padding: "1.5rem",
          borderRadius: "16px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          background: `
            repeating-linear-gradient(
              0deg,
              #fff 0px,
              #fff 26px,
              #ffe7e7 26px,
              #ffe7e7 28px
            )
          `,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            color: "#FF5722",
          }}
        >
          Grocery Fun!
        </h2>

        <p style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", color: "#333" }}>
          Add up these groceries to find the total:
        </p>

        <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "1.2rem" }}>
          {groceries.map((item) => (
            <li key={item.id} style={{ marginBottom: "0.5rem", color: "#555" }}>
              <strong>{item.name}</strong> – ${item.price}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "1rem" }}>
          <label style={{ fontSize: "1.1rem", color: "#555" }}>
            <strong>Total: </strong>
            <input
              type="number"
              ref={totalRef}
              defaultValue=""
              style={{
                marginLeft: "0.5rem",
                width: "100px",
                fontSize: "1rem",
                padding: "0.3rem",
                border: "2px solid #FF5722",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </label>
        </div>

        <button
          onClick={handleCheckout}
          style={{
            marginTop: "1.2rem",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            backgroundColor: "#FF5722",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
            transition: "transform 0.1s",
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default GroceryCheckout;
