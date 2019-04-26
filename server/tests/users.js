import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';

const { expect } = chai;
chai.use(chaiHttp);
const signupURL = '/api/v1/auth/signup';
const loginURL = '/api/v1/auth/signin';


describe('USER CONTROLLER ', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('Endpoint does not exist', (done) => {
      chai.request(app)
        .post(`${signupURL}/test`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('The URL you are trying to access does not exist. Please enter a valid url');
          done();
        });
    });

    it('it should register a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.email).to.equal(testData.newUsers[0].email);
          done();
        });
    });

    it('it should not register a user with an empty first name field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: '',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.fnameRequired).to.equal(validationErrors.fnameRequired);
          done();
        });
    });

    it('it should not register a user with firstname less than 2 characters', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'J',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.fnameLength).to.equal(validationErrors.fnameLength);
          done();
        });
    });

    it('it should not register a user with an invalid first name', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'J1#D',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validFName).to.equal(validationErrors.validFName);
          done();
        });
    });

    it('it should not register a user with an empty last name field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: '',
          email: 'johndoe@gmail.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.lnameRequired).to.equal(validationErrors.lnameRequired);
          done();
        });
    });

    it('it should not register a user with last less than 2 characters', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: 'D',
          email: 'johndoe@gm.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.lnameLength).to.equal(validationErrors.lnameLength);
          done();
        });
    });

    it('it should not register a user with an invalid last name', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'Emmanuel',
          lastName: 'D1#E',
          email: 'johndoe@gmail.com',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validLName).to.equal(validationErrors.validLName);
          done();
        });
    });

    it('should not register a user with an existing email address', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.emailExists);
          done();
        });
    });

    it('should not register a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
          done();
        });
    });

    it('should not register a user with an empty email address field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: '',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.emailRequired).to.equal(validationErrors.emailRequired);
          done();
        });
    });

    it('should not register a user with password less than 5 characters', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'test',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.passwordLength).to.equal(validationErrors.passwordLength);
          done();
        });
    });

    it('should not register a user with an empty password field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.passwordRequired).to.equal(validationErrors.passwordRequired);
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('it should signin a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'jamesugbanu@gmail.com',
          password: 'scrip#9ju',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.firstName).to.equal(testData.newUsers[0].firstName);
          done();
        });
    });
    it('should not signin a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: '@gmail',
          password: testData.newUsers[0].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
          done();
        });
    });

    it('should not signin a user without an email address', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: '',
          password: testData.newUsers[0].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginRequired);
          done();
        });
    });

    it('should not signin a user with an empty password field', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: testData.newUsers[0].email,
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginRequired);
          done();
        });
    });

    it('should not signin a user where email and password do not match', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: testData.newUsers[0].email,
          password: 'whatareyousaying',
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginFailure);
          done();
        });
    });

    it('should not signin a user where email does not exist in the database', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'joseph@gmail.com',
          password: testData.newUsers[1].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noEmail);
          done();
        });
    });
  });
});
