import { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import { useAuthContext } from '../hooks/useAuthContext';


const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/recipe/' + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: json });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const updatedRecipe = { title, ingredients, instructions };

    const response = await fetch('/api/recipe/' + recipe._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedRecipe)
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_RECIPE', payload: json });
      setIsEditing(false);
    }
  };

  return (
    <div className="recipe-details">
     {isEditing ? (
  <form onSubmit={handleEdit}>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="text"
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
    />
    <input
      type="text"
      value={instructions}
      onChange={(e) => setInstructions(e.target.value)}
    />
    <button type="submit">Save</button>
    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
  </form>
) : (
  <>
    <h4>{recipe.title}</h4>
    <p><strong>Ingredients: </strong>{recipe.ingredients}</p>
    <p><strong>Instructions: </strong>{recipe.instructions}</p>
    <span className="delete-icon" onClick={handleClick}>×</span>
    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Recipe</button>
  </>
)}
    </div>
  );
};

export default RecipeDetails;
