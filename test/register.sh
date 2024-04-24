#!/bin/bash
# Description: Probar la creación de un usuario mediante la API de express
# Author: Antonio Cabrera

path=$(dirname $0)
archivo_json="$path/users.json"

# Si no existe el archivo, paramos el script
if [ ! -f $archivo_json ]; then
    echo "No existe el archivo $archivo_json"
    exit 1
fi

API_URL="http://localhost:3000/api/auth/register"

# Leemos el archivo JSON y lo recorremos
jq -c '.[]' $archivo_json | while read i; do
    # Creamos el usuario mediante la petición POST a la API
    curl -X POST -H "Content-Type: application/json" -d "$i" $API_URL
done
