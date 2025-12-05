import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔐 Starting login process...");
    try {
      // Use URLSearchParams for proper form-urlencoded format
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      console.log("📤 Sending login request...");
      const response = await api.post("/auth/login", params, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded" 
        },
      });

      console.log("✅ Response received:", response);
      console.log("📦 Response data:", response.data);
      console.log("🔑 Access token:", response.data.access_token);

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Login successful");
        navigate("/admin");
      } else {
        console.error("❌ No access token in response!");
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("❌ Login error:", error);
      console.error("📋 Error response:", error.response);
      console.error("📋 Error data:", error.response?.data);
      console.error("📋 Error status:", error.response?.status);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
