const { expect } = require('chai');
const sinon  = require('sinon');
const { User } = require('../../database/models');
const authService = require('../../services/auth.service')
const JWT = require('jsonwebtoken');
describe('Teste do authService', function () {
  describe('Testa o serviço de login', function () {
    it('Login efetuado com sucesso!', async function () {
      const user = {
        id: 1,
        name: 'Lionel Messi',
        email: 'messi@gmail.com',
        role: 'customer',
        password: 'aa1bf4646de67fd9086cf6c79007026c',
      };
      sinon.stub(User, 'findOne').resolves(user);
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJMaW9uZWwgTWVzc2kiLCJlbWFpbCI6Im1lc3NpQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDE5MTczN30.-BX3Y8UlZONKKfxPYoxF72z1rahjzEUisbGNcM1CBrU';
      sinon.stub(JWT, 'sign').returns(token);
  
      const userLoginInput = {
        email: 'messi@gmail.com',
        password: 'teste123'
      }
      const result = await authService.login(userLoginInput);
  
      const loginOutput = {
        name: 'Lionel Messi',
        email: 'messi@gmail.com',
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJMaW9uZWwgTWVzc2kiLCJlbWFpbCI6Im1lc3NpQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDE5MTczN30.-BX3Y8UlZONKKfxPYoxF72z1rahjzEUisbGNcM1CBrU',
      }
  
      expect(result).to.be.deep.equal(loginOutput);
    });
  });
  describe('Testa o serviço de register', function () {
    it('Registro realizado com sucesso!', async function () {
      const user = {
        id: 1,
        name: 'Lionel Messi',
        email: 'messi@gmail.com',
        role: 'customer',
        password: 'aa1bf4646de67fd9086cf6c79007026c',
      };
      sinon.stub(User, 'findOne').resolves(undefined);
      sinon.stub(User, 'create').resolves(user);
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJMaW9uZWwgTWVzc2kiLCJlbWFpbCI6Im1lc3NpQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDE5MTczN30.-BX3Y8UlZONKKfxPYoxF72z1rahjzEUisbGNcM1CBrU';
      sinon.stub(JWT, 'sign').returns(token)
  
      const userRegisterInput = {
        nome: 'Lionel Messi',
        email: 'messi@gmail.com',
        password: 'teste123'
      }
      const result = await authService.register(userRegisterInput);
  
      const registerOutput = {
        name: 'Lionel Messi',
        email: 'messi@gmail.com',
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJMaW9uZWwgTWVzc2kiLCJlbWFpbCI6Im1lc3NpQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDE5MTczN30.-BX3Y8UlZONKKfxPYoxF72z1rahjzEUisbGNcM1CBrU',
      }
  
      expect(result).to.be.deep.equal(registerOutput);
    });
  })
  afterEach(function () {
    sinon.restore();
  });
})
