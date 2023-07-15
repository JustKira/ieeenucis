"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserTaskByIdQuery } from "@/lib/redux/api/tasksApi";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import React from "react";
import { marked } from "marked";
import { QuickLoader } from "@/components/ui/loaders";
import { convertTime } from "@/lib/helper/dateConverter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

function page({ params }: { params: { utid: string } }) {
  const supabase = createClientComponentClient<Database>();
  const [files, setFiles] = React.useState<FileList>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const userData = useGetSingleUserQuery(-1);
  const getUserTaskByIdRes = useGetUserTaskByIdQuery({
    uid: userData.data?.uid || "",
    id: params.utid,
  });
  const { toast } = useToast();

  const UploadFiles = async (taskId: number, userTaskId: number) => {
    if (!files) return;
    setLoading(true);
    const filesInfo: { download: any; fileName: string; type: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      console.log("Uploading");
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(`private/tid_${taskId}/${files[i].name}`, files[i]);
      if (data) {
        filesInfo.push({
          download: data,
          fileName: files[i].name,
          type: files[i].type,
        });
      }
      if (error) {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      }
      const uploadFileDBRes = await supabase
        .from("UploadFile")
        .insert(filesInfo)
        .select();

      if (uploadFileDBRes.error) {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: uploadFileDBRes.error.message,
        });
      }

      const UserTaskFileIds = uploadFileDBRes.data.map((v, id) => ({
        userTaskId: userTaskId,
        uploadFileId: v.id,
      }));
      const userTaskFileUpload = await supabase
        .from("UserTaskUploadFile")
        .insert(UserTaskFileIds)
        .select();

      if (userTaskFileUpload.error) {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: userTaskFileUpload.error.message,
        });
      }
    }

    setLoading(false);
    return toast({
      variant: "additive",
      title: "Files Uploaded",
    });
  };

  const FilesUploaded = () => {
    if (!files) return <></>;
    const FilesJSX: JSX.Element[] = [];
    for (let i = 0; i < files.length; i++) {
      FilesJSX.push(
        <div className="p-2 text-sm font-light">{files[i].name}</div>
      );
    }
    return FilesJSX;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-baseline justify-between font-medium capitalize ">
            {getUserTaskByIdRes.data?.data.Task.title}
            <div className="">
              {getUserTaskByIdRes.data?.data.approved ? (
                <>Task has been Approved</>
              ) : getUserTaskByIdRes.data?.data?.finished ? (
                <Button
                  // onClick={() => {
                  //   UpdateTask(false, task.id);
                  // }}
                  disabled={getUserTaskByIdRes.isLoading}
                >
                  <QuickLoader loading={getUserTaskByIdRes.isLoading} />
                  Undo Turn In
                </Button>
              ) : (
                <Button
                  // onClick={() => {
                  //   UpdateTask(true, task.id);
                  // }}
                  disabled={getUserTaskByIdRes.isLoading}
                >
                  <QuickLoader loading={getUserTaskByIdRes.isLoading} />
                  Turn In
                </Button>
              )}
            </div>
          </CardTitle>

          <CardDescription>
            {getUserTaskByIdRes.data?.data.Task.dueDate ? (
              <> {convertTime(getUserTaskByIdRes.data?.data.Task.dueDate)}</>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardHeader>
        <div className="flex items-center justify-center">
          <Separator className="w-[98%] mb-6" />
        </div>
        {getUserTaskByIdRes.data?.data.Task ? (
          <CardContent>
            {getUserTaskByIdRes.data?.data.Task.description ? (
              <div
                className="mdx"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(
                    getUserTaskByIdRes.data.data.Task.description
                  ),
                }}
              />
            ) : (
              <></>
            )}

            {getUserTaskByIdRes.data.data.Task.id !== undefined &&
            getUserTaskByIdRes.data.data.Task.allowUpload ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-start gap-4 my-2 w-fit">
                  <Input
                    title="designs upload"
                    type="file"
                    id="designs"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) setFiles(e.target.files);
                    }}
                  />
                  <Button
                    disabled={loading}
                    onClick={() => {
                      if (getUserTaskByIdRes.data?.data.Task.id) {
                        UploadFiles(
                          getUserTaskByIdRes.data?.data.Task.id,
                          getUserTaskByIdRes.data.data.id
                        );
                      }
                    }}
                  >
                    <QuickLoader loading={loading} />
                    Upload
                  </Button>
                </div>
                <Card className="flex flex-col gap-1 p-2">
                  <FilesUploaded />
                </Card>
              </div>
            ) : (
              <></>
            )}
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default page;
