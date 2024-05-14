const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4009)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un comercio de prueba
const testUsers = [
    {
        "name": "test-user",
        "email": "test-user@proton.me",
        "password": "123456",
        "city": "Buenos Aires",
        "recibeOffers": false
    },
    {
        "name": "test-user2",
        "email": "test-user2@proton.me",
        "password": "123456",
        "city": "Buenos Aires",
        "recibeOffers": true
    },
    {
        "name": "test-user3",
        "email": "test-user3@proton.me",
        "password": "123456",
        "city": "Rosario",
        "recibeOffers": true
    }
]

describe('GET /api/users/:city', () => {

    // Registramos usuarios de prueba
    describe.each(testUsers)('Registrar usuario', (user) => {
        it('Debería registrar un usuario', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(user)

            expect(response.status).toBe(201)
        })
    })
    
    describe('Mostrar todos los usuarios', () => {
        it('Debería mostrar los usuarios de Buenos Aires', async () => {
            const response = await request(app)
                .get('/api/users/Buenos Aires')
            
            // Comprobamos que la petición ha sido exitosa
            expect(response.status).toBe(200)

            // Comprobamos que solo se muestrán los usuarios de Buenos Aires y que reciban ofertas
            response.body.users.forEach(user => {
                expect(user.city).toBe('Buenos Aires')
                expect(user.recibeOffers).toBe(true)
            })
        })
    })
})
