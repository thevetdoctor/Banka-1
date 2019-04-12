import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../app";
import testData from "./testData";
import validationErrors from "../helpers/validationErrors";

const { expect } = chai;
const createBankAccountURL = "/api/v1/accounts";

chai.use(chaiHttp);

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
});
