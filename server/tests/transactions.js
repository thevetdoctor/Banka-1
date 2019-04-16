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


describe("TRANSACTION CONTROLLER ", () => {

	describe("POST /api/v1/transactions/:accountNumber/credit", () => {

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
		it("it should credit an account", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send(testData.newTransactions[0])
				.end((error, response) => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an("object");
					expect(response.body.data.transactionType).to.equal("credit");
					done();
				});
		});

		it("it should not credit an account with an empty cashier field", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					cashier: '',
					amount: 150.00,
					type: "credit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.cashierRequired).to.equal(validationErrors.cashierRequired);
					done();
				});
		});

		it("it should not credit an account with cashier not an integer", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					cashier: 'J',
					amount: 150.00,
					type: "credit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.cashierId).to.equal(validationErrors.cashierId);
					done();
				});
		});


		it("it should not credit a bank account with an empty amount", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					cashier: 1,
					amount: '',
					type: "credit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.amountRequired).to.equal(validationErrors.amountRequired);
					done();
				});
		});

		it("it should not credit a bank account with amount not an integer of float", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({
					cashier: 1,
					amount: 'J',
					type: "credit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validAmount).to.equal(validationErrors.validAmount);
					done();
				});
		});


		it("should not credit a bank account when type is empty", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({ cashier: 1,
					amount: 50.0,
					type: "",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.creditTypeRequired).to.equal(validationErrors.creditTypeRequired);
					done();
				});
		});

	
	it("should not credit a bank account when type is not credit", (done) => {
			chai.request(app)
				.post(`${creditAccountURL}/1000000001/credit`)
				.send({ cashier: 1,
					amount: 50.0,
					type: "cedit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.creditTypeRequired).to.equal(validationErrors.creditTypeRequired);
					done();
				});
		});

	});

	describe('POST /api/v1/transactions/:accountNumber/debit', () => {
    it('it should debit an account', (done) => {
      chai.request(app)
        .post(`${debitAccountURL}/1000000001/debit`)
        .send(testData.newTransactions[1])
        .end((error, response) => {
        		console.log(response.body)
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          expect(response.body.data.transactionType).to.equal('debit');
          done();
        });
    });

	it("it should not debit an account with an empty cahier field", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					cashier: '',
					amount: 150.00,
					type: "debit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.cashierRequired).to.equal(validationErrors.cashierRequired);
					done();
				});
		});

		it("it should not debit an account with cashier not an integer", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					cashier: 'J',
					amount: 150.00,
					type: "debit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.cashierId).to.equal(validationErrors.cashierId);
					done();
				});
		});


		it("it should not debit a bank account with an empty amount", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					cashier: 1,
					amount: '',
					type: "debit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.amountRequired).to.equal(validationErrors.amountRequired);
					done();
				});
		});

		it("it should not debit a bank account with amount not an integer of float", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
					cashier: 1,
					amount: 'J',
					type: "debit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.validAmount).to.equal(validationErrors.validAmount);
					done();
				});
		});


		it("should not debit a bank account when type is empty", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({ cashier: 1,
					amount: 50.0,
					type: "",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.debitTypeRequired).to.equal(validationErrors.debitTypeRequired);
					done();
				});
		});

	it("should not debit a bank account when type is not debit", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({ cashier: 1,
					amount: 50.0,
					type: "deit",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.debitTypeRequired).to.equal(validationErrors.debitTypeRequired);
					done();
				});
		});

	it("should not debit a bank account when amount is less than balance", (done) => {
			chai.request(app)
				.post(`${debitAccountURL}/1000000001/debit`)
				.send({
						cashier: 1,
						amount: 100.00,
						type: "debit",
					})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error).to.equal(validationErrors.insufficientFund);
					done();
				});
		});
 });
});
