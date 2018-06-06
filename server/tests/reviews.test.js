import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxMTk0MTE0LCJleHAiOjUwMjI0MDM3MTR9.2I9wWT5aEr6KOCtZJeUZcsg1bnc0xoGTARFCqCBXHFA';


// Add A Review
describe('POST businesses/<id>/reviews', () => {
  it('should be able to add reviews to a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/2/reviews')
      .set('x-access-token', token)
      .send({
        content: 'Lorem ipsum dolor sit amet.',
        star: 4,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Review Created');
        done();
      });
  });


  it('should be able to add reviews to a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/4/reviews')
      .set('x-access-token', token)
      .send({
        content: 'Hey ipsum dolor sit amet.',
        star: 5,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('You cannot review your own business');
        done();
      });
  });

  it('should not be able to add reviews to a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/3/reviews')
      .set('x-access-token', token)
      .send({
        content: '',
        star: 4,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Input required field');
        done();
      });
  });

  it('should return business not found', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/35678/reviews')
      .set('x-access-token', token)
      .send({
        content: 'lorem 99',
        star: 4,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business not found');
        done();
      });
  });
});


// Get Business Reviews
describe('Get businesses/2/reviews', () => {
  it('should be able to get reviews of a business', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/2/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });

  it('should be able to add reviews to a business', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/3/reviews')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('No review found');
        done();
      });
  });

  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/3627827/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(404);
        done();
      });
  });
});
