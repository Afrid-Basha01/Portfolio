# Assignment 3 API Tests

# 1. Health Check (Task B1)
curl -X GET http://localhost:5000/

# 2. Get All Projects (Task B2)
curl -X GET http://localhost:5000/api/projects

# 3. Get Single Project - SUCCESS (Task B3)
curl -X GET http://localhost:5000/api/projects/1

# 4. Get Single Project - FAILURE / NOT FOUND (Task B3)
curl -X GET http://localhost:5000/api/projects/999

# 5. Submit Contact Form - SUCCESS (Task B4)
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Mohammad Afrid Basha","email":"afrid@example.com","message":"Testing the backend assignment!"}'

# 6. Submit Contact Form - FAILURE / MISSING FIELD (Task B4)
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Mohammad Afrid Basha","message":"I forgot to include my email address!"}'

# 7. Submit Contact Form - FAILURE / INVALID EMAIL (Task B4)
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Mohammad Afrid Basha","email":"not-an-email","message":"Testing invalid email format!"}'

# 8. List Contact Submissions (Task B5)
curl -X GET http://localhost:5000/api/contact

# 9. Test Catch-all 404 Handler - UNDEFINED ROUTE (Task B6)
curl -X GET http://localhost:5000/api/this-route-does-not-exist

# 10. Test Global Error Handler - SERVER CRASH PREVENTION (Task B6)
curl -X GET http://localhost:5000/api/crash-test