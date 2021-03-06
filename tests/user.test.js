const supertest = require('supertest')
const { addFriend } = require('../models/user')
const {app, server} = require('../server')


const api = supertest(app)

const user1 = {
    nickname: 'user1111',
    password: '1234'
}

const user2 = {
    nickname: 'user2111',
    password: "1234"
}

const friendRequest = {
        nickname: 'user1111',
        amigo: 'user2111'
    }
const addFriend1 = {
    nickname: 'user1111',
    amigo: 'user2111'
}
beforeAll(async () => {
    //return initializeCityDatabase();
    const User = require('../models/user')
  //  await User.delete_user(user1.nickname)
  ///  await User.delete_user(user2.nickname)
});

test('Crear usuarios', async () => {
    var response = await api
        .post('/register')
        .send(user1)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.exito).toBe(true)
    expect(response.body.user.nickname).toBe(user1.nickname)

    response = await api
        .post('/register')
        .send(user2)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.exito).toBe(true)
    expect(response.body.user.nickname).toBe(user2.nickname)
})

test('Añadir peticiones de amistad', async () => {
    const response = await api
        .post('/getFriendRequest')
        .send(friendRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    //console.log(response.body)
    expect(response.body.resultado).toBe('La solicitud se ha mandado correctamente')
})

// test('Lista de peticiones de amistad', async () => {
//     const response = await api
//         .get('/getFriendRequest?nickname='+user2.nickname)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
    
//     expect(response.body[0].valor).toBe(user1.nickname)
// })
test('Añadir peticiones de amistad', async () => {
    const response = await api
        .post('/acceptFriendRequest')
        .send(addFriend1)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    //console.log(response.body)
    expect(response.body.exito).toBe(true)
})
afterAll(() => {
    server.close()
    //Cerrar sockets y BD
})