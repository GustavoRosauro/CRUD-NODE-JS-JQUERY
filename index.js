const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cadastro'    
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Db connection succeded');
    }else{
        console.log('error' +JSON.stringify(err,undefined,2));
    }
});

app.listen(3000,()=>console.log('Express is running at port 3000'));

app.get('/pessoa',(req,res)=>{
    mysqlConnection.query('SELECT * FROM PESSOA',(err,rows,fields)=>{
     if(!err){
         res.send(rows);
     }else{
         console.log(err)
     }   
    })
});

app.get('/pessoa/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM PESSOA WHERE Id = ?',[req.params.id],(err,rows,fields)=>{
     if(!err){
         res.send(rows);
     }else{
         console.log(err)
     }   
    })
});

app.get('/delete/pessoa/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM PESSOA WHERE Id = ?',[req.params.id],(err,rows,fields)=>{
     if(!err){
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./teste.html',null,(err,data)=>{
        if(err){
          res.writeHead(404);
          res.write('Pagina não encontrada');
        }else{
            res.write(data);
        }
        res.end();  
    });
     }else{
         console.log(err)
     }   
    })
});
app.get('/inserir/pessoa/:nome',(req,res)=>{
    mysqlConnection.query('INSERT INTO PESSOA (nome) VALUES (?)',[req.params.nome],(err,rows,fields)=>{
     if(!err){
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./teste.html',null,(err,data)=>{
        if(err){
          res.writeHead(404);
          res.write('Pagina não encontrada');
        }else{
            res.write(data);
        }
        res.end();  
    });
     }else{
         console.log(err)
     }   
    })
});
app.get('/Atualizar/pessoa/:nome&:id',(req,res)=>{
    mysqlConnection.query('UPDATE PESSOA SET nome = ? WHERE Id = ?',[req.params.nome, req.params.id],(err,rows,fields)=>{
     if(!err){
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./teste.html',null,(err,data)=>{
        if(err){
          res.writeHead(404);
          res.write('Pagina não encontrada');
        }else{
            res.write(data);
        }
        res.end();  
    });
     }else{
         console.log(err)
     }   
    })
});
app.get('/',(req,res)=>{
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./teste.html',null,(err,data)=>{
        if(err){
          res.writeHead(404);
          res.write('Pagina não encontrada');
        }else{
            res.write(data);
        }
        res.end();
    });
})

