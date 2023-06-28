const axios = require('axios');

const getCharById = (res, id) => {
     axios(`https://rickandmortyapi.com/api/character/${id}`)
     .then(response => response.data)
     .then(({name, gender, species, origin, image, status}) => { //destructuring de data, el id lo recibimos por parámetro.
        const character = {
            id,
            name,
            gender,
            species,
            origin,
            image,
            status
        }

        return res
                 .writeHead(200, {"Content-type": "application/json"})
                 .end(JSON.stringify(character))
     })
     .catch(error => {
        return res
                 .writeHead(500, {"Content-type": "text/plain"})
                 .end(error.message)
     })
}


module.exports = {
    getCharById
};