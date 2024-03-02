# Hotel Booking Application
-------------------------------
### Keywords:
Password Authentication - API Authentication - Concurrency - postgreSQL - GraphQl - nextJs - unique contraints - NodeJs - JWT - Express.
### Things to expect:
1. A Basic Level functioning application which handles concurent requests enables used to book properties for provided dates.
2. Implemented Authentication, GraphQl and REST api's. 
3. provided a detailed ER diagram for this system in ER diagrams folder form backend folder
4. I have considered this project as a kind of *Airbnb*. I have considered **One hotel can be booked by one user only on any selected date**.
5. use deafult alert as a error popup just to simplify the application.

### User manual:
1. Provide .env file as .env.example
2. run the SQL Queries. in sql.sql . As postgresQL gist contriaint extension is used recomended to run scripts manully rather than generating migration scripts.
3. run `npm i` for backend and `npm i --legacy-peer-deps` for front end.
4. add few hotels in "Hotels" table because there is no functionality in app to Insert new Hotels.
5. And run `node app.js` and `npm run dev` in both the folders and you can use the application

### How concurrency is achieved:
FORMULATING ISSUE:
1. lets say U1 and U2 wants to book H1 hotel from Feb 14th to 15th. If Both Clicks on "Book" at the same time. We should not forward both the users for payment. we should only forward 1 user by blocking the dates
2. If user fails to pay for the booking or if transaction is failed. We should unblock previously blocked dates for users to book.

SOLUTION:
1. I have created a table called "BlockingTable". When 2 users book at the same time. We try to enter details into this BlockingTable.
2. In this table We only do automic entries and there is a Unique contraint on the HotelId and new entry dates should not overlap with existing entries.
3. By this way no duplicate entry will be inserted for same Hotel on overlaping dates.
4. Once users payment is done. we will Insert the booking in "Bookings Table" now we can delete blocked entry from BlockingTable.
5. If User fails to Complete the payment in given time. We cannot block the entries for ever. So we delete the entries which are older than payment time limit. we can do soft delete or we can set a cron job to delete stale entries.