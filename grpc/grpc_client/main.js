const express = require("express");
const cors = require("cors");
const client = require("../../grpc_client");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/items", async (req, res) => {
  const item = req.query.name;
  if (item) {
    client.GetItem({name: item}, (error, items) => {
	    console.log(items);
        if (error){
            console.log(error);
            res.json({});
        } res.json(items);
    })
  }
});

app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});
