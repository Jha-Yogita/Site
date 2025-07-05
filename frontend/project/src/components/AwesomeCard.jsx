import React, { useState, useEffect } from "react";
import "./AwesomeCard.css";

const API_BASE = "https://site-lvex.onrender.com/api/awesome";

const AwesomeCard = () => {
  const [awesomeThings, setAwesomeThings] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // Add this inside your AwesomeSection component
useEffect(() => {
  const emojis = ['🌸', '🦄', '🌈', '🍭', '✨', '💖', '🧁'];
  const section = document.querySelector('.awesome-section');
  
  const createEmoji = () => {
    const emoji = document.createElement('div');
    emoji.className = 'emoji-float';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDuration = `${5 + Math.random() * 5}s`;
    section.appendChild(emoji);
    
    setTimeout(() => {
      emoji.remove();
    }, 6000);
  };
  
  const interval = setInterval(createEmoji, 1000);
  
  return () => clearInterval(interval);
}, []);
  // Fetch awesome things from backend
  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setAwesomeThings(data))
      .catch((err) => console.error("Error fetching awesome things:", err));
  }, []);

  const handleAdd = async () => {
    if (inputValue.trim() !== "") {
      try {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputValue.trim() }),
        });
        const newItem = await res.json();
        setAwesomeThings([...awesomeThings, newItem]);
        setInputValue("");
      } catch (err) {
        console.error("Error adding awesome thing:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setAwesomeThings(awesomeThings.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting awesome thing:", err);
    }
  };

  return (
    <div className="awesome-section">
      <h2>🌸 Things Varsha Is Awesome At 🌸</h2>
      <div className="card-grid">
        {awesomeThings.map((thing) => (
          <div key={thing._id} className="awesome-card">
            <span>{thing.text}</span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(thing._id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add more awesome things..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AwesomeCard;