-- CreateTable
CREATE TABLE "Opportunity" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityRequest" (
    "id" BIGSERIAL NOT NULL,
    "opportunityId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OpportunityRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityTask" (
    "id" BIGSERIAL NOT NULL,
    "taskId" BIGINT NOT NULL,
    "opportunityId" BIGINT NOT NULL,

    CONSTRAINT "OpportunityTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpportunityRequest" ADD CONSTRAINT "OpportunityRequest_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityRequest" ADD CONSTRAINT "OpportunityRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityTask" ADD CONSTRAINT "OpportunityTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityTask" ADD CONSTRAINT "OpportunityTask_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
