const express = require('express');
const cors = require('cors');
const app = express();
const redis = require('redis');
const { ClientClosedError } = require('redis');
const assert = require('assert');


//--------------

const client_proto = require("./grpc_client");
const cli = require('nodemon/lib/cli');

//--------------




const asserteq= assert.equal;
app.use(cors());
//
//REDIS CONFIG

const Buscar = (key, res) =>{
(async () =>{
    const client = redis.createClient();
    
    
    client.on('error', (err)=>{console.log('Error de Redis', err)})
    await client.connect();
    
    const llave = await client.KEYS(`*${key}*`);
    console.log(llave);
    
    if (llave.length>0){
        (async () =>{
            console.log("Esta en cache");
        
        let respuesta = `[`;
        let i = 0;
        while (i<llave.length) {
            
            
            const value = await client.get(llave[i]);
           
            if(i+1===llave.length){
                respuesta+=`${value}`;
            }else{
                respuesta+=`${value},`;
            }

            //respuesta.push(JSON.stringify(value));
            i++
        }
        respuesta+="]";
        res.send(`<div>
                <h2>Desde CACHE</h2>
                ${JSON.parse(JSON.stringify(respuesta)) }
            </div>`)
        })();
        
        //res.json(JSON.parse(respuesta));
        //res.json(resp);
    }else{
        console.log("No esta")
        //GRPC
    
        client_proto.GetItem({name: key}, (error, items) => {
          if (error){
              console.log(error);
              res.json({"Error":0});
          } 

          if(items.items.length>0){
              (async ()=>{
                console.log(items.items);
              const datos = items.items;
              let  i = 0;
              while (i<datos.length) {
                  
                const insert = await client.set(datos[i].name, JSON.stringify(datos[i]));
                i++
              }
              
              })();
              res.send(`<div>
                <h2>Desde RPC</h2>
                ${JSON.stringify(items.items)}
            </div>`)
          }
          
      })
    
        
    }

})();
}
app.get('/',(req, res)=>{
    res.send(`<h2>holap</h2>`);
})


app.get("/items", async (req, res) => {
//REDIS
    
    Buscar(req.query['name'], res);

    
  });

app.get('/inventory/search',(req, res)=>{
    console.log(req.query);
    Buscar(req.query['key']);
    res.json(req.query);
})
app.get('/push', (req,res)=>{
    (async () =>{
        const client = redis.createClient();
    
    
    client.on('error', (err)=>{console.log('Error de Redis', err)})
    await client.connect();
    const valores = await client.KEYS('*');
    const eliminar = await client.flushAll();
    // const datos = await client.get(valores);
    res.json(valores.length);
    
    })();
})
app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000');
})