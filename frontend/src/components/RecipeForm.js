import { useState } from 'react';

const RecipeForm = () => {
  // States for form inputs
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [preptime, setPreptime] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = { name, ingredients, instructions, preptime, level };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Unable to add recipe');
      }

      const json = await response.json();
      console.log(json); 
      
      // Reset form after successful submission
      setName('');
      setIngredients('');
      setInstructions('');
      setPreptime('');
      setLevel('');
      setError(null); // Reset error
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <label>Recipe Name:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />

      <label>Ingredients:</label>
      <textarea 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        required 
      />

      <label>Cooking Instructions:</label>
      <textarea 
        value={instructions} 
        onChange={(e) => setInstructions(e.target.value)} 
        required 
      />

      <label>Preparation Time (mins):</label>
      <input 
        type="number" 
        value={preptime} 
        onChange={(e) => setPreptime(e.target.value)} 
        required 
      />

      <label>Difficulty Level:</label>
      <select value={level} onChange={(e) => setLevel(e.target.value)} required>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button type="submit">Add Recipe</button>

      {error && <p className="error">{error}</p>} 
    </form>
  );
};

export default RecipeForm;
