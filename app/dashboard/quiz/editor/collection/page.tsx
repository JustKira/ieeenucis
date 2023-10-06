import { CardContent } from "@/components/ui/card";
import React from "react";
import CreateCollectionForm from "./CreateCollectionForm";
import DeleteCollection from "./DeleteCollection";

export default function page() {
  return (
    <CardContent className="flex gap-4">
      <CreateCollectionForm />
      <DeleteCollection />
    </CardContent>
  );
}
