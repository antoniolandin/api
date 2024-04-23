#!/bin/bash
# Description: probar la funcionalidad de eliminar un comercio
# Author: Antonio Cabrera

API_URL="http://localhost:3000/api/commerces"
COMMERCE_CIF="12345678A"
logical=$1

if [ -z "$logical" ]; then
  echo "Usage: $0 <logical>"
  exit 1
fi

if [ "$logical" != "true" ] && [ "$logical" != "false" ]; then
  echo "Logical must be true or false"
  exit 1
fi

curl -X DELETE "$API_URL/$COMMERCE_CIF?logical=$logical"
