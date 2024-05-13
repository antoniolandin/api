const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4007)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un comercio de prueba
const testCommerce = {
    name: 'Comercio de prueba',
    CIF: 'Z32345698',
    address: 'Calle de prueba',
    email: 'comercioPrueba@proton.me',
    phone: '666666666'
}

describe('GET /api/users/webpages', () => {

    // Registrar comercio de prueba
    describe('Registrar comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/admin/merchants')
                .send(testCommerce)

            expect(response.status).toBe(201)
        })
    })

    describe('Mostrar todos los comercios', () => {
        it('Debería mostrar todos los comercios', async () => {
            const response = await request(app)
                .get('/api/users/webpages')

            expect(response.status).toBe(200)
        })
    })
})
