const express = require('express');
const cors = require('cors');
const app = express();
const redis = require('redis');
const { ClientClosedError } = require('redis');
const assert = require('assert');
const { resolve } = require('path');


app.use(cors());
const client = redis.createClient({
    host: '',
    port: 6379,
});

app.get('/', (req, res)=>{
    client.connect();
    (async ()=>{
        const keys = await client.sendCommand(["keys","*"]);
        console.log(keys);    
    })
    client.quit();
    res.send('ok');
})
app.listen(3000, ()=>{console.log('ok')})