const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4032)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Comercio de prueba
const testCommerce = {
    "name": "Eliminame",
    "CIF": "N12345672",
    "address": "Calle Falsa 123",
    "email": "eliminame@proton.me",
    "phone": "123456789"
}

// Variable para almacenar el id del comercio de prueba, para poder eliminarlo por su id
let id

describe('DELETE /api/merchants/:id', () => {

    // Registrar web de prueba
    describe('Registrar un comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .send(testCommerce)

            expect(response.status).toBe(201)
            
            // Almacenar el id del comercio de prueba
            id = response.body.commerce.id
        })
    })

    describe('Eliminar comercio de prueba', () => {
        it('Debería eliminar un comercio de prueba', async () => {
            const response = await request(app)
                .delete(`/api/merchants/${id}`)

            console.log(response.body)
                
            // Buscar el comercio eliminado por su id
            const commerceId = await request(app)
                .get('/api/merchants/id')
            
            // Comprobar que la respuesta es 200
            expect(response.status).toBe(200)
            
            // Comprobamos que el comercio está vacío
            expect(commerceId.body).toStrictEqual({})
        })
    })

})
