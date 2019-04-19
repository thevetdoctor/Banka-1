import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../app";
import testData from "./testData";
import validationErrors from "../helpers/validationErrors";


const { expect } = chai;
chai.use(chaiHttp);

const createBankAccountURL = "/api/v1/accounts";
const creditAccountURL = "/api/v1/transactions";
const debitAccountURL = "/api/v1/transactions";
const loginURL = "/api/v1/auth/signin";
const updateAccountStatusURL = "/api/v1/account";

let currrentToken;

describe("TRANSACTION CONTROLLER ", () => {

	describe("POST /api/v1/transactions/:accountNumber/credit", () => {
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

		it("it should credit an account", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send(testData.newTransactions[0])
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an("object");
					expect(response.body.data.transactionType).to.equal("credit");
					done();
				});
		});


		it("it should not credit a bank account with an empty amount", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					amount: '',
					type: "credit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.amountRequired).to.equal(validationErrors.amountRequired);
					done();
				});
		});

		it("it should not credit a bank account with amount not an integer of float", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					amount: 'J',
					type: "credit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validAmount).to.equal(validationErrors.validAmount);
					done();
				});
		});


		it("should not credit a bank account when type is empty", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					amount: 50,
					type: "",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.creditTypeRequired).to.equal(validationErrors.creditTypeRequired);
					done();
				});
		});

	
	it("should not credit a bank account when type is not credit", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					amount: 50.0,
					type: "cedit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.creditTypeRequired).to.equal(validationErrors.creditTypeRequired);
					done();
				});
		});

	});

	describe('POST /api/v1/transactions/:accountNumber/debit', () => {

		 it('it should not debit an account if not active', (done) => {
      chai.request(app)
        .post(`${debitAccountURL}/1000000001/debit`)
        .send(testData.newTransactions[1])
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.accountNotActive);
          done();
        });
    });

		it('it should update the status of an account', (done) => {
      chai.request(app)
        .put(`${updateAccountStatusURL}/1000000001`)
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
        .post(`${debitAccountURL}/1000000001/debit`)
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

    


		it("it should not debit a bank account with an empty amount", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					amount: '',
					type: "debit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.amountRequired).to.equal(validationErrors.amountRequired);
					done();
				});
		});

		it("it should not debit a bank account with amount not an integer of float", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					amount: 'J',
					type: "debit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validAmount).to.equal(validationErrors.validAmount);
					done();
				});
		});


		it("should not debit a bank account when type is empty", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({ 
					amount: 50.0,
					type: "",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.debitTypeRequired).to.equal(validationErrors.debitTypeRequired);
					done();
				});
		});

	it("should not debit a bank account when type is not debit", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({ 
					amount: 50.0,
					type: "deit",
				})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error.debitTypeRequired).to.equal(validationErrors.debitTypeRequired);
					done();
				});
		});

	it("should not debit a bank account when amount is less than balance", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
						amount: 100.00,
						type: "debit",
					})
				.set('token', currrentToken)
				.end((error, response) => {
					expect(response).to.have.status(400);
					expect(response.body).to.be.an("object");
					expect(response.body.error).to.equal(validationErrors.insufficientFund);
					done();
				});
		});
 });
});
