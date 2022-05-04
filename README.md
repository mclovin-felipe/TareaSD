# TareaSD
## Integrantes: Vicente Berroeta, Felipe Ponce

### Funcioanmiento
Lamentablemente como grupo no pudimos dockerizar la tarea, por lo cual, solo podra ser smuliado en local, para eso se utilizan los siguoemtes comandos:
Hint: Tener la base de datos proporcionada por los ayudantes.
```bash
# Servidor GRPC
node ./grpc/grpc_server/grpc_server.js

# API REST
node start

# Redis
redis-server --maxmemory 2mb --maxmemory-policy allkeys-lru
or
redis-server --maxmemory 2mb --maxmemory-policy allkeys-lfu
```
| LRU | LFU |
| ------------- | ------------- |
|Descarta los elementos en memoria usados en menor medida recientemente| Se encarga de rastrear la cantidad de veces que se hace referencia a un bloque en memoria.|
| Cada vez que se utilice una línea de caché, todas las líneas de caché cambian su antigüedad.| Cuando el caché está lleno, el sistema borra el elemento con menos frecuencia.|
| Es más costosa, porque requiere verificar la posición de antigüedad de otros, y de la menos utilizada.| Es económico, ya que solo se encarga de verificar la frecuencia, del elemento con menos frecuencia.|

Como equipo elegiremos la LRU, Porque al estar verificando constantemente los datos organizados, nos aseguramos que algunas aplicaciones que tuvieron un alcance de manera espontánea.

## Como buscar
```
http://localhost:3000/items?name=<Palabra a buscar> 

```
