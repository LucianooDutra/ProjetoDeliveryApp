const JWT = require('jsonwebtoken');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {mockUser, mockUser2} = require('./mocks/user');

const app = require('../../api/app');
const { User } = require('../../database/models');
  
chai.use(chaiHttp);


describe('testa a rota /auth', () => {
  afterEach(function () {
    sinon.restore();
  })
  it('deve retornar mensagem de e-mail ausente', async () => {
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({})
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.text).to.deep.equal(JSON.stringify({message:'Email ausente'}));

  })
  it('deve retornar mensagem de senha ausente', async () => {
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({
        "email": "trybe@email.com",
        "password": ''
      })
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.text).to.deep.equal(JSON.stringify({message:'Senha ausente'}));

  })
  it('deve retornar mensagem de que o email deve possuir formato correto', async () => {
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({
        "email": "email.com",
        "password": ''
      })
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.text).to.deep.equal(JSON.stringify({"message": "O \"email\" deve ter o formato \"email@email.com\""}));
  })
  it('deve retornar mensagem de que senha deve possuir formato correto', async () => {
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({
        "email": "trybe@email.com",
        "password": '123'
      })
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.text).to.deep.equal(JSON.stringify({"message": "Senha no mínimo 6 caracteres"}));
  })
  it('deve retornar status 200 com usuário já existente', async () => {
    sinon.stub(JWT, 'sign').returns('token');
    sinon.stub(User, 'findOne').resolves(mockUser);
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'grupo15@gmail.com',
        password: 'group15'
      })
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.text).to.deep.equal(JSON.stringify({ name: "Grupo 15", email: "grupo15@gmail.com", role: 'admin', token: 'token' }))

    
  })
  it('deve retornar status 200 com usuário já existente', async () => {
    sinon.stub(JWT, 'verify').returns('token');
    sinon.stub(User, 'findOne').resolves(mockUser2);
    const httpResponse = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'fulana@deliveryapp.com',
        password: 'fulana@123'
      })
    
    expect(httpResponse.status).to.equal(200);

    
  })
} )
