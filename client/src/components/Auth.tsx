import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function signIn() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <div className="max-w-sm mx-auto mt-24 space-y-4">
      <h1 className="text-xl font-semibold text-center">Sign in</h1>

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border px-3 py-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-primary text-white py-2 rounded"
        onClick={signIn}
        disabled={loading}
      >
        Sign in
      </button>

      <button
        className="w-full border py-2 rounded"
        onClick={signUp}
        disabled={loading}
      >
        Sign up
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
