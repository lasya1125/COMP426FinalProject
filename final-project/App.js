import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Recipe from './Recipe';


const App = () => {
    const API_ID = '37ec03f1'
    const API_KEY = '2083bb6ed4fb63408c27d6714fba7ae6'

    const [recipe, setRecipe] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('chicken')

    useEffect(() => {
        getRecipe()
    }, [query])

    const getRecipe = () => {
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)
            .then(response => setRecipe(response.data.hits))
    }

    const getSearch = (event) => {
        setSearch(event.target.value)
    }

    const updateChange = (event) => {
        event.preventDefault()
        setQuery(search)
        setSearch('')
    }

    return ( 
        <div className = "App" >
        <form onSubmit = { updateChange }>
        <input type = "text" value = { search } onChange = { getSearch} /> 
        <button type = "submit" >
            Search 
        </button> 
        </form > 
            {recipe.map(e => ( 
                <Recipe key = {e.recipe.label} title = { e.recipe.label } calories = { e.recipe.calories } image = { e.recipe.image } />
            ))} 
            </div>
    );
}

export default App;