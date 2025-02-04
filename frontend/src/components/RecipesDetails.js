import { useRecipeContext } from "../hooks/useRecipeContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

function RecipeDetails({ recipe }) {
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/recipe/${recipe._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: json });
    }
  };
  return (
    <div className="recipe-details">
      <h4>{recipe.title}</h4>
      <p>
        <strong>Ingredients: </strong>
        {recipe.ingredients}
      </p>
      <p>
        <strong>Steps: </strong>
        {recipe.steps}
      </p>
      <p>
        {formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default RecipeDetails;