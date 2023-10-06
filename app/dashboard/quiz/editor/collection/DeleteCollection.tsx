"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { collectionApi } from "@/lib/redux/api/collectionApi";
import React from "react";
import { Button } from "@/components/ui/button";

function DeleteCollection() {
  const { data } = collectionApi.useGetCollectionQuery();
  const [removeCollection, removeCollectionRes] =
    collectionApi.useRemoveCollectionMutation();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delete Collection</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {data?.data.map((c) => (
            <li className="flex flex-col font-light" key={c.id}>
              <h1>{c.collectionName}</h1>
              <button
                disabled={removeCollectionRes.isLoading}
                onClick={() => {
                  removeCollection(c.id);
                }}
                className="px-3 font-light rounded-sm w-fit text-destructive-foreground bg-destructive"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default DeleteCollection;
