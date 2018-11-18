import 'jest'
import * as request from 'supertest'
import { User } from './users.model'

const address: string = (<any>global).address
let auth: string
let user: User

test('get /users', () => {
    return request(address)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200)
        }).catch(fail)
})

test('post /users', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        })
        .then(response => {
            user = response.body
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
})

test('authentication', () => {
    return request(address)
        .post('/users/authenticate')
        .send({
            email: 'user1@email.com',
            password: '123456'
        })
        .then(response => {
            auth = `Bearer ${response.body.acessToken}`
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.acessToken).toBeDefined()
        })
})


test('get /users/:id', () => {
    return request(address)
        .get(`/users/${user._id}`)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.password).toBeUndefined()
        })
})

test('get /users/?email=example@email.com', () => {
    return request(address)
        .get(`/users/?email=${user.email}`)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.password).toBeUndefined()
        })
})

test('put /users/:id', () => {
    return request(address)
        .put(`/users/${user._id}`)
        .set('Authorization', auth)
        .send({
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.password).toBeUndefined()
        })
})

test('patch /users/:id', () => {
    return request(address)
        .patch(`/users/${user._id}`)
        .set('Authorization', auth)
        .send({
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('user1')
            expect(response.body.email).toBe('user1@email.com')
            expect(response.body.password).toBeUndefined()
        })
})