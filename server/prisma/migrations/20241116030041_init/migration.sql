-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Movie" (
    "movieId" SERIAL NOT NULL,
    "movieName" TEXT NOT NULL,
    "movieCategory" TEXT NOT NULL,
    "movieRating" INTEGER NOT NULL,
    "movieVotes" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
