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
    // describe("1. GET /api/reviews", () => {
    //     test('should return a review objectwhich should have the following properties : review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at', () => {
    //         return request(app)
    //         .get('/api/reviews/3')
    //         .expect(200)
    //         .then(({ body }) => {
    //           const { review } = body;
    //           // expect(review).toBeInstanceOf(Array);
    //               expect(review[0]).toEqual(
    //                     expect.objectContaining({
    //                       review_id: expect.any(Number),
    //                       title: expect.any(String),
    //                       review_body: expect.any(String),
    //                       designer: expect.any(String),
    //                       review_img_url: expect.any(String),
    //                       votes: expect.any(Number),
    //                       category: expect.any(String),
    //                       owner: expect.any(String),
    //                       created_at: expect.any(Date)
    //                     })
    //                )
              
    //         })
    //     })
    // })
})