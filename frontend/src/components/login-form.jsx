import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { logIn } from "../services/Todoservices"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export function LoginForm({
  className,
  ...props
}) 
  
{
 ;
 const {setUser}=useAuth();
 const navigate = useNavigate();
   const handleLogin=async (e)=>{
    e.preventDefault();
    try {
        const res = await logIn({ email, password });
        console.log("Login success:", res);
          setUser(res.data.user);
        navigate('/')
      } catch (err) {
        console.error(
          "Login failed:",err.message);
      }
   }
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action='/api/login' method="POST">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your TaskFlow account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full" onClick={(e)=>handleLogin(e)}>
                Login
              </Button>
              
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/public/cole.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
