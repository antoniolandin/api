const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4000)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/register').filter(file => file.endsWith('.json'))

const tests = files.map(file => {
    return require(`./${file}`)
})

// Se ejecutan los tests
describe('Register', () => {
    tests.forEach(test => {
        describe(test.title, () => {
            test.tests.forEach(testCase => {
                it(testCase.title, async () => {
                    
                    // Se imprime el usuario que se está probando
                    console.log(JSON.stringify(testCase.user))
                    
                    // Se realiza la petición al servidor
                    const response = await request(app)
                        .post('/api/auth/register')
                        .send(testCase.user)

                    // Se espera que el status y el body de la respuesta sean iguales a los esperados
                    expect(response.status).toBe(testCase.expected.status)

                    if (testCase.expected.body) {
                        expect(response.body).toEqual(testCase.expected.body)
                    }
                })
            })
        })
    })
})
