const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "0123456789"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


function auth(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ')
        var token = bearer[1]
        
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401)
                res.json({err: "Token inválido"})
            }else{
                
                req.token = token
                req.loggedUser = {id: data.id,email: data.email}
                next()
            }
        })
    }else{
        res.status(401)
        res.json("Token inválido")
    }
    
} 

var DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty",
            year: 2010,
            price: 50
        },
        {
            id: 17,
            title: "GTA V",
            year: 2013,
            price: 200
        },
        {
            id: 5,
            title: "GOD OF WAR",
            year: 2004,
            price: 10
        }
    ],
    users:  [ 
        {
        id: 1,
        name: "Paulo",
        email: "paulo@teste.com",
        password: "teste"
        },
        {
        id: 2,
        name: "Alexandre",
        email: "alexandre@teste.com",
        password: "teste2"
        }
    ]  
}

app.get("/games", auth, (req, res) => {
    res.statusCode = 200
    res.json( DB.games)
})

app.get("/game/:id", (req,res) =>  {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else {
            res.sendStatus(404)
        }
    }
})

app.post("/game", auth,(req, res) => {
    var {title, price, year} = req.body

    DB.games.push({
        id: 75,
        title,
        price,
        year
    })

    res.sendStatus(200)
})

app.delete("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else {
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1) {
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }
    }
})

app.put("/game/:id", (req, res) => {
     if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)

        if(game != undefined) {

            var {title, price, year} = req.body

            if(title != undefined) {
                game.title = title;
            }
            if(price != undefined) {
                game.price = price;
            }
            if(year != undefined) {
                game.year = year;
            }

            res.sendStatus(200)
        }else{
            res.sendStatus(404);
        }
    }   
})

app.post("/auth",(req,res) => {
    
    var {email, password} = req.body

    if(email != undefined) {
       var user = DB.users.find(u => u.email == email)

       if(user != undefined){
            if(user.password == password) {

                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400)
                        res.json({err:"falha interna"})
                    }else{
                        res.status(200)
                        res.json({token: token})
                    }
                })

            }else{
                res.status(401)
                res.json({err: "Senha inválida"})
            }
       }else { 
           res.status(404)
           res.json({err: "email inválido"})
       }
    }else {
        res.status (400)
        res.json({err: "email inválido"})
    }
})

app.listen(8080,() => {
    console.log("API RODANDO")
})