import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAdminMeta, useAdminAuth } from "@/lib/auth";
import { toast } from "sonner";

const AdminLogin = () => {
  const { isAuthed, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAdminMeta();
  }, []);

  useEffect(() => {
    if (isAuthed) navigate("/admin", { replace: true });
  }, [isAuthed, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Welcome back, admin ✨");
      navigate("/admin", { replace: true });
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-6">
      <main className="w-full max-w-md rounded-2xl border border-accent/20 bg-card/70 backdrop-blur p-6 shadow-lg">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your admin password to manage products.</p>
        </header>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="gold" className="w-full">Sign in</Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">Protected admin area • Luxury Cosmetics</p>
      </main>
    </div>
  );
};

export default AdminLogin;
