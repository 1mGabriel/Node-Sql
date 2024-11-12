//Connection Poll é um recurso para otimizar as conexões, cirando um cache e permitindo sua reutilização
//O driver mysql tem este recurso desenvolvido, podemos aplica´lo
//Este recurso também  controla as conexões abertas, fechando assi, qie se tornam inativas

const express = require("express")
const exphbs = require("express-handlebars")
const pool = require("./db/conn")

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





// Comando para atualizar os dados ja existente no banco, necessario ter acesso ao ID do dado
app.post("/books/updatebook", (req,res)=>{

    const id = req.body.id
    const title = req.body.title
    const page = req.body.page

    const query = `UPDATE books SET title = "${title}", page = "${page}" WHERE id = ${id}`

    pool.query(query, (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect(`/books/${id}`)
    })
})


//Pegando rota para a edição:
app.get("/books/edit/:id", (req,res)=>{
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = ${id}`
    pool.query(query, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const bookData = data[0]
        console.log(bookData)
 
        res.render('editbook', {bookData}) 
    })
})

//Pegando DADOS através do ID, resgatando um dado unico
app.get('/books/:id', (req,res)=>{

    const id = req.params.id //Pegando o parametro ID da url

    const query = `SELECT * FROM books WHERE id = ${id}` //Query para resgaatar o dado onde o ID for igual o ID da url
    pool.query(query , (err, data)=>{
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
    pool.query(query, (err, data)=>{  //Parametros : erro e o resultado da query
        if(err){
            console.log(err)
            return
        }
        console.log("Página dos books")

        const books = data //Definindo o resultado como "books"
        res.render('books', {books})
    })
})





// Fazendo o POST no banco de Dados
app.post('/books/insertbooks', (req,res)=>{

    // Associando as variaveis ao valores do INPUT
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    // Criando a query SQL
    const query = `INSERT INTO books (title, page) VALUES ('${title}', '${pagesqty}')`

    pool.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/")
        console.log("Novo livro adicionado ao banco de dados")
    })
})


// Removendo dados DELETE do banco de dados
app.post('/books/remove/:id', (req,res)=>{
    const id = req.params.id

    const query = `DELETE FROM books WHERE id = ${id}`
    pool.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/")
        console.log("Livro removido")
    })
})

app.get("/", (req,res)=>{
    res.render("home")
    
})

app.listen(3000, ()=>{
    console.log("Servidor rodando")
})