import { useState } from 'react';
import { Mail, Lock, ArrowRight, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // SET SESSION BASED ON CHECKBOX
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");

    } catch (err) {
      setError("Email atau password salah.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen login-bg flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex-1 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8">

        {/* Logo and Domain */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#013b82] p-3 rounded-xl mb-4 shadow-lg text-white">
            <Box size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-[#013b82]">PT. Arvian Tiga Putra</h1>
        </div>

        {/* Login Card */}
        <div className="bg-white px-8 py-10 shadow-xl rounded-2xl w-full max-w-md relative z-10 transition-transform duration-300">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Portal Inventaris Sistem</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="name@arviantigaputra.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Kata Sandi"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              rightAction={
                <a href="#" className="text-xs font-semibold text-[#013b82] hover:text-brand-dark hover:underline">
                  Lupa Kata Sandi?
                </a>
              }
            />

            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-dark focus:ring-brand-dark text-[#013b82]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Ingat Saya
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <Button type="submit">
              Masuk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Need technical assistance? Contact our <a href="#" className="text-[#013b82] font-semibold hover:underline">IT Support Helpdesk</a> or view the <br />
          <a href="#" className="text-[#013b82] font-semibold hover:underline mt-1 inline-block">User Manual.</a>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 px-8 flex justify-between items-center text-xs text-slate-500">
        <div>
          © 2024 PT. Arvian Tiga Putra. All rights reserved.
        </div>
        <div className="space-x-6 flex">
          <a href="#" className="hover:text-slate-800 hover:underline">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 hover:underline">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 hover:underline">IT Support</a>
        </div>
      </div>
    </div>
  );
}
