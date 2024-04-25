const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')

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
    const res_1 = await request(app)
      .post('/api/auth/register')
      .send(users[0])

     const res_2 = await request(app) 
        .post('/api/auth/register')
        .send(users[1])
    
    // Debe devolver un status 201 para el primer usuario y un status 400 para el segundo
    expect(res_1.statusCode).toEqual(201)
    expect(res_2.statusCode).toEqual(400)
  })
})
