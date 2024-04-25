const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')

bad_user = {
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
  it('deberá dar un error debido a que los campos del usuario están mal', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(bad_user)
    
    // Debe devolver un status 400 (Bad Request)
    expect(res.statusCode).toEqual(400)
  })
})
