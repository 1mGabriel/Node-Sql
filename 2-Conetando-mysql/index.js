const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql") //Importação do modulo do MYSQL

const app = express()

app.engine('handlebars', exphbs.engine()) 
app.set("view engine", "handlebars") 

app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("home")
})

// Criando a conexão com banco de dados
const conn = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'',
    database: 'nodemysql2'
})


// Executando a conexão!
conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("Conectou ao MYSQL")
})