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
const signupURL = "/api/v1/auth/signup";

let currrentToken;


describe("ACCOUNT CONTROLLER ", () => {
	describe("POST /api/v1/accounts", () => {
    before((done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send(testData.newUsers[2])
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
					expect(response.body.data.openingBalance).to.equal(0);
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

		it("it should not create a bank account with an empty owner field", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					owner: "",
					type: "savings",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.ownerRequired).to.equal(validationErrors.ownerRequired);
					done();
				});
		});

		it("it should not create a bank account with owner not an integer", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					owner: "J",
					type: "savings",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.ownerId).to.equal(validationErrors.ownerId);
					done();
				});
		});


		it("it should not create a bank account with an empty account type", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					owner: 1,
					type: "",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.accountTypeRequired).to.equal(validationErrors.accountTypeRequired);
					done();
				});
		});

		it("it should not create a bank account without savings or current as the account type", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					owner: 1,
					type: "nolls",
				})
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validType).to.equal(validationErrors.validType);
					done();
				});
		});


		it("should not create a bank account for a user that already has an account", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send(testData.newAccounts[0])
        .set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error).to.equal(validationErrors.accountExists);
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
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validAccountNumber).to.equal(validationErrors.validAccountNumber);
          done();
        });
    });
      it('it should not update the status of an account which has length not 10', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/100000000`)
        .send({
          status: 'dormant',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validAccountNumber).to.equal(validationErrors.validAccountNumber);
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
          expect(response).to.have.status(406);
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
          expect(response).to.have.status(406);
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
        .delete(`${deleteAccountURL}/1000000002`)
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.accountNumberCheck).to.equal(validationErrors.accountNumberCheck);
          done();
        });
    });

	});

});
