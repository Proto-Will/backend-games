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
})