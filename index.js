const express = require('express');
const cors = require('cors');
const app = express();
const redis = require('redis');
const { ClientClosedError } = require('redis');
const assert = require('assert');
const { resolve } = require('path');
const asserteq= assert.equal;
app.use(cors());
//
//REDIS CONFIG
const getDato = async (client, llave) =>{
    
    dato = await client.get(llave);
    return dato;
}
const Buscar = (key) =>{
(async () =>{
    // const client = redis.createClient({});
    
    
    client.on('error', (err)=>{console.log('Error de Redis', err)})
    await client.connect();
    // await client.set('nada', 'value');
    // await client.set('nada12421', 'value');
    // await client.set('hola', 'value');
    const value = await client.KEYS(`*${key}*`);
    if (value.length === 0){
        await client.set(key, 'dato');
    }else{
        let valores = [];
        value.map(llave =>{
            getDato(client, llave).then(valor => console.log(valor));
        })
        
    }
//   const resultado = await client.MGET(value.toString());
    // const usado = await client.MEMORY_STATS();
    const total = await client.KEYS('*');
    console.log(total);
})();
}
//
app.get('/',(req, res)=>{
    res.send(req.query['key']);

    Buscar(req.query['key']);
    console.log('Okasdjkbsa');
})
app.get('/inventory/search',(req, res)=>{
    console.log(req.query);
    Buscar(req.query['key']);
    res.json(req.query);
})
app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000');
})