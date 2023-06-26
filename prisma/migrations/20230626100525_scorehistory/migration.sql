-- CreateTable
CREATE TABLE "ScoreHistory" (
    "id" BIGSERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "ammount" INTEGER NOT NULL,
    "issuerId" BIGINT,
    "receiverId" BIGINT NOT NULL,

    CONSTRAINT "ScoreHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreHistory" ADD CONSTRAINT "ScoreHistory_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreHistory" ADD CONSTRAINT "ScoreHistory_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
