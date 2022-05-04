const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./example.proto";
const pool = require('./dbConection');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const itemProto = grpc.loadPackageDefinition(packageDefinition);
let items = [];
const server = new grpc.Server();
  server.addService(itemProto.ItemService.service, {
    getItem: (_, callback) => {
      const itemName = _.request.name;
      if(itemName){
          pool.query(`select * from items WHERE name LIKE '%${itemName}%'`, (err, res) => {
          //poolGRPC.query('select * from Items;', (err, res) => {
          items = res.rows;
          if (err) {
          console.log(err.stack);
          callback(err, null);
          } else {
           console.log(items);
          callback(null, { items: items});
          }
        //   const item = items.filter((obj) => obj.name.includes(itemName));
        //  callback(null, { items: item });
        })
      }
    }
  });
  server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) console.log(err);
    else {
      console.log("GRPC SERVER RUN AT http://localhost:50051");
      server.start();
    }
  });
