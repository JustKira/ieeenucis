"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import usePermission from "@/lib/hooks/usePermission";
import { ReloadIcon } from "@radix-ui/react-icons";

import React from "react";

const KaggleReload = ({ kid }: { kid: string }) => {
  const { toast } = useToast();
  const { checkPermission, isLoading } = usePermission();
  const reloadKaggle = async (kid: string) => {
    const res = await fetch(`/api/kaggle_record/${kid}`, {
      method: "POST",
    });
    console.log(await res.json());
    if (res.ok) {
      toast({
        variant: "additive",
        title: "Reload Successfull",
        description: "Kaggle has been updated successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "something went wronge",
      });
    }
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <>
      {checkPermission(
        ["admin_kaggle"],
        <>
          {" "}
          <Button
            onClick={() => {
              reloadKaggle(kid);
            }}
            className="rounded-full"
            variant={"outline"}
            size={"icon"}
          >
            <ReloadIcon />
          </Button>
        </>,
        <></>
      )}
    </>
  );
};

export default KaggleReload;
