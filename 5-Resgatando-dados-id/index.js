//Resgatando um dados especifico vamos precisar utilizar o WHERE;
//Desta maneira cosneguimos filtrar por uma coluna e um valor
//Poderemos entao achar os livros pelo seus ids


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



//Pegando DADOS através do ID, resgatando um dado unico
app.get('/books/:id', (req,res)=>{

    const id = req.params.id //Pegando o parametro ID da url

    const query = `SELECT * FROM books WHERE id = ${id}` //Query para resgaatar o dado onde o ID for igual o ID da url
    conn.query(query , (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data
        console.log(book)
        res.render('bookId', {book}) 
    })
})

//Fazendo o GET dos dados do BANCO DE DADOS!

app.get('/books', (req,res)=>{
    const query = 'SELECT * FROM books'
    conn.query(query, (err, data)=>{  //Parametros : erro e o resultado da query
        if(err){
            console.log(err)
            return
        }
        console.log("Página dos books")

        const books = data //Definindo o resultado como "books"
        res.render('books', {books})
    })
})


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