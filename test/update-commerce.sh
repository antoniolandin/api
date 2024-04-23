#!/bin/bash
# Description: Comprobar la funcionalidad que actualizar un comercico
# Author: Antonio Cabrera

API_URL="http://localhost:3000/api/commerces"
CIF="12345678A"

curl -X PUT $API_URL/$CIF -H "Content-Type: application/json" -d '{
  "name": "Comercio 1",
  "CIF": "12345678A",
  "address": "Calle 1",
  "phone": "123456789",
  "email": "johndoe@proton.me",
  "id": 0
}'
