import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../app";
import testData from "./testData";
import validationErrors from "../helpers/validationErrors";

const { expect } = chai;
const signupURL = "/api/v1/auth/signup";

chai.use(chaiHttp);

describe("USER CONTROLLER ", () => {
	describe("POST /api/v1/auth/signup", () => {
		it("it should register a user with correct and complete information", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send(testData.newUsers[0])
				.end((error, response) => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an("object");
					expect(response.body.data.email).to.equal(testData.newUsers[0].email);
					done();
				});
		});

		it("it should not register a user with an empty first name field", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.fnameRequired).to.equal(validationErrors.fnameRequired);
					done();
				});
		});

		it("it should not register a user with firstname less than 2 characters", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "J",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.fnameLength).to.equal(validationErrors.fnameLength);
					done();
				});
		});

		it("it should not register a user with an invalid first name", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "J1#D",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.validFName).to.equal(validationErrors.validFName);
					done();
				});
		});

		it("it should not register a user with an empty last name field", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "",
					email: "johndoe@gmail.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.lnameRequired).to.equal(validationErrors.lnameRequired);
					done();
				});
		});

		it("it should not register a user with last less than 2 characters", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "D",
					email: "johndoe@gm.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.lnameLength).to.equal(validationErrors.lnameLength);
					done();
				});
		});

		it("it should not register a user with an invalid last name", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "Emmanuel",
					lastName: "D1#E",
					email: "johndoe@gmail.com",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.validLName).to.equal(validationErrors.validLName);
					done();
				});
		});

		it("should not register a user with an existing email address", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send(testData.newUsers[0])
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error).to.equal(validationErrors.emailExists);
					done();
				});
		});

		it("should not register a user with an invalid email address", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "Doe",
					email: "johndoe@gmail",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
					done();
				});
		});

		it("should not register a user with an empty email address field", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "Doe",
					email: "",
					password: "test24",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.emailRequired).to.equal(validationErrors.emailRequired);
					done();
				});
		});

		it("should not register a user with password less than 5 characters", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					password: "test",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body.error).to.be.an("object");
					expect(response.body.error.passwordLength).to.equal(validationErrors.passwordLength);
					done();
				});
		});

		it("should not register a user with an empty password field", (done) => {
			chai.request(app)
				.post(`${signupURL}`)
				.send({
					firstName: "John",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					password: "",
				})
				.end((error, response) => {
					expect(response).to.have.status(406);
					expect(response.body).to.be.an("object");
					expect(response.body.error.passwordRequired).to.equal(validationErrors.passwordRequired);
					done();
				});
		});
	});
});
