-- DropForeignKey
ALTER TABLE "OpportunityRequest" DROP CONSTRAINT "OpportunityRequest_opportunityId_fkey";

-- AddForeignKey
ALTER TABLE "OpportunityRequest" ADD CONSTRAINT "OpportunityRequest_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
