import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

const Business = {
  name: `Moremi Gloals ${Math.random() * 100}`,
  details: 'Best Ict Resources',
  location: 'lagos',
  category: 'ICT',
};

const token = 'zyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxMTk0MTE0LCJleHAiOjcwMjI0MDM3MTR9.jnrbW_TXHJ-0QBBsGvMa7Zq-3egs7yToSm-EL-OCv2w';

// LoggedIn Middleware
describe('POST businesses/', () => {
  it('should return 401, User not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/')
      .set('x-access-token', token)
      .send(Business)
      .end((err, res) => {
        expect(res)
          .to.have.status(401);
        done();
      });
  });
  it('should return 401, User not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/2/reviews')
      .set('x-access-token', token)
      .send({ content: 'test', star: 3 })
      .end((err, res) => {
        expect(res)
          .to.have.status(401);
        done();
      });
  });
});

// Sorter Middleware
describe('GET businesses/', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/businesses?location=lagos')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
  it('/api/v1/businesses?location=<location> should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/businesses?location=testing')
      .end((err, res) => {
        // expect(res).to.have.status(404);
        // console.log(res);
        expect(res.body.message).to.eqls('No business found in testing');
        done();
      });
  });
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/businesses?category=ICT')
      .end((err, res) => {
        expect(res.body.error)
          .to.eqls(false);
        done();
      });
  });
  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/businesses?category=dddka')
      .end((err, res) => {
        expect(res.body.error)
          .to.eqls(true);
        done();
      });
  });
});


// validParam Middleware
describe('GET businesses/', () => {
  it('should return 400', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/2n3')
      .end((err, res) => {
        expect(res)
          .to.have.status(400);
        expect(res.body.message)
          .to.eqls('Invalid params');
        done();
      });
  });
});
