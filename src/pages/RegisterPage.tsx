import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api_utils/api";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store";

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const setToken = useUserStore((state) => state.updateToken);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      setToken(data.accessToken);
      toast({
        variant: "success",
        title: "logged in successfully",
        duration: 1500,
      });
      navigate("/dashboard/home");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to login";
      toast({
        variant: "destructive",
        title: errorMessage,
        duration: 1500,
      });
    },
  });

  const handleRegister = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      return toast({
        variant: "destructive",
        title: "Please enter all the details to register",
        duration: 1500,
      });
    }

    // make server call
    mutation.mutate({ name, email, password });
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" ref={nameRef} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" ref={emailRef} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" ref={passwordRef} />
            </div>
            <Button type="submit" className="w-full" onClick={handleRegister}>
              {mutation.isPending ? (
                <Loader2 width={18} className="animate-spin" />
              ) : (
                "Create an Account"
              )}
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
