const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')

// Usuarios de prueba para el test
users = [
    {
        name: 'Paco',
        email: 'paco@proton.me',
        password: '123456',
        age: 20,
        city: 'madrid',
        interests: 'programming',
        recibeOffers: true
    },
    {
        name: 'manolo',
        email: 'paco@proton.me',
        password: '123456',
        age: 20,
        city: 'jerez',
        interests: 'programming',
        recibeOffers: false
    }
]

// Códigos de respuesta esperados
expected_codes = [201, 400]

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4002)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close();
    sequelize.close();
    done();
});

// Test de registro de usuario
describe('Post Endpoints', () => {
    it('comprobar que salta el error de unicidad de email', async () => {
 
        // Registramos los usuarios y comprobamos que se devuelven los códigos de respuesta esperados
        for (const user of users) { 
            console.log(user)

            const res = await request(app)
                .post('/api/auth/register')
                .send(user)

            expect(res.statusCode).toEqual(expected_codes.shift())
        }
    })
})
