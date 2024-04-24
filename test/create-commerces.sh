#!/bin/bash
# Description: Rellenar la base de datos con comercios
# Author: Antonio Cabrera

path=$(dirname $0)
archivo_json="$path/commerces.json"

# Si no existe, paramos el script
if [ ! -f $archivo_json ]; then
    echo "No existe el archivo $archivo_json"
    exit 1
fi

API_URL="http://localhost:3000/api/commerces"

# Leemos el archivo json y lo recorremos
jq -c '.[]' $archivo_json | while read i; do
    # Hacemos la petición POST a la API
    curl -X POST -H "Content-Type: application/json" -d "$i" $API_URL
done
