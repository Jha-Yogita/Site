import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./TodoList.css";

const API_BASE = "https://site-lvex.onrender.com/api/todo";

const TodoList = ({ title, listName, done }) => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/${listName}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, [listName]);

  const handleAdd = async () => {
    if (inputValue.trim() !== "") {
      try {
        const res = await fetch(`${API_BASE}/${listName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputValue.trim() }),
        });
        const newItem = await res.json();
        setItems([...items, newItem]);
        setInputValue("");
      } catch (err) {
        console.error("Error adding todo:", err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleCheckboxChange = async (index) => {
    const updatedItem = items[index];
    try {
      const res = await fetch(`${API_BASE}/${updatedItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !updatedItem.done }),
      });
      const updated = await res.json();
      const updatedList = [...items];
      updatedList[index] = updated;
      setItems(updatedList);

      if (updated.done) {
        createConfetti(index);
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const createConfetti = (index) => {
    const item = document.getElementById(`todo-${index}`);
    if (item) {
      const emojis = ['🎉', '✨', '🌸', '💜', '🎊', '💖', '🌟'];
      for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${i * 0.1}s`;
        item.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 1000);
      }
    }
  };

  return (
    <motion.div
      className={`todo-container ${done ? "done" : "todo"}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          {done ? "✅" : "📝"}
        </motion.span>{" "}
        {title}
      </h2>

      <ul>
        {items.map((item, index) => (
          <motion.li
            key={item._id}
            id={`todo-${index}`}
            className={item.done ? "done" : ""}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={item.done}
              onChange={() => handleCheckboxChange(index)}
            />
            <span>{item.text}</span>
            <motion.button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ❌
            </motion.button>
          </motion.li>
        ))}
      </ul>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add more..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TodoList;
