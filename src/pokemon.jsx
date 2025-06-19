import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./pokemonCards";
export const Pokemon = () =>{

    const [pokemon,setPokemon] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=120";

    const fetchPokemon = async() =>{
        try{
            const res = await fetch(API);
            const data = await res.json()
            // console.log(data);
            const detailsPokemonData = data.results.map( async(currElements)=>{
                // console.log(currElements.url);
                const res = await fetch(currElements.url);
                const data = await res.json()
                return data;
            })
            console.log(detailsPokemonData);

            const detailsResponse = await Promise.all(detailsPokemonData);

            console.log(detailsResponse);
            setPokemon(detailsResponse);
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    if(loading){
        return(
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>
                    error:{error.message}
                </h1>
            </div>
        )
    }


    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>

                <div>
                    <ul className="cards">
                        {
                            pokemon.map((curPokemon)=>{
                                return(
                                    <PokemonCards key = {curPokemon.id} pokemonData = {curPokemon}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}