import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';


const { expect } = chai;
chai.use(chaiHttp);

const accountsUrl = '/api/v1/accounts';
const accountUrl = '/api/v1/account';
const loginURL = '/api/v1/auth/signin';
const userAccount = '/api/v1/user';

let currrentToken;


describe('ACCOUNT CONTROLLER ', () => {
  describe('POST /api/v1/accounts', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'jamesugbanu@gmail.com',
          password: 'scrip#9ju',
        })
        .end((error, response) => {
          currrentToken = response.body.data.token;
          done();
        });
    });
    it('it should create a new bank account', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send(testData.newAccounts[0])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.openingBalance).to.equal('0.00');
          done();
        });
    });

    it('it should create a new bank account', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send(testData.newAccounts[1])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.openingBalance).to.equal('0.00');
          done();
        });
    });

    it('it should not create a new bank account with exisiting account number and type', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send(testData.newAccounts[0])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.accountExists);
          done();
        });
    });
    it('it should not create a new bank account with the wrong token', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send(testData.newAccounts[0])
        .set('token', 'nsndfnbbnvcbnvbnd')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.notAuthenticated);
          done();
        });
    });


    it('it should not create a bank account with an empty account type', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send({
          type: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.accountTypeRequired);
          done();
        });
    });

    it('it should not create a bank account without savings or current as the account type', (done) => {
      chai.request(app)
        .post(`${accountsUrl}`)
        .send({
          type: 'nolls',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.validType);
          done();
        });
    });
  });


  describe('PUT /account/:accountNumber endpoint', () => {
    it('it should update the status of an account', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000001`)
        .send({
          status: 'dormant',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          expect(response.body.data.status).to.equal('dormant');
          done();
        });
    });

    it('it should update the status of an account to dormant', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000002`)
        .send({
          status: 'active',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          expect(response.body.data.status).to.equal('active');
          done();
        });
    });

    it('it should not update the status of an account with invalid account number', (done) => {
      chai.request(app)
        .put(`${accountUrl}/18e`)
        .send({
          status: 'dormant',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validAccountNumber);
          done();
        });
    });
    it('it should not update the status of an account which has length not 10', (done) => {
      chai.request(app)
        .put(`${accountUrl}/100000001`)
        .send({
          status: 'active',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validAccountNumber);
          done();
        });
    });
    it('it should not update the status of an account which is not found', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000019`)
        .send({
          status: 'dormant',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noAccountNumber);
          done();
        });
    });


    it('it should not update the status of an account with invalid status', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000001`)
        .send({
          status: 'any status',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Status[0]).to.equal(validationErrors.validStatus);
          done();
        });
    });


    it('it should not update the status of an account with empty status', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000001`)
        .send({
          status: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Status[0]).to.equal(validationErrors.statusRequired);
          done();
        });
    });
  });

  describe('GET /api/v1/user/:email/accounts endpoint', () => {
    it('it should return a specific user account', (done) => {
      chai.request(app)
        .get(`${userAccount}/jamesugbanu@gmail.com/accounts`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('it should return error if an invalid email', (done) => {
      chai.request(app)
        .get(`${userAccount}/jamesugbanu@gmail/accounts`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validEmail);
          done();
        });
    });
  });

  describe('GET /api/v1/accounts/:accountNumber endpoint', () => {
    it('it should return a specific bank account', (done) => {
      chai.request(app)
        .get(`${accountsUrl}/1000000001`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/accounts endpoint', () => {
    it('it should return all bank account', (done) => {
      chai.request(app)
        .get(`${accountsUrl}`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/accounts endpoint', () => {
    it('it should return all active bank account', (done) => {
      chai.request(app)
        .get(`${accountsUrl}?status=active`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/accounts endpoint', () => {
    it('it should return all dormant bank account', (done) => {
      chai.request(app)
        .get(`${accountsUrl}?status=dormant`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /accounts/:accountNumber endpoint', () => {
    it('it should delete an account', (done) => {
      chai.request(app)
        .delete(`${accountsUrl}/1000000002`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Account successfully deleted');
          done();
        });
    });

    it('it should return error if account is not found', (done) => {
      chai.request(app)
        .delete(`${accountsUrl}/1000000002`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noAccountNumber);
          done();
        });
    });
  });

  describe('Check for Admin Authorisation', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'singlecliq@gmail.com',
          password: 'telju2573j',
        })
        .end((error, response) => {
          currrentToken = response.body.data.token;
          done();
        });
    });

    it('it should return 403 error if not admin', (done) => {
      chai.request(app)
        .delete(`${accountsUrl}/1000000001`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(403);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.notAllowed);
          done();
        });
    });

    it('it should return 401 error if not logged in', (done) => {
      chai.request(app)
        .delete(`${accountsUrl}/1000000001`)
        .set('token', 'bndghhjuiure782378ui')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.notAuthenticated);
          done();
        });
    });
  });
});
