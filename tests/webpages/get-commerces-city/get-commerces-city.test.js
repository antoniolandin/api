const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4006)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un comercio de prueba
const testCommerces = [
    {
        name: 'Comercio de prueba',
        CIF: 'J32345698',
        address: 'Calle de prueba',
        email: 'comercioPrueba@proton.me',
        phone: '666666666',
        city: 'Sevilla',
        scoring: 3
    },
    {
        name: 'Comercio de prueba 2',
        CIF: 'J32345699',
        address: 'Calle de prueba 2',
        email: 'pruebaprueba@prueba.net',
        phone: '666666667',
        city: 'Sevilla',
        scoring: 2
    }
]

const ciudad = testCommerces[0].city

describe('GET /api/webpages/search/:city', () => {

    // Registrar comercio de prueba
    describe('Registrar comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .send(testCommerces[0])

            // Comprobamos que la respuesta es correcta
            expect(response.status).toBe(201)
        }),
        it('Debería registrar otro comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .send(testCommerces[1])

            // Comprobamos que la respuesta es correcta
            expect(response.status).toBe(201)
        })
    })

    describe('Mostrar todos los comercios', () => {
        it('Debería mostrar los comercios de ' + ciudad + ' ordenados por score de forma ascendente', async () => {
            const response = await request(app)
                .get('/api/webpages/search/' + ciudad + '?asc=true')
            
            // Comprobamos que la respuesta es correcta
            expect(response.status).toBe(200)

            // Comprobamos que el orden es correcto
            const sortedTestCommerces = testCommerces.sort((a, b) => a.scoring - b.scoring)

            // Comprobamos que los comercios son correctos
            expect(response.body.map(commerce => commerce.CIF)).toEqual(sortedTestCommerces.map(commerce => commerce.CIF))
        })
    })
})
