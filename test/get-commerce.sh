#!/bin/bash
# Description: Obtener la lista de los comercios de varias formas
# Author: Antonio Cabrera

API_URL="http://localhost:3000/api/commerces"
CIF="12345678A"
with_cif=$1

# Comprobar si se ha pasado el parametro with_cif
if [ -z "$with_cif" ]; then
  echo "No se ha pasado el parametro with_cif"
  exit 1
fi

# Comprobar si el with_cif es un booleano
if [ "$with_cif" != "true" ] && [ "$with_cif" != "false" ]; then
  echo "El parametro with_cif debe ser un booleano"
  exit 1
fi

if [ "$with_cif" == "true" ]; then
  API_URL="$API_URL/$CIF"
else
  API_URL="$API_URL"
fi

# Obtener la lista de los comercios
curl -X GET $API_URL
