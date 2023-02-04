const express = require('express') // on recupere express dans notre code depuis node module
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
//const {succes, getUniqueId} = require('./helper.js') //devenu itutile
//let recettes = require('./mock-recettes')
const app= express() // on cree instance de express
const port = 3000

app
    .use(favicon(__dirname+'/favicon.ico'))
    .use (morgan('dev')) 
    .use(bodyParser.json())   

sequelize.initDb()

//Ici futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//On ajoute la gestion des erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée : vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () =>console.log(`Notre application Node est demarrée sur : http://localhost:${port}`))

















/*
sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

app.get('/',(req, res) => res.send('Hello, Express ✨')) //

app.get('/api/pokemons/:id',(req, res)=> {
    const id = parseInt(req.params.id)
    const pokemon= pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokémon a bien été trouvé."
    res.json(succes(message,pokemon))
})

app.get('/api/pokemons',(req, res) => {
    const message =`Il y a ${pokemons.length} pokemon dans le pokédex pour le moment`
    res.json(succes(message,pokemons))
})

app.post('/api/pokemons',(req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(succes(message,pokemonCreated))
})

app.put('/api/pokemons/:id',(req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: id } 
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`
    res.json(succes(message,pokemonUpdated))
})

app.delete('/api/pokemons/:id',(req, res) =>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons=pokemons.filter( pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(succes(message,pokemonDeleted))
})
*/

/*
app.use((req,res,next) => {
    console.log(`URL: ${req.url}`)
    next()
}) // renvoie l'url des requetes entrantes : pratique pour debuguer a la main remplacée par morgan
*/

/*
app.get('/api/recette/:id/:name',(req, res)=> {
    const id = req.params.id
    const name= req.params.name
    
    res.send(`Recette de la page n°${id} : ${name}.`)
})
*/