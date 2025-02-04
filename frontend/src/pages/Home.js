import { useEffect }from 'react'
import { useRecipeContext } from "../hooks/useRecipeContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipeDetails from '../components/RecipesDetails'
import RecipeForm from '../components/RecipesForm'

const Home = () => {
  const {recipes, dispatch} = useRecipeContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPES', payload: json})
      }
    }

    if (user) {
      fetchRecipes()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="recipes">
        {recipes && recipes.map((recipe) => (
          <RecipeDetails key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home