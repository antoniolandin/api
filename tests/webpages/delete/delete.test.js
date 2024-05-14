const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4008)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

const testCommerce = {
    name: 'Eliminame',
    CIF: 'Q22345698',
    address: 'Calle de prueba',
    email: 'comercioPrueba@proton.me',
    phone: '666666666'
}

describe('DELETE /api/webpages/:CIF', () => {

    // Registrar comercio de prueba
    describe('Registrar comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .send(testCommerce)

            expect(response.status).toBe(201)
        })
    })

    describe('Eliminar comercio de prueba', () => {
        it('Debería eliminar un comercio de prueba', async () => {
            const response = await request(app)
                .delete(`/api/webpages/${testCommerce.CIF}`)

            const allCommerces = await request(app)
                .get('/api/webpages')
            
            // Comprobar que la respuesta es 200
            expect(response.status).toBe(200)

            // Comprobar que el CIF del comercio de prueba no está en la lista de comercios
            const CIFs = allCommerces.body.map(commerce => commerce.CIF)
            expect(CIFs).not.toContain(testCommerce.CIF)
        })
    })

})
