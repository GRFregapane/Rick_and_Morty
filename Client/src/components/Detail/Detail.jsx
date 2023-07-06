import axios from 'axios'; 
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 


const Detail = () => {
    const { id } = useParams(); 
    const [character, setCharacter] = useState({}); 


    useEffect(() => {
        axios(`https://localhost:3001/rickandmorty/character/${id}`)
        .then(response => response.data) 
        .then((data) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        //return setCharacter({});
     }, [id]);  
     
    return(
        <div>
           <h3>Id: {id}</h3>
           <h1>{character?.name}</h1>
           <h2>{character?.status}</h2>
           <h2>{character?.species}</h2>
           <h2>{character?.gender}</h2>
           <h2>{character?.origin?.name}</h2>
           <img src={character?.image} alt={character?.name} />
        </div>
    )
}

export default Detail;