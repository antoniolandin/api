const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4004)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/admin/update-commerce/tests').filter(file => file.endsWith('.json'))

const tests = files.map(file => {
    return require(`./tests/${file}`)
})

// Ahora tenemos que procesar los tests para que sean ejecutados por Jest
// Cada test tiene un título y un array de tests
// Cada test tiene un título, un comercio y un objeto expected
// El objeto expected tiene un status y un body
const table = tests.map(test => {
    return {
        title: test.title,
        tests: test.tests.map(testCase => {
            return {
                title: testCase.title,
                commerce: testCase.commerce,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

const commerce = {
    name: 'Comercio de prueba',
    CIF: 'B32345698',
    address: 'Calle de prueba',
    email: 'comercioPrueba@proton.me',
    phone: '666666666'
}

describe('PUT /api/admin/merchant{id}', () => {

    // Registrar comercio de prueba
    describe('Registrar comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/admin/merchants')
                .send(commerce)

            expect(response.status).toBe(201)
        })
    })

// Se ejecutan los tests
    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ commerce, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .put('/api/admin/merchants/' + commerce.CIF)
                .send(commerce)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)

            if (expected.body) {
                expect(response.body).toEqual(expected.body)
            }
        })
    })
})
