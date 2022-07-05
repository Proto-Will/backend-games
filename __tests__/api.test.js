const request = require("supertest")
const app = require("../app")
const db = require("../db/connection")
require('../controllers/controller');
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

afterAll(() => {
    if (db.end) db.end();
});

beforeEach(() => {
    return seed(testData)
})


describe('app', () => {
    describe("1. GET /api/categories", () => {
        test('should return  an array of category objects, each of which should have the following properties: - slug description', () => {
            const result = [
                {
                  slug: 'euro game',
                  description: 'Abstact games that involve little luck'
                },
                {
                  slug: 'social deduction',
                  description: "Players attempt to uncover each other's hidden role"
                },
                { slug: 'dexterity', description: 'Games involving physical skill' },
                {
                  slug: "children's games",
                  description: 'Games suitable for children'
                }
              ]
            return request(app)
            .get('/api/categories')
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual({categories: result})
            })
        })
    })
    describe("2. GET /api/reviews/:review_id", () => {
        test('should return a review objectwhich should have the following properties : review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at', () => {
         const result = {
            "category": "dexterity",
            "created_at": "2021-01-18T10:01:41.251Z",
            "designer": "Leslie Scott",
            "owner": "philippaclaire9",
            "review_body": "Fiddly fun for all the family",
            "review_id": 2,
            "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            "title": "Jenga",
            "votes": 5,
              }  
          return request(app)
            .get('/api/reviews/2')
            .expect(200)
            .then(({ body }) => {
              const { review } = body;
                  expect(review).toEqual(result)
            })
        })
    })
    describe("3. PATCH /api/reviews/:review_id", () => {
        test('should take an object in the form `{ inc_votes: newVote } and update it to new value', () => {
          const newReviewInfo = {
            inc_votes: 1
          };
          const finalResult = {
            "category": "dexterity",
            "created_at": "2021-01-18T10:01:41.251Z",
            "designer": "Leslie Scott",
            "owner": "philippaclaire9",
            "review_body": "Fiddly fun for all the family",
            "review_id": 2,
            "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            "title": "Jenga",
            "votes": 6,
              }  
          return request(app)
            .patch('/api/reviews/2')
            .send(newReviewInfo)
            .expect(200)
            .then(({ body }) => {
              const { review } = body;
                  expect(review).toEqual(finalResult)
            })
        })
    })
    describe("4. PATCH /api/reviews/:review_id", () => {
        test('should take an object in the form `{ inc_votes: newVote } and update it to new value', () => {
          const newReviewInfo = {
            inc_votes: -100
          };
          const finalResult = {
            "category": "dexterity",
            "created_at": "2021-01-18T10:01:41.251Z",
            "designer": "Leslie Scott",
            "owner": "philippaclaire9",
            "review_body": "Fiddly fun for all the family",
            "review_id": 2,
            "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            "title": "Jenga",
            "votes": -95,
              }  
          return request(app)
            .patch('/api/reviews/2')
            .send(newReviewInfo)
            .expect(200)
            .then(({ body }) => {
              const { review } = body;
                  expect(review).toEqual(finalResult)
            })
        })
    })

})