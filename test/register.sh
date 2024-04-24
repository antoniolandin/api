#!/bin/bash
# Description: Probar la creación de un usuario mediante la API de express
# Author: Antonio Cabrera

# Colores para el script
green="\e[0;32m\033[1m"
end="\033[0m\e[0m"
red="\e[0;31m\033[1m"
blue="\e[0;34m\033[1m"
yellow="\e[0;33m\033[1m"
purple="\e[0;35m\033[1m"
turquoise="\e[0;36m\033[1m"
gray="\e[0;37m\033[1m"

# Obtenemos el archivo JSON de usuarios
path=$(dirname $0)
archivo_json="$path/users.json"

# Si no existe el archivo, paramos el script
if [ ! -f $archivo_json ]; then
    echo "${red}No existe el archivo${end} ${yellow}$archivo_json${end}\n"
    exit 1
fi

# URL de la API
API_URL="http://localhost:3000/api/auth/register"

# Comprobamos si el servidor está activo
curl -s $API_URL &> /dev/null

# Si no está activo, paramos el script
if [ $? -ne 0 ]; then
    echo -e "${red}El servidor no está activo${end}\n"
    exit 1
fi

# Mostramos el mensaje de inicio
echo -e "${purple}Iniciando test de registro de usuarios${end}\n"
echo -e "${blue}API URL:${end} ${yellow}$API_URL${end}\n"

# Leemos el archivo JSON y lo recorremos
jq -c '.[]' $archivo_json | while read i; do
    echo -e "${blue}Creando usuario:${end} ${yellow}$i${end}"
    
    echo -e "${blue}Respuesta de la API:${end}"
    
    # Creamos el usuario mediante la petición POST a la API
    respuesta=$(curl -s -i -X POST -H "Content-Type: application/json" -d "$i" $API_URL | sed $'s/[^[:print:]\t]//g')

    codigo=$(echo $respuesta | grep -oP '^HTTP/1\.1 \K[0-9]+')
    mensaje=$(echo $respuesta | grep -oP '{.*}')

    # Mostramos la respuesta de la API 
    if [ $codigo -eq 200 ]; then
        echo -e "${green}Usuario creado correctamente${end}"
    else
        echo -e "${red}Error al crear el usuario: Error $codigo ${end}"
    fi

    echo -e "${turquoise}Mensaje: $mensaje${end}\n"
done
