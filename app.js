const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

let storage = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/guide', function (req,res){
    res.send(storage);
});

app.get('/guide/:id', function (req,res){
    const id = req.params.id;
    const item = storage[id];
    if (item===null|| id>=storage.length) {
        res.sendStatus(404);
    } else res.send(storage[id]);

});

app.post('/guide',(req,res)=>{
    const newid = storage.push(req.body)-1;
    res.send(newid.toString());
});

app.put('/guide/:id',(req,res) =>{
    const id = req.params.id;
    storage[id] = req.body;
    res.send(id.toString());
});

app.delete('/guide/:id', (req,res) =>{
    const id = req.params.id;
    storage[id] = null;
    res.send(id.toString()  );
});

app.listen(8080,function(){console.log('Server started')});