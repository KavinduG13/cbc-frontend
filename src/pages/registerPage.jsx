import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    async function register() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(
                import.meta.env.VITE_API_URL + "/api/users",
                { 
                    email: email, 
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }
            ); 

            toast.success("Registration successful! You can now log in.");
            navigate("/login");

        } catch (e) {
            console.error("Login failed: ", e);
            toast.error("Login failed. Please check your credentials")
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">
            {/* Right auth panel */}
            <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center p-6">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="md:hidden flex justify-center mb-8">
                        <img
                            src="/logo.png"
                            alt="CBC - Crystal Beauty Clear"
                            className="w-28 drop-shadow"
                        />
                    </div>

                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 pointer-events-none" />
                        {/* Card */}
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 space-y-6">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-semibold text-white flex justify-center items-center">
                                    Register Now
                                </h1>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-white/90"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        {/* Mail icon */}
                                        <svg
                                            className="h-5 w-5 text-white/60"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M4 6h16v12H4z" />
                                            <path d="m22 6-10 7L2 6" />
                                        </svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        enterKeyHint="next"
                                        placeholder="you@example.com"
                                        aria-describedby="email-hint"
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/95 text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/50 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="firstName"
                                    className="text-sm font-medium text-white/90"
                                >
                                    First Name
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">                                    </span>
                                    <input
                                        id="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        placeholder="e.g. John"
                                        required
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/95 text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/50 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="lastName"
                                    className="text-sm font-medium text-white/90"
                                >
                                    Last Name
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">                                    </span>
                                    <input
                                        id="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        placeholder="e.g. Doe"
                                        required
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/95 text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/50 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-white/90"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        {/* Lock icon */}
                                        <svg
                                            className="h-5 w-5 text-white/60"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <rect x="4" y="11" width="16" height="9" rx="2" />
                                            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter Your New Password"
                                        aria-describedby="password-hint"
                                        required
                                        enterKeyHint="go"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/95 text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/50 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-medium text-white/90"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        {/* Lock icon */}
                                        <svg
                                            className="h-5 w-5 text-white/60"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <rect x="4" y="11" width="16" height="9" rx="2" />
                                            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Confirm Your Password"
                                        aria-describedby="password-hint"
                                        required
                                        enterKeyHint="go"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/95 text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/50 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center text-primary text-sm">
                                Already have an account?  
                                <Link
                                    to="/login"
                                    className="text-accent hover:text-white transition underline underline-offset-4"
                                >
                                    Log in
                                </Link>
                            </div>

                            {/* Button */}
                            <button
                                onClick={register}
                                aria-label="Login to your CBC account"
                                className="group relative w-full h-12 rounded-2xl font-semibold tracking-wide text-[color:var(--color-secondary)] bg-[color:var(--color-accent)] hover:brightness-105 active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60"
                            >
                                <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)]/40 to-white/0" />
                                <div className="flex items-center justify-center gap-2">
                                    <span>Register</span>
                                    <svg
                                        className="h-5 w-5 transition -translate-x-0 group-hover:translate-x-0.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Fine print */}
                            <p className="text-center text-xs text-white/60">
                                By continuing, you agree to our{" "}
                                <a href="#" className="underline hover:text-white">
                                    Terms
                                </a>{" "}
                                and{" "}
                                <a href="#" className="underline hover:text-white">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Decorative bottom bar */}
                    <div className="mt-6 h-1 w-32 rounded-full mx-auto bg-gradient-to-r from-[color:var(--color-accent)] via-white/70 to-[color:var(--color-primary)]/80" />
                </div>
            </div>
            {/* Left brand panel */}
            <div className="hidden md:block w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-secondary)]/80 via-[color:var(--color-secondary)]/60 to-[color:var(--color-accent)]/50 backdrop-blur-[2px]" />
                <div className="relative z-10 h-full w-full flex flex-col justify-between p-10">
                    <img
                        src="/logo.png"
                        alt="CBC - Crystal Beauty Clear"
                        className="w-40 drop-shadow-xl"
                    />
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold text-white leading-tight drop-shadow">
                            Welcome to{" "}
                            <span className="text-[color:var(--color-accent)]">CBC</span>
                        </h2>
                        <p className="mt-4 text-base/relaxed text-white/80">
                            Crystal Beauty Clear — premium cosmetics for every glow. Sign up
                            to reorder your favorites, track deliveries, and unlock member
                            offers.
                        </p>
                    </div>
                    <div className="text-white/70 text-xs">
                        © {new Date().getFullYear()} Crystal Beauty Clear
                    </div>
                </div>
            </div>
        </div>
    );
}
