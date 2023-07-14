/*const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 923,
    name: 'Geor',
    species: 'Human',
    gender: 'Frmale',
    status: 'Alive',
    origin: {
        name: 'Earth (C-137)'
    },
    image: 'image.jpg'
};

describe("test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
           const response = await request.get('/rickandmorty/character/1');
           expect(response.statusCode).toBe(200);
        });

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
           const response = await request.get('/rickandmorty/character/1');
           for(const prop in character){
            expect(response.body).toHaveProperty(prop);
           };
        });

        it("Si hay un error responde con status: 500", async () => {
           const response = await request.get('/rickandmorty/character/3209j');
             expect(response.statusCode).toBe(500);
        });
    });


    describe("GET /rickandmorty/login", () => {
        const access = { access: true } ;

        it("Responde con un objeto con la propiedad access en true si la información del usuario es válida", async () =>{
            const response = await request.get('/rickandmorty/login?email=georrf@gmail.com&password=rosario23');
            expect(response.body).toEqual(access);
        });

        it("Responde con un objeto con la propiedad access en false si la información del usuario no es válida", async () => {
            const response = await request.get('/rickandmorty/login?email=georrf@gmail.com&password=rosario23');
            access.access = false;
            expect(response.body).toEqual(access);
        });
    });

    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async () => {
            const response = await request.post('/rickandmorty/fav').send(character);

             expect(response.body).toContainEqual(character);
        });

        it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {
            character.id = 1923;
            character.name = 'FT 39b';
            const response = await request.post('/rickandmorty/fav').send(character);
            expect(response.body.length).toBe(2);
        });
    });

    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el ID solicitado no existe, debería retornar un arreglo con todos los favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/2');
            expect(response.body.length).toBe(2);
        });

        it("Si el ID enviado existe, debería eliminarlo de favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/1923');
            expect(response.body.length).toBe(1);
        });
    });
});*/

const session = require("supertest");
const app = require("../app");

const agent = session(app);

var props;
var favorites;
var character1;
var character2;

// HOOKS JEST (ciclo de vida jest)
beforeEach(() => {
  props = ["id", "name", "species", "gender", "status", "origin", "image"];
  favorites = [];
  character1 = {
    id: 1,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    origin: "unknown",
    image: "https://example.com/image1.jpg",
    gender: "Male",
  };
  character2 = {
    id: 2,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    origin: "Earth (C-137)",
    image: "https://example.com/image2.jpg",
    gender: "Male",
  };
});

describe("Test de Rutas", () => {
  describe(" GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      props.forEach((prop) => {
        expect(response.body).toHaveProperty(prop);
      });
    }, 8000); 
    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/7777").expect(500);
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Valida que, si ejecutas esta ruta pasándole la información de login (email y password) correctas, debes obtener un objeto como este:{access: true;}", async () => {
      const response = await agent
        .get("/rickandmorty/login")
        .query({ email: "eje@gmail.com", password: "@123QWEasd" });
      expect(response.body).toEqual({ access: true });
    });
    it("Testear que en el caso de enviar la información incorrecta la porpiedad access sea false", async () => {
      const response = await agent
        .get("/rickandmorty/login")
        .query({ email: "pepe.com", password: "1234" });
      expect(response.body).toEqual({ access: false });
    });
  });
  describe("POST /rickandmorty/fav", () => {
    it("Lo que envíes por body debe ser devuelto en un arreglo", async () => {
      favorites.push(character1);
      const response = await agent.post("/rickandmorty/fav").send(character1); 
      expect(response.body).toEqual(favorites);
    });
    it("Si vuelves a enviar un nuevo elemento por body, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente", async () => {
      favorites.push(character1, character2);
      const response = await agent.post("/rickandmorty/fav").send(character2);
      expect(response.body).toEqual(favorites);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Primero deberás testear que lo que devuelva esta ruta, en el caso de que no haya ningún personaje con el ID que envías, sea un arreglo con los elementos previos sin modificar", async () => {
      favorites.push(character1, character2);
      await agent.delete("/rickandmorty/fav/8888").expect(200, favorites);
    });
    it("Luego debes testear que cuando envías un ID válido se elimine correctamente al personaje", async () => {
      favorites.push(character1);
      await agent.delete("/rickandmorty/fav/2").expect(200, favorites);
    });
  });
});
/*
Pasos previos realizados
* 01. Cree carpeta test y archivo index.test.js
* 02. Instalar npm i --save-dev jest supertest
* 03. Configurar package.json ->  "test": "jest --detectOpenHandles",
* 04. Correcciones de respuestas según lo esperado en README TESTING (ejemplo: status(500) para los errores)
* 05. Implementar beforeEach para que corra antes de cada test

Recordar que estaremos comparando este favorites con el myFavorites de nuestro servidor
*/