--import extension
CREATE EXTENSION btree_gist;

-- Create the "Users" table
CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL
);



-- Create the "Hotels" table
CREATE TABLE "Hotels" (
    "id" SERIAL PRIMARY KEY,
    "UUID" UUID DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "pricePerNight" DECIMAL(10, 2) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255)
);

-- Create the "Bookings" table
CREATE TABLE "Bookings" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "hotelId" INT NOT NULL,
    "checkInDate" DATE NOT NULL,
    "checkOutDate" DATE NOT NULL,
    "totalPrice" DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("hotelId") REFERENCES "Hotels" ("id") ON DELETE CASCADE
);

CREATE TABLE "BlockingTable" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "hotelId" INT NOT NULL,
    "checkInDate" DATE NOT NULL,
    "checkOutDate" DATE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("hotelId") REFERENCES "Hotels" ("id") ON DELETE cascade,
    CONSTRAINT prevent_double_bookings EXCLUDE USING gist
	(
	  "hotelId" WITH =, 
	  daterange("checkInDate", "checkOutDate", '[)') WITH &&
	)
);

--if you want to run corn jo for every 5 min you can run this also commenting this for now
--please uncomment and run these for good exp.

-- BEGIN;

-- SELECT cron.schedule('*/15 * * * *', 
--                      $$DELETE FROM "BlockingTable" 
--                        WHERE "created_at" <= NOW() - INTERVAL '15 minutes'$$);

-- COMMIT;

