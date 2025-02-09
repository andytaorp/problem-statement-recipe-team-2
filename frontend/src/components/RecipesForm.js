import { useState, useContext } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"; 
import { RecipeContext } from '../context/RecipeContext';

const RecipeForm = () => {

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState('easy'); // Set default difficulty to "easy"
  const [prepTime, setprepTime] = useState('');
  const [error, setError] = useState(null);

  const { user } = useAuthContext(); 
  const { dispatch } = useContext(RecipeContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = { name, ingredients, instructions, prepTime, difficulty };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Unable to add recipe');
      }

      const json = await response.json();
      console.log(json);

      dispatch({
        type: 'CREATE_RECIPE',
        payload: json, 
      });

      setName('');
      setIngredients('');
      setInstructions('');
      setprepTime('');
      setDifficulty('easy'); 
      setError(null); 

    } catch (err) {
      setError(err.message); 
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
      <input 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        required 
      />

      <label>Cooking Instructions:</label>
      <input 
        value={instructions} 
        onChange={(e) => setInstructions(e.target.value)} 
        required 
      />

      <label>Preparation Time (mins):</label>
      <input 
        type="number" 
        value={prepTime} 
        onChange={(e) => setprepTime(e.target.value)} 
        required 
      />

      <label>Difficulty Level:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br/>
      <br/>
      <button type="submit">Add Recipe</button>

      {error && <p className="error">{error}</p>} 
    </form>
  );
};

export default RecipeForm;
