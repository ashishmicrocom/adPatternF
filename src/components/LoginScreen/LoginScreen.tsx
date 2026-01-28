"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginScreen.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Mode = "choose" | "email" | "phone" | "otp" | "success";

export default function LoginScreen({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // reset when closed
      setMode("choose");
      setEmail("");
      setPassword("");
      setPhone("");
      setOtp("");
      setGeneratedOtp(null);
      setMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // focus fields when mode changes
    if (mode === "email") emailRef.current?.focus();
    if (mode === "phone") phoneRef.current?.focus();
    if (mode === "otp") otpRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function chooseEmail() {
    setMode("email");
  }
  function choosePhone() {
    setMode("phone");
  }

  function goBack() {
    setMode("choose");
    setMessage(null);
  }

  function submitEmail(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    // TODO: wire real auth here. For now simulate success
    setTimeout(() => {
      setMode("success");
      setMessage("Logged in successfully (demo).");
      setTimeout(() => onClose(), 900);
    }, 600);
  }

  function submitPhone(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    if (!phone || phone.length < 6) {
      setMessage("Please enter a valid phone number.");
      return;
    }
    setSending(true);
    // simulate sending OTP
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setSending(false);
      setMode("otp");
      setMessage(`OTP sent to ${phone}`);
    }, 900);
  }

  function verifyOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setVerifying(true);
    setMessage(null);
    setTimeout(() => {
      setVerifying(false);
      if (generatedOtp && otp.trim() === generatedOtp) {
        setMode("success");
        setMessage("Phone verified — logged in (demo).");
        setTimeout(() => onClose(), 900);
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    }, 700);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ap-login__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="ap-login__center">
            <motion.div
              className="ap-login__card"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ap-login__left">
                <div className="ap-login__art" />
              </div>

              <div className="ap-login__right">
                <button className="ap-login__close" onClick={onClose} aria-label="Close">
                  ✕
                </button>

                {mode === "choose" && (
                  <>
                    <h2 className="ap-login__title">Login or sign up</h2>
                    <p className="ap-login__subtitle">Select a method to continue setting up your account.</p>

                    <div className="ap-login__actions">
                      <button className="ap-login__primary" onClick={chooseEmail}>
                        Continue with Email
                      </button>
                      <button className="ap-login__outline" onClick={choosePhone}>
                        Continue with Phone
                      </button>

                      <div className="ap-login__social">
                        <button className="ap-login__social-btn" aria-label="Continue with Google">
                          {/* Google G colored SVG */}
                          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.4 9.2 3.2l6.8-6.6C36.6 3.1 30.6 1 24 1 14 1 5.6 6.6 2 14.9l7.9 6.1C11.9 13.8 17.4 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.5h12.8c-.6 3.1-2.9 6.9-8 9.3l7.9 6.1C43.9 38 46.5 31.9 46.5 24.5z" />
                            <path fill="#4A90E2" d="M9.9 28.5A14.1 14.1 0 0 1 9.1 24c0-1.6.3-3.1.8-4.5L2 13.4C.7 16.6 0 20 0 24c0 4.1.9 7.9 2.6 11.2l7.3-6.7z" />
                            <path fill="#FBBC05" d="M24 46.9c6.6 0 12.6-2.2 16.9-6l-8-6.1c-2.3 1.5-5.3 2.6-8.9 2.6-6.6 0-12.1-4.3-14.2-10.2L2 34.6C5.6 42.9 14 46.9 24 46.9z" />
                          </svg>
                          <span>Google</span>
                        </button>

                        <button className="ap-login__social-btn ap-login__social-btn--apple" aria-label="Continue with Apple">
                          {/* Apple icon */}
                          <svg width="18" height="20" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M16.365 1.5c0 1.07-.38 2.09-1.07 2.86-.73.83-1.9 1.64-3.14 1.4-.13-.02-.25-.04-.36-.07-.8-.2-1.55-.86-2.2-1.57-.83-.92-1.57-1.95-1.57-3.02C7.41.36 8.82 0 10.15 0c1.41 0 2.73.6 3.66 1.5.64.64 1.02 1.4 1.05 2z" fill="#000" />
                            <path d="M22.2 9.5c-.16-.36-.35-.73-.53-1.1-.92-1.93-2.66-3.62-4.85-3.92-.55-.08-1.12-.12-1.7-.12-1.62 0-3.28.56-4.57 1.36-.96.6-1.78 1.42-2.46 2.12-1.22 1.2-2.25 2.7-2.67 4.37-.48 1.99-.14 4.06.92 5.77.82 1.42 2.58 3.13 4.5 3.08.75-.02 1.36-.24 2.04-.44.84-.26 1.7-.52 2.6-.5.9.02 1.66.28 2.42.55.88.3 1.8.6 2.75.56 1.93-.06 3.51-1.62 4.42-3.02.78-1.16 1.12-2.52 1.12-3.83 0-1.8-.68-3.46-1.76-4.9-.68-.9-1.52-1.66-2.45-2.41z" fill="#000" />
                          </svg>
                          <span>Apple</span>
                        </button>
                      </div>
                    </div>
                    <div className="ap-login__foot">If you are creating a new account, <a>Terms & Conditions</a> and <a>Privacy Policy</a> will apply.</div>
                  </>
                )}

                {mode === "email" && (
                  <form className="ap-form" onSubmit={submitEmail}>
                    <h2 className="ap-login__title">Sign in with Email</h2>
                    <label className="ap-label">
                      Email
                      <input ref={emailRef} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="ap-input" placeholder="you@company.com" />
                    </label>
                    <label className="ap-label">
                      Password
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ap-input" placeholder="Enter your password" />
                    </label>

                    <div className="ap-form-row">
                      <button type="button" className="ap-back-btn" onClick={goBack}>
                        ← Back
                      </button>
                      <button type="submit" className="ap-login__primary">
                        Sign in
                      </button>
                    </div>
                    {message && <div className="ap-message">{message}</div>}
                  </form>
                )}

                {mode === "phone" && (
                  <form className="ap-form" onSubmit={submitPhone}>
                    <h2 className="ap-login__title">Sign in with Phone</h2>
                    <label className="ap-label">
                      Mobile number
                      <input ref={phoneRef} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="ap-input" placeholder="+91 98765 43210" />
                    </label>

                    <div className="ap-form-row">
                      <button type="button" className="ap-back-btn" onClick={goBack}>
                        ← Back
                      </button>
                      <button type="submit" className="ap-login__primary" disabled={sending}>
                        {sending ? "Sending…" : "Send OTP"}
                      </button>
                    </div>
                    {message && <div className="ap-message">{message}</div>}
                  </form>
                )}

                {mode === "otp" && (
                  <form className="ap-form" onSubmit={verifyOtp}>
                    <h2 className="ap-login__title">Enter OTP</h2>
                    <p className="ap-login__subtitle">We sent a 6-digit code to {phone}.</p>
                    <label className="ap-label">
                      OTP
                      <input ref={otpRef} type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))} className="ap-otp-input" placeholder="123456" />
                    </label>

                    <div className="ap-form-row">
                      <button type="button" className="ap-back-btn" onClick={() => setMode("phone")}>{"← Edit number"}</button>
                      <button type="submit" className="ap-login__primary" disabled={verifying}>
                        {verifying ? "Verifying…" : "Verify & Continue"}
                      </button>
                    </div>
                    {message && <div className="ap-message">{message}</div>}
                    {/* demo helper - show generated OTP in small print for testing */}
                    {generatedOtp && <div className="ap-debug">Demo OTP: {generatedOtp}</div>}
                  </form>
                )}

                {mode === "success" && (
                  <div className="ap-success">
                    <h2 className="ap-login__title">Welcome</h2>
                    <p className="ap-login__subtitle">You're signed in. Closing shortly…</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
