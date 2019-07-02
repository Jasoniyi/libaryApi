import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing Libary API endpoints', () => {
  describe('Testing signup controller', () => {
    it('Should register a user when all parameters are given', (done) => {
      chai
        .request(app)
        .post('/api/v1/signup')
        .send({
          email: 'abc@xyz.com',
          username: 'wumi',
          password: 'deb'
        })
        .end((error, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
