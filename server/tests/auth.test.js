import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  email: 'user-test@gmail.com',
  password: 'passw0RD',
  firstName: 'Timi',
  lastName: 'Yemi'
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxMTk0MTE0LCJleHAiOjUwMjI0MDM3MTR9.2I9wWT5aEr6KOCtZJeUZcsg1bnc0xoGTARFCqCBXHFA';

//  POST - Sign up
describe('POST auth/signup/', () => {
  //  POST - Should create a new User
  it('should create new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(false);
        done();
      });
  });

  // POST Sign up- should return 400 if no email
  it('should return 400 if no eamil', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: 'timi',
        lastName: 'mimi',
        firstName: 'Riri'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });

  // POST Sign up - should return 400 if no password
  it('should return 400 if no password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'timi@gmail.com',
        password: '',
        lastName: 'mimi',
        firstName: 'Riri'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });
  // POST Sign up - should return 400
  it('should return 409 if user already exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'admin@admin.com',
        password: 'password',
        lastName: 'mimi',
        firstName: 'Riri'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });
});

//  Post Log In- Should return 400
describe('(Bad Requests) POST auth/login/', () => {
  it('should return 401 if no password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'rotimi@gm.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });

  it('should return 401 if no email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: 'passw0RD',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });

  it('should return 401 if username or password is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'user1@gmail.com',
        password: 'passw0RD1',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });
});

//  Post Log in - Should Login Successfully
describe('POST auth/login/', () => {
  it('should authenticate successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: User.email,
        password: User.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(false);
        done();
      });
  });
});

describe('Get logout/', () => {
  it('should logout a user', (done) => {
    chai.request(server)
      .get('/api/v1/auth/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eqls('User has been logged out');
        done();
      });
  });
});

//  Get all Users
describe('GET users/', () => {
  it('should get all users', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.users.length).to.eqls(3);
        done();
      });
  });
});

describe('Get users/1/', () => {
  it('should get a user', (done) => {
    chai.request(server)
      .get('/api/v1/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eqls('User found');
        done();
      });
  });
  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/users/10090886')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.eqls('User not found');
        done();
      });
  });
});

describe('Update users/1/', () => {
  it('should update a user', (done) => {
    chai.request(server)
      .put('/api/v1/users/1')
      .send({
        firstName: 'Marsa',
        lastName: 'Hanna',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eqls('User updated');
        done();
      });
  });
});
