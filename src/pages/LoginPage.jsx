import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, ArrowRight, Shield, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import PortalBrandLogo from '../components/common/PortalBrandLogo';
import PosterBanner from '../components/common/PosterBanner';
import CloudflareCaptcha from '../components/common/CloudflareCaptcha';

const LoginPage = () => {
  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password) {
      setErrorMessage('Please enter your credentials to log in.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await login(identifier.trim(), password, role);

      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        if (res.user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please verify your credentials.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (type) => {
    if (type === 'admin') {
      setRole('admin');
      setIdentifier('admin@campusfix.com');
      setPassword('Admin@123');
      setErrorMessage('');
    } else {
      setRole('student');
      setIdentifier('rahul.sharma@campus.edu');
      setPassword('Student@123');
      setErrorMessage('');
    }
  };

  return (
    <div className="portal-bg-gradient flex flex-col justify-center items-center px-4 py-6 sm:py-8 relative min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-[760px] relative z-10"
      >
        {/* Compact Frosted Landscape Card */}
        <div className="portal-login-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/60 shadow-2xl">
          {/* Top-Left Brand Logo */}
          <div className="mb-4 flex items-center justify-between">
            <PortalBrandLogo />
            <span className="hidden sm:inline-block text-[9px] font-bold text-[#174785]/80 uppercase tracking-widest bg-white/60 px-2.5 py-0.5 rounded-full border border-white/80 shadow-sm">
              Grievance Portal
            </span>
          </div>

          {/* 2-Column Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left Column: Poster Banner */}
            <div className="hidden md:block h-full min-h-[350px]">
              <PosterBanner />
            </div>

            {/* Right Column: Login Form */}
            <div className="flex flex-col justify-center space-y-3.5">
              {/* Form Title */}
              <div>
                <div className="flex items-baseline">
                  <span className="text-[#38a169] text-xl sm:text-2xl font-black tracking-tight">
                    LOGIN
                  </span>
                  <span className="text-[#174785] text-xs sm:text-sm font-black ml-2 uppercase tracking-wide">
                    {role === 'student' ? 'STUDENT' : 'ADMIN'}
                  </span>
                </div>

                {/* Role Switcher */}
                <div className="mt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setRole(role === 'student' ? 'admin' : 'student');
                      setErrorMessage('');
                    }}
                    className="text-[11px] font-bold text-[#15559A] hover:underline"
                  >
                    Click here for {role === 'student' ? 'admin login' : 'student login'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-700 font-medium flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Identifier Pill Input */}
                <div className="portal-pill-input px-3.5 py-1.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      role === 'admin'
                        ? 'admin@campusfix.com'
                        : '12902024 or student@campus.edu'
                    }
                    required
                    disabled={isLoading}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Password Pill Input */}
                <div className="portal-pill-input px-3.5 py-1.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                    <Lock className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    required
                    disabled={isLoading}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Cloudflare Verification Widget */}
                <div>
                  <CloudflareCaptcha />
                </div>

                {/* Navy Blue Pill Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-5 rounded-full text-xs font-extrabold text-white bg-[#174785] hover:bg-[#0f3566] active:bg-[#0a274d] tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>LOGGING IN...</span>
                    </>
                  ) : (
                    <span>LOGIN</span>
                  )}
                </button>
              </form>

              {/* Bottom Helpers */}
              <div className="text-center space-y-1.5 pt-0.5">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[10px] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Forgot Username / Password?
                  </button>
                </div>

                {role === 'student' && (
                  <p className="text-[11px] text-slate-600">
                    New Student?{' '}
                    <Link
                      to="/register"
                      className="font-bold text-[#174785] hover:underline"
                    >
                      Create CampusFix Account
                    </Link>
                  </p>
                )}
              </div>

              {/* Quick Demo Autofill Chip (Admin Only) */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin')}
                  className="px-3 py-1 bg-white/90 hover:bg-white text-[10px] font-bold text-[#174785] rounded-full border border-slate-300 shadow-sm transition-all flex items-center gap-1"
                >
                  <Shield className="w-3 h-3 text-[#174785]" />
                  <span>Admin Demo Credentials</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Home Backlink */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-xs font-semibold text-white/90 hover:text-white drop-shadow transition-colors"
          >
            ← Back to Home Page
          </Link>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#174785] flex items-center justify-center mb-2.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Password Recovery</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Password resets are handled automatically via your student institutional email or through Campus IT Support.
            </p>
            <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-700 border border-slate-200">
              it-support@campusfix.edu / Room 102
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#174785] hover:bg-[#0f3566] rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
