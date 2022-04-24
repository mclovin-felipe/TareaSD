
const Buscar = () =>{
(async () =>{
    const client = createClient();
    client.on('error', (err)=>{console.log('Error de Redis', err)})
    await client.connect();
    await client.set('key', 'value');
    const value = await client.get('key');
})();
}
export default Buscar;