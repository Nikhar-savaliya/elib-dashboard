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
import { login } from "@/api_utils/api";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "logged in successfully",
        duration: 1500,
      });
      navigate("/dashboard/home");
    },
  });

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return toast({
        variant: "destructive",
        title: "Please enter email and password correctly",
        duration: 1500,
      });
    }

    // make server call
    mutation.mutate({ email, password });
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required ref={emailRef} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required ref={passwordRef} />
          </div>
          <Button className="w-full" onClick={handleLogin}>
            Sign in
          </Button>
          <div className="mt-2 text-sm text-center ">
            Don't have an account?{" "}
            <Link to="/auth/register" className="underline">
              register
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
