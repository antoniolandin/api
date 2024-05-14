const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4024)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos una web de prueba
const testCommerce = {
    "name": "test-get-commerce",
    "CIF": "Z34346678",
    "address": "Calle Test, 1",
    "email": "test-commerce@proton.me",
    "phone": "123456789"
}

// Definimos una variable para guardar el id del comercio creado y poder hacer la petición GET con la ruta /api/merchants/:id
let id

describe('GET /api/merchants/:id', () => {

    // Registrar un comercio de prueba
    describe('Registrar un comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .send(testCommerce)

            expect(response.status).toBe(201)

            id = response.body.commerce.id
        })
    })

    describe('Mostramos un comercio con id específica', () => {
        it('Debería mostrar el comercio anteriormente creado', async () => {
            const response = await request(app)
                .get('/api/merchants/' + id)

            // Comprobamos que la petición ha sido exitosa
            expect(response.status).toBe(200)

            // Comprobamos que el comercio devuelto es el correcto
            expect(response.body.CIF).toBe(testCommerce.CIF)
        })
    })
})
