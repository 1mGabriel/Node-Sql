//Para editar algum dado temos antesd alguns preparos a realzar
//Primeiramente vamos rsgatar o dado, GET
//Normalmente preenchemos omformulario de dados com os dados que foram resgatados(SELECT)
//Isso faz com que o usuario lembre dos dados cadstrados e possa escolher o que editar:

//Para concluir esta etapa precusamos criar uma nova rota como POST
//Isso porque o navegador só consegue interpretar dois verbos atualm,ente (GET ou POST)
//E então faremos uma query de UPDATE para processar a atualização
//Note que precisamos passar o id do livro neste formulario tembem


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





// Comando para atualizar os dados ja existente no banco, necessario ter acesso ao ID do dado
app.post("/books/updatebook", (req,res)=>{

    const id = req.body.id
    const title = req.body.title
    const page = req.body.page

    const query = `UPDATE books SET title = "${title}", page = "${page}" WHERE id = ${id}`

    conn.query(query, (err)=>{
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
    conn.query(query, (err, data)=>{
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

app.listen(3000, ()=>{
    console.log("Servidor rodando")
})