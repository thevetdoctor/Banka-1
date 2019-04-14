import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../app";
import testData from "./testData";
import validationErrors from "../helpers/validationErrors";


const { expect } = chai;
chai.use(chaiHttp);

const createBankAccountURL = "/api/v1/accounts";
const updateAccountStatusURL = "/api/v1/account";


describe("ACCOUNT CONTROLLER ", () => {
	describe("POST /api/v1/accounts", () => {
		it("it should create a new bank account", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send(testData.newAccounts[0])
				.end((error, response) => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an("object");
					expect(response.body.data.openingBalance).to.equal(0);
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
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.accountTypeRequired).to.equal(validationErrors.accountTypeRequired);
					done();
				});
		});

		it("it should not create a bank account without savings or current as the accouunt type", (done) => {
			chai.request(app)
				.post(`${createBankAccountURL}`)
				.send({
					owner: 1,
					type: "nolls",
				})
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validAccountNumber).to.equal(validationErrors.validAccountNumber);
          done();
        });
    });

    it('it should return an error for update of non existent accountNumber', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000002`)
        .send({
          status: 'dormant',
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal("Account Number not found");
          done();
        });
    });

    it('it should not update the status of an account with invalid status', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000001`)
        .send({
          status: 'any status',
        })
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.statusRequired).to.equal(validationErrors.statusRequired);
          done();
        });
    	});
    

	});
});
