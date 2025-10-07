#devTinder

##authRoter
-POST /signup
-POST /login
-POST /logout

##profileRouting
-GET /profile/view
-PATCH /profle/edit
-PATCH /profile/password

##connectionRequestRouter
-POST /request/send/interested/:userId
-POST /requwst/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requested

##userRouter
-GET /user/connections
-GET /user?requests
-GET .user/feed -gets you the profiles of the users on platform


status: ignore,intersted,accepted,rejected
