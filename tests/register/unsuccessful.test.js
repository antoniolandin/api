const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')

good_user = {
    name: 'antonio',
    email: 'antonio',
    password: '12345',
    age: "a",
    city: 'madrid',
    interests: 'programming',
    recibeOffers: true
}

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4001)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close();
    sequelize.close();
    done();
});

// Test de registro de usuario
describe('Post Endpoints', () => {
  it('debería registrar a un usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(good_user)
    
    // Debe devolver un status 201 (created)
    expect(res.statusCode).toEqual(201)

    // Debe devolver un token y un usuario
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
    
    // El usuario enviado debe ser igual al usuario recibido
    for (const key in good_user) {
        if (key != 'password')
            expect(res.body.user[key]).toEqual(good_user[key])
    }
  })
})
