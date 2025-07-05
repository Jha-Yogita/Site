import React, { useState, useEffect } from "react";
import "./WithVarsha.css";

const API_BASE = "https://site-lvex.onrender.com/api/varsha";

const WithVarsha = () => {
  const [people, setPeople] = useState([]);
  const [currentPerson, setCurrentPerson] = useState("");
  const [allLists, setAllLists] = useState({});
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const res = await fetch(API_BASE);
    const { people, tasks } = await res.json(); // ✅ Destructure properly

    const grouped = {};
    tasks.forEach(item => {
      if (!grouped[item.person]) grouped[item.person] = [];
      grouped[item.person].push({ id: item._id, text: item.text });
    });

    setPeople(people);
    setAllLists(grouped);
    if (people.length > 0) {
      setCurrentPerson(people[0]);
    }
  } catch (err) {
    console.error("Error loading:", err);
  }
};


  const handleAddPerson = async () => {
    const name = prompt("Enter the new person's name:");
    if (!name) return;

    try {
      const response = await fetch(`${API_BASE}/person`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || "Failed to add person");
        return;
      }

      await fetchData();
      setCurrentPerson(name);
    } catch (err) {
      console.error("Error adding person:", err);
      alert("Failed to add person");
    }
  };

  const handleAddThing = async () => {
    if (inputValue.trim() === "" || !currentPerson) return;

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputValue.trim(),
          person: currentPerson
        })
      });

      const saved = await response.json();
      const updated = {
        ...allLists,
        [currentPerson]: [...(allLists[currentPerson] || []), { id: saved._id, text: saved.text }]
      };
      setAllLists(updated);
      setInputValue("");
    } catch (err) {
      console.error("Error adding:", err);
      alert("Failed to add item");
    }
  };

  const handleDeleteThing = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const updated = {
        ...allLists,
        [currentPerson]: allLists[currentPerson].filter(item => item.id !== id)
      };
      setAllLists(updated);
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="with-varsha-container">
      <h2>🌸 Things to Do With {currentPerson || "..."}</h2>
      <div className="person-selector">
        <select
          value={currentPerson}
          onChange={e => setCurrentPerson(e.target.value)}
        >
          {people.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button onClick={handleAddPerson}>+ Add Person</button>
      </div>

      <ul>
        {(allLists[currentPerson] || []).map(thing => (
          <li key={thing.id}>
            {thing.text}
            <button
              className="delete-btn"
              onClick={() => handleDeleteThing(thing.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="input-section">
        <input
          type="text"
          placeholder={`Add a thing with ${currentPerson}...`}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleAddThing()}
        />
        <button onClick={handleAddThing}>Add</button>
      </div>
    </div>
  );
};

export default WithVarsha;
