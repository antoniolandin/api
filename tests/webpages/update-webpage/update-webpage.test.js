const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4005)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/webpages/update-webpage/tests').filter(file => file.endsWith('.json'))

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
                webpage: testCase.webpage,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

// Web de prueba
const testWebpage = {
    title: 'test-update-comercio',
    activity: 'test-actividad',
    city: 'test-ciudad',
    summary: 'test-resumen'
}

// Se inicializa la variable id para almacenar el id de la página web de prueba
let id

describe('PUT /api/webpages/:id', () => {
    
    // Se crea una página web de prueba
    describe('Creación página web de prueba', () => {
        test('Debería crear una página web de prueba', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(testWebpage)

            expect(response.status).toBe(201)

            id = response.body.id
        })
    })

    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ webpage, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .put('/api/webpages/' + id)
                .send(webpage)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)

            if (expected.body) {
                for (let key in expected.body) {
                    expect(response.body[key]).toEqual(expected.body[key])
                }
            }
        })
    })
})
