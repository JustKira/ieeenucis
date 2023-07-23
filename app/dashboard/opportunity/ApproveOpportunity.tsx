import GenericOpportunitiesApprovalList from "@/components/generics/GenericOpportunitiesApprovalList";
import GenericUserTaskApprovalList from "@/components/generics/GenericUserTaskApprovalList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuickLoader } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { convertTime } from "@/lib/helper/dateConverter";
import { useApproveOpportunityMutation } from "@/lib/redux/api/opportunitiesApi";
import { useApproveApplicantsMutation } from "@/lib/redux/api/opportunitiesSupaApi";
import { useApproveTaskFuncMutation } from "@/lib/redux/api/tasksSupaApi";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { OpportunityRequest, UserTask } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";

function ApproveOpportunity() {
  const [page, setPage] = useState<number>(0);
  const [opporuntityRequest, setOpporuntityRequest] =
    useState<OpportunityRequest | null>();
  const { toast } = useToast();
  const [approveApplicants, { isLoading, isError, error }] =
    useApproveOpportunityMutation();
  const { data } = useGetSingleUserQuery(-1);

  if (!data) {
    return <div>err</div>;
  }

  return (
    <div className="flex gap-2">
      <Card className="sticky top-0 w-1/3 h-full">
        <CardHeader>
          <CardTitle>Opportunity List</CardTitle>
        </CardHeader>

        <CardContent>
          <GenericOpportunitiesApprovalList
            defaultFinished={true}
            per={8}
            singleSelection={opporuntityRequest?.id || null}
            onClick={(opporuntityRequest) => {
              setOpporuntityRequest(opporuntityRequest);
            }}
          />
        </CardContent>
      </Card>
      <Card className="sticky w-full h-full">
        <CardHeader>
          <CardTitle>User Task Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {opporuntityRequest ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>User Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-lg capitalize">
                    {opporuntityRequest?.User?.firstname}
                    {opporuntityRequest?.User?.lastname}
                  </h1>
                  <h1 className="font-thin text-primary/70">
                    {opporuntityRequest?.User?.email}
                  </h1>
                  <h1 className="font-thin text-primary/70">
                    {opporuntityRequest?.User?.phonenumber}
                  </h1>
                  <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                    User Score -{" "}
                    <Badge>{opporuntityRequest?.User?.score}</Badge>
                  </h1>
                  <Separator className="my-2" />
                  {opporuntityRequest?.approved ? (
                    <></>
                  ) : (
                    <>
                      <div className="flex gap-2 my-2">
                        <Button
                          disabled={isLoading}
                          onClick={async () => {
                            if (
                              opporuntityRequest.User &&
                              opporuntityRequest.Opportunity
                            ) {
                              await approveApplicants({
                                uid: opporuntityRequest.User.uid,
                                orid: opporuntityRequest.id,
                              });
                              if (isError) {
                                const errorMessage = error as PostgrestError;
                                return toast({
                                  variant: "destructive",
                                  title: "Uh oh! Something went wrong.",
                                  description: errorMessage.message,
                                });
                              } else {
                                setOpporuntityRequest(null);
                                return toast({
                                  variant: "additive",
                                  title: `{${opporuntityRequest.User.firstname} ${opporuntityRequest.User.lastname}} Approvel`,
                                });
                              }
                            }
                            return toast({
                              variant: "destructive",
                              title: "Uh oh! Something went wrong.",
                            });
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <h1 className="text-lg capitalize">
                    {opporuntityRequest?.Opportunity?.title}
                  </h1>

                  <div className="flex flex-col space-y-2">
                    <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                      Due -{""}
                      {opporuntityRequest?.Opportunity?.deadline ? (
                        <Badge>
                          {convertTime(opporuntityRequest.Opportunity.deadline)}
                        </Badge>
                      ) : (
                        <></>
                      )}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>Select task</>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ApproveOpportunity;
