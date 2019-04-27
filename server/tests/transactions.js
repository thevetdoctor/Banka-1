import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';


const { expect } = chai;
chai.use(chaiHttp);

const transactionsUrl = '/api/v1/transactions';
const loginURL = '/api/v1/auth/signin';
const accountUrl = '/api/v1/account';
const accountsUrl = '/api/v1/accounts';

let currrentToken;

describe('TRANSACTION CONTROLLER ', () => {
  describe('POST /api/v1/transactions/:accountNumber/credit', () => {
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


    it('it should credit an account', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/credit`)
        .send(testData.newTransactions[0])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.transactionType).to.equal('credit');
          done();
        });
    });


    it('it should not credit a bank account with an empty amount', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/credit`)
        .send({
          amount: '',
          type: 'credit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Amount[0]).to.equal(validationErrors.amountRequired);
          done();
        });
    });

    it('it should not credit a bank account with amount not an integer of float', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/credit`)
        .send({
          amount: 'J',
          type: 'credit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.Amount[0]).to.equal(validationErrors.validAmount);
          done();
        });
    });


    it('should not credit a bank account when type is empty', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/credit`)
        .send({
          amount: 50,
          type: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.creditTypeRequired);
          done();
        });
    });


    it('should not credit a bank account when type is not credit', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/credit`)
        .send({
          amount: 50.0,
          type: 'cedit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.validCreditType);
          done();
        });
    });
  });

  describe('POST /api/v1/transactions/:accountNumber/debit', () => {
    it('it should not debit an account if not active', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send(testData.newTransactions[1])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.accountNotActive);
          done();
        });
    });
    it('it should update the status of an account to active', (done) => {
      chai.request(app)
        .put(`${accountUrl}/1000000001`)
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
    it('it should debit an account if active', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send(testData.newTransactions[1])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          expect(response.body.data.transactionType).to.equal('debit');
          done();
        });
    });


    it('it should not debit a bank account with an empty amount', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send({
          amount: '',
          type: 'debit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Amount[0]).to.equal(validationErrors.amountRequired);
          done();
        });
    });

    it('it should not debit a bank account with amount not an integer of float', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send({
          amount: 'J',
          type: 'debit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.Amount[0]).to.equal(validationErrors.validAmount);
          done();
        });
    });


    it('should not debit a bank account when type is empty', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send({
          amount: 50,
          type: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.debitTypeRequired);
          done();
        });
    });

    it('should not debit a bank account when type is not debit', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send({
          amount: 50.0,
          type: 'deit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.Type[0]).to.equal(validationErrors.validDebitType);
          done();
        });
    });

    it('should not debit a bank account when amount is less than balance', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send({
          amount: 100.00,
          type: 'debit',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.insufficientFund);
          done();
        });
    });
  });
  describe('GET /api/v1/accounts/:accountNumber/transactions endpoint', () => {
    it('it should return all account number transactions', (done) => {
      chai.request(app)
        .get(`${accountsUrl}/1000000001/transactions`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/transactions/:id endpoint', () => {
    it('it should return a specific transaction', (done) => {
      chai.request(app)
        .get(`${transactionsUrl}/1`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });


    it('it should return not found', (done) => {
      chai.request(app)
        .get(`${transactionsUrl}/35`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.historyNotFOund);
          done();
        });
    });

    it('it should return error if transaction id is not an integer', (done) => {
      chai.request(app)
        .get(`${transactionsUrl}/j`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validId);
          done();
        });
    });
  });

  describe('Check for Staff Authorisation', () => {
		 before((done) => {
		      chai.request(app)
		        .post(`${loginURL}`)
		        .send({
		        	email: 'tunex@gmail.com',
		        	password: 'hshdk#5g',
		        })
		        .end((error, response) => {
		          currrentToken = response.body.data.token;
		          done();
		        });
		    });

    it('it should return 403 error if not a staff', (done) => {
      chai.request(app)
        .post(`${transactionsUrl}/1000000001/debit`)
        .send(testData.newTransactions[1])
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
        .post(`${transactionsUrl}/1000000001/debit`)
        .send(testData.newTransactions[1])
        .set('token', 'bndghhjuiure782378ui')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.notAuthenticated);
          done();
        });
    });
  });
})
