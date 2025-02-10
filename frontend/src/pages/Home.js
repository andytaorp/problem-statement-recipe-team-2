import { useEffect } from "react";
import { useRecipeContext } from "../hooks/useRecipeContext";
import { useAuthContext } from "../hooks/useAuthContext";

import RecipeDetails from "../components/RecipesDetails";
import RecipeForm from "../components/RecipesForm";

const Home = () => {
    const { recipes, dispatch } = useRecipeContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!user) {
                console.log("No user logged in, skipping recipe fetch");
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/recipes`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                const json = await response.json();
                console.log("API response:", json);

                if (response.ok) {
                    dispatch({ type: "SET_RECIPES", payload: json });
                } else {
                    console.error(
                        "Error fetching recipes:",
                        json.error || "Unknown error"
                    );
                }
            } catch (err) {
                console.error("Error fetching recipes:", err.message);
            }
        };

        fetchRecipes();
    }, [dispatch, user]);

    console.log("Recipes state:", recipes);

    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <RecipeDetails key={recipe._id} recipe={recipe} />
                    ))
                ) : (
                    <p>
                        There are no recipes available yet. Please add some
                        recipes!
                    </p>
                )}
            </div>
            <RecipeForm />
        </div>
    );
};

export default Home;
