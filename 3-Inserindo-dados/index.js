//Para inserir dados no banco vamos precisar criar e executar m query;
//A query em si é uam string, seguindo os padrões do MySQL
//Já para executar vamos utilizar o metodo query do pacote mysql;
//E nesta aula faremos o uso da instrução INSERT, que insere dados


const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql") //Importação do modulo do MYSQL

const app = express()

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine()) 
app.set("view engine", "handlebars") 

app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("home")
    
})


// Fazendo o POST no banco de Dados
app.post('/books/insertbooks', (req,res)=>{

    // Associando as variaveis ao valores do INPUT
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    // Criando a query SQL
    const query = `INSERT INTO books (title, page) VALUES ('${title}', '${pagesqty}')`

    conn.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/")
        console.log("Novo livro adicionado ao banco de dados")
    })
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

app.listen(3000, ()=>{
    console.log("Servidor rodando")
})