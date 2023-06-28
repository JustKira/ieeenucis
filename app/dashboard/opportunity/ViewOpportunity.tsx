"use client";
import GenericOpportunitiesList from "@/components/generics/GenericOpportunitiesList";
import { Opportunity } from "@/types";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertTime } from "@/lib/helper/dateConverter";
import { marked } from "marked";
import { ScrollArea } from "@/components/ui/scroll-area";

import { QuickLoader } from "@/components/ui/loaders";
import {
  useCreateOpportunityRequestMutation,
  useDeleteOpportunityRequestMutation,
} from "@/lib/redux/api/opportunitiesSupaApi";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";
function ViewOpportunity() {
  const { toast } = useToast();

  const [opportunity, setOpportunity] = useState<Opportunity | null>();
  const {
    data: userData,
    isError: isGetUserError,
    error: getUserError,
  } = useGetSingleUserQuery(-1);
  const [
    createOpportunityRequest,
    {
      isLoading: isCreateOpportunityLoading,
      isError: isCreateOpportunityError,
      error: createOpportunityError,
    },
  ] = useCreateOpportunityRequestMutation();
  const [
    deleteOpportunityRequest,
    {
      isLoading: isDeleteOpportunityLoading,
      isError: isDeleteOpportunityError,
      error: deleteOpportunityError,
    },
  ] = useDeleteOpportunityRequestMutation();

  const applyOpportunity = (userId: number, opportunityId: number) => {
    createOpportunityRequest({
      userId: userId,
      opportunityId: opportunityId,
    });
    if (isCreateOpportunityError) {
      const errorMessage = createOpportunityError as PostgrestError;
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage.message,
      });
    } else {
      setOpportunity(null);
      return toast({
        variant: "additive",
        title: "you successfully applied for selected Opporunity request",
      });
    }
  };
  const unApplyOpportunity = (userId: number, opportunityId: number) => {
    deleteOpportunityRequest({
      userId: userId,
      opportunityId: opportunityId,
    });
    if (isDeleteOpportunityError) {
      const errorMessage = deleteOpportunityError as PostgrestError;
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage.message,
      });
    } else {
      setOpportunity(null);
      return toast({
        variant: "additive",
        title: "Removed Opporunity request",
      });
    }
  };

  return (
    <div className="flex flex-grow gap-2">
      <Card className="sticky top-0 w-1/4 h-full">
        <CardHeader>
          <CardTitle>Opportunity List</CardTitle>
          <CardDescription>...</CardDescription>
        </CardHeader>

        <CardContent>
          <GenericOpportunitiesList
            per={8}
            singleSelection={opportunity?.id || null}
            onClick={(opportunity) => {
              setOpportunity(opportunity);
            }}
          />
        </CardContent>
      </Card>

      <Card className="w-3/4 relative border-0 h-[52vh]">
        <CardHeader>
          <CardTitle className="text-5xl font-light">
            {opportunity?.title}
          </CardTitle>
          <CardDescription>
            {opportunity?.deadline ? (
              <> {convertTime(opportunity.deadline)}</>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardHeader>

        {opportunity ? (
          <CardContent>
            {opportunity?.description ? (
              <ScrollArea className="max-h-[40vh]">
                <div
                  className="mdx"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(opportunity.description),
                  }}
                />
              </ScrollArea>
            ) : (
              <></>
            )}

            <div className="flex flex-col items-start justify-start my-6 space-y-2">
              <h1>Attached Tasks</h1>
              {opportunity.OpportunityTask?.map((otask) => {
                return (
                  <Card className="relative w-full">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium capitalize ">
                        {otask?.Task?.title}
                      </CardTitle>
                      <CardDescription>
                        {otask?.Task?.dueDate ? (
                          <> {convertTime(otask?.Task?.dueDate)}</>
                        ) : (
                          <></>
                        )}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
            <div className="">
              {opportunity?.OpportunityRequest ? (
                <>
                  {" "}
                  {opportunity.OpportunityRequest?.length === 0 ? (
                    <Button
                      onClick={() => {
                        if (opportunity?.id && userData?.id) {
                          applyOpportunity(userData.id, opportunity.id);
                        }
                      }}
                      disabled={isCreateOpportunityLoading}
                    >
                      <QuickLoader loading={isCreateOpportunityLoading} />
                      Apply
                    </Button>
                  ) : opportunity?.OpportunityRequest[0]?.approved ? (
                    <>Approved Check Tasks</>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          if (opportunity?.id && userData?.id) {
                            unApplyOpportunity(userData.id, opportunity.id);
                          }
                        }}
                        disabled={isDeleteOpportunityLoading}
                      >
                        <QuickLoader loading={isDeleteOpportunityLoading} />
                        UnApply
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default ViewOpportunity;
