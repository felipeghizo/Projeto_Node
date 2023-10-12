const express = require("express");
const app = express();
const mysql = require("mysql")

const path = require("path"); 
const bodyParser = require("body-parser");

app.listen("3000", ()=>{		  
    console.log("Servidor on!");
})

//Body parser
app.set("view engine", "ejs");      // Tipo de arquivo a ser visualizado na view.
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "node"
});

db.connect(function(err){
    if(err){
        console.log("Não foi possivel efetuar a conexão com o banco de dados.")
    }
    var sql = "SELECT * FROM clientes";
    db.query(sql, function(err, results){
        console.log(results);
    })
})

app.get("/", function(req, res){
    let query = db.query("SELECT * FROM clientes", function(err, results){
        res.render("index",{lista:results});
    });
})
app.post("/registrar", function(req, res){
    console.log("Cadastro realizado com sucesso!");
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let empresa = req.body.empresa;
    db.query("INSERT INTO clientes (nome, sobrenome, empresa) VALUES (?,?,?)", [nome, sobrenome, empresa], function(err, results){});
    res.render("cadastro",{});
    
})
app.get("/registrar", function(req, res){
    res.render("cadastro", {})
})
