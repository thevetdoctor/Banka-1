import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../app";
import testData from "./testData";
import validationErrors from "../helpers/validationErrors";


const { expect } = chai;
chai.use(chaiHttp);

const createBankAccountURL = "/api/v1/accounts";
const updateAccountStatusURL = "/api/v1/account";
const deleteAccountURL = "/api/v1/accounts";
const loginURL = "/api/v1/auth/signin";

let currrentToken;


describe("ACCOUNT CONTROLLER ", () => {
	describe("POST /api/v1/accounts", () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
        	email: "jamesugbanu@gmail.com",
        	password: "scrip#9ju",
        })
        .end((error, response) => {
          currrentToken = response.body.data.token;
          done();
        })
    })
		it("it should create a new bank account", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send(testData.newAccounts[0])
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an("object");
					expect(response.body.data.openingBalance).to.equal('0.00');
					done();
				});
		});

    it("it should not create a new bank account with exisiting account number and type", (done) => {
      chai.request(app)
        .post(`${createBankAccountURL}`)
        .send(testData.newAccounts[0])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an("object");
          expect(response.body.error).to.equal(validationErrors.accountExists);
          done();
        });
    });
      it("it should not create a new bank account with the wrong token", (done) => {
      chai.request(app)
        .post(`${createBankAccountURL}`)
        .send(testData.newAccounts[0])
        .set('token', 'nsndfnbbnvcbnvbnd')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an("object");
          expect(response.body.error).to.equal(validationErrors.notAuthenticated);
          done();
        });
    });


		it("it should not create a bank account with an empty account type", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					type: "",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.accountTypeRequired).to.equal(validationErrors.accountTypeRequired);
					done();
				});
		});

		it("it should not create a bank account without savings or current as the account type", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					type: "nolls",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validType).to.equal(validationErrors.validType);
					done();
				});
		});

	});


	describe('PUT /account/:accountNumber endpoint', () => {

    it('it should update the status of an account', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000001`)
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

    it('it should not update the status of an account with invalid account number', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/18e`)
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
        .put(`${updateAccountStatusURL}/100000001`)
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
        it('it should not update the status of an account which is not found', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000019`)
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
        .put(`${updateAccountStatusURL}/1000000001`)
        .send({
          status: 'any status',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validStatus).to.equal(validationErrors.validStatus);
          done();
        });
    	});


    it('it should not update the status of an account with empty status', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000001`)
        .send({
          status: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.statusRequired).to.equal(validationErrors.statusRequired);
          done();
        });
    	});
	});

describe('DELETE /accounts/:accountNumber endpoint', () => {

    it('it should delete an account', (done) => {
      chai.request(app)
        .delete(`${deleteAccountURL}/1000000001`)
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
        .delete(`${deleteAccountURL}/1000000001`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noAccountNumber);
          done();
        });
    });

	});

});
