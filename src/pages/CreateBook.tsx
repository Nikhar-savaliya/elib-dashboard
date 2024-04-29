import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createBook } from "@/api_utils/api";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  coverImage: z
    .instanceof(FileList)
    .refine((file) => file.length === 1, "coverImage is required"),
  bookFile: z
    .instanceof(FileList)
    .refine((file) => file.length === 1, "bookFile is  required"),
});

const CreateBook = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const bookFileRef = form.register("bookFile");

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("genre", values.genre);
    formdata.append("description", values.description);
    formdata.append("coverImage", values.coverImage[0]);
    formdata.append("file", values.bookFile[0]);
    // console.log(formdata);
    mutation.mutate(formdata);
  }

  return (
    <section className="flex flex-col gap-6 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/books">books</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card x-chunk="dashboard-06-chunk-0" className="">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg">Add a new Book</CardTitle>
                <CardDescription>
                  Fill the below details and submit to add a new book
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Button variant={"outline"}>
                  <span>cancel</span>
                </Button>
                <Button type="submit">
                  <span>submit</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <>
                          <Input type="text" className="w-full" {...field} />
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input type="file" {...coverImageRef} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bookFile"
                  render={() => (
                    <FormItem>
                      <FormLabel>Book File</FormLabel>
                      <FormControl>
                        <Input type="file" {...bookFileRef} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <div className="text-xs text-muted-foreground">
                {/* Total <strong>{data?.data.length}</strong> books */}
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default CreateBook;
