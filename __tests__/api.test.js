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
            return request(app)
            .get('/api/categories')
            .expect(200)
            .then(({ body }) => {
              const { categories } = body;
              expect(categories).toBeInstanceOf(Array);
              categories.forEach((category) => {
                  expect(category).toEqual(
                    expect.objectContaining({
                      slug: expect.any(String),
                      description: expect.any(String)
                  }))
              })
            })
        })
        test('404; handles bad paths', () => {
          return request(app)
          .get('/api/bad_path')
          .expect(404)
          .then(({body: { msg }}) => {
            expect(msg).toBe('Invalid Path')
          })
        })
    })

    describe("2. GET /api/reviews/:review_id", () => {
      test('should return a review objectwhich should have the following properties : review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at', () => {
        return request(app)
          .get('/api/reviews/2')
          .expect(200)
          .then(({ body }) => {
            const { review } = body;
                expect(review).toEqual(
                  expect.objectContaining({
                    category: expect.any(String),
                    created_at: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_body: expect.any(String),
                    review_id: expect.any(Number),
                    review_img_url: expect.any(String),
                    title: expect.any(String),
                    votes: expect.any(Number) }))
          })
      })
      test('404; handles incorrect id', () => {
        return request(app)
        .get('/api/reviews/50')
        .expect(404)
        .then(({body: { msg }}) => {
          expect(msg).toBe('No review found for review_id: 50')
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
          test('404; handles incorrect id number', () => {
            const newReviewInfo = {
              inc_votes: -100
            };
            return request(app)
            .patch('/api/reviews/50')
            .send(newReviewInfo)
            .expect(404)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('No review found for review_id: 50')
            })
          })
          
          test('404; handles incorrect packet info', () => {
            const newReviewInfo = {};
            return request(app)
            .patch('/api/reviews/2')
            .send(newReviewInfo)
            .expect(404)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('Invalid Packet')
            })
          })
          
          test('404; handles packet values as string', () => {
            const newReviewInfo = {
              inc_votes: "bad_data"};
            return request(app)
            .patch('/api/reviews/2')
            .send(newReviewInfo)
            .expect(404)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('Invalid Packet')
            })
          })
          
          test('404; handles id as string ', () => {
            const newReviewInfo = {
              inc_votes: -100};
            return request(app)
            .patch('/api/reviews/string')
            .send(newReviewInfo)
            .expect(404)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('Invalid ID')
            })
          })
    })
      
    describe("4. GET /api/users", () => {
      test('should return  an array of objects, each object should have the following property -username -name -avatar_url', () => {
          return request(app)
          .get('/api/users')
          .expect(200)
          .then(({ body }) => {
            const { users } = body;
            expect(users).toBeInstanceOf(Array);
            users.forEach((user) => {
                expect(user).toEqual(
                  expect.objectContaining({
                    avatar_url: expect.any(String),
                    name: expect.any(String),
                    username: expect.any(String),
                }))
            })
          })
      })
      test('404; handles bad paths', () => {
        return request(app)
        .get('/api/bad_path')
        .expect(404)
        .then(({body: { msg }}) => {
          expect(msg).toBe('Invalid Path')
        })
      })
    })
      
    describe("5. GET /api/reviews/:review_id", () => {
    test('should return a review object with comment_count added on', () => {
      return request(app)
        .get('/api/reviews/2')
        .expect(200)
        .then(({ body }) => {
          const { review } = body;
              expect(review).toEqual(
                expect.objectContaining({
                  category: expect.any(String),
                  created_at: expect.any(String),
                  designer: expect.any(String),
                  owner: expect.any(String),
                  review_body: expect.any(String),
                  review_id: expect.any(Number),
                  review_img_url: expect.any(String),
                  title: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String)
                })
              )
        })
      })
    })

    describe("6. GET /api/reviews", () => {
      test('should return an array of review objects sorted by date', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeInstanceOf(Array);
            expect(reviews).toHaveLength(6);
            reviews.forEach((review) => {
              expect(review).toEqual(
                expect.objectContaining({
                  category: expect.any(String),
                  created_at: expect.any(String),
                  designer: expect.any(String),
                  owner: expect.any(String),
                  review_body: expect.any(String),
                  review_id: expect.any(Number),
                  review_img_url: expect.any(String),
                  title: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String)
                })
              )
            })
          })
        })
    })

    describe("7. GET /api/reviews/:review_id/comments", () => {
    test('should return an array of comment objects relating to review_id', () => {
      return request(app)
        .get('/api/reviews/3/comments')
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(3);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                body: expect.any(String),
                review_id: 3,
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String)
              })
            )
          })
        })
      })
      test('404; handles incorrect id', () => {
        return request(app)
        .get('/api/reviews/50/comments')
        .expect(404)
        .then(({body: { msg }}) => {
          expect(msg).toBe("No review found for review_id: 50")
        })
      })
      test('200; handles id with no comments', () => {
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(200)
        .then(({body: { comments }}) => {
          expect(comments).toEqual([])
        })
      })
      test('404; handles id that is not a number', () => {
        return request(app)
        .get('/api/reviews/bad_request/comments')
        .expect(404)
        .then(({body: { msg }}) => {
          expect(msg).toBe('Invalid ID')
        })
      })
    })
    
    describe("8. POST /api/reviews/:review_id/comments", () => {
        test('should take an object in the form `{ inc_votes: newVote } and update it to new value', () => {
          const userComment = {
            username: "mallionaire",
            body: "You see tracy medicine isnt an exact science"
          };
          const finalResult = {
            comment_id: expect.any(Number),
            author: "mallionaire",
            body: "You see tracy medicine isnt an exact science",
            review_id: 2,
            created_at: expect.any(String),
            votes: 0
          }  
          return request(app)
            .post('/api/reviews/2/comments')
            .send(userComment)
            .expect(201)
            .then(({ body }) => {
              const { comment } = body;
                  expect(comment).toEqual(finalResult)
            })
        })
          test('400; handles incorrect id number', () => {
            const userComment = {
              username: "mallionaire",
              body: "You see tracy medicine isnt an exact science"
            };
            return request(app)
            .post('/api/reviews/50/comments')
            .send(userComment)
            .expect(400)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('No review found for review_id: 50')
            })
          })
          
          test('404; handles incorrect packet info', () => {
            const newReviewInfo = {};
            return request(app)
            .post('/api/reviews/2/comments')
            .send(newReviewInfo)
            .expect(404)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('Invalid Packet')
            })
          })
          
          test('400; handles id as string ', () => {
            const userComment = {
              username: "mallionaire",
              body: "You see tracy medicine isnt an exact science"
            };
            return request(app)
            .post('/api/reviews/string/comments')
            .send(userComment)
            .expect(400)
            .then(({body: { msg }}) => {         
              expect(msg).toBe('Invalid ID')
            })
          })
    })
})
