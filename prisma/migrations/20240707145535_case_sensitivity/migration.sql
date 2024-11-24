ALTER TABLE "User" RENAME TO "User_temp";

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL COLLATE NOCASE,
    "email" TEXT NOT NULL COLLATE NOCASE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "User" ("id", "username", "email", "password", "role", "avatar", "createdAt", "updatedAt")
SELECT "id", "username", "email", "password", "role", "avatar", "createdAt", "updatedAt" FROM "User_temp";

DROP INDEX "User_username_key";
DROP INDEX "User_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");


DROP TABLE "User_temp";