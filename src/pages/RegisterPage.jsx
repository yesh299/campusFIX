import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, BadgeCheck, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { COLLEGE_DEPARTMENTS } from '../utils/constants';
import PortalBrandLogo from '../components/common/PortalBrandLogo';
import PosterBanner from '../components/common/PosterBanner';
import CloudflareCaptcha from '../components/common/CloudflareCaptcha';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    department: COLLEGE_DEPARTMENTS[0],
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { name, email, studentId, department, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !studentId.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await register({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        studentId: studentId.toUpperCase().trim(),
        department,
        password,
      });

      if (res.success) {
        toast.success('Your student account has been created successfully!');
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
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
        <div className="portal-login-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/60 shadow-2xl">
          {/* Top Brand Logo */}
          <div className="mb-4 flex items-center justify-between">
            <PortalBrandLogo />
            <span className="hidden sm:inline-block text-[9px] font-bold text-[#174785]/80 uppercase tracking-widest bg-white/60 px-2.5 py-0.5 rounded-full border border-white/80 shadow-sm">
              New Student Enrollment
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left Column: Poster Banner */}
            <div className="hidden md:block h-full min-h-[380px]">
              <PosterBanner />
            </div>

            {/* Right Column: Register Form */}
            <div className="flex flex-col justify-center space-y-3">
              <div>
                <div className="flex items-baseline">
                  <span className="text-[#38a169] text-xl sm:text-2xl font-black tracking-tight">
                    REGISTER
                  </span>
                  <span className="text-[#174785] text-xs sm:text-sm font-black ml-2 uppercase tracking-wide">
                    STUDENT ACCOUNT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Create your profile to submit & track campus issues
                </p>
              </div>

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

              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Full Name */}
                <div className="portal-pill-input px-3.5 py-1.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name (e.g. Rahul Sharma)"
                    required
                    disabled={isLoading}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="portal-pill-input px-3.5 py-1.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="College Email (student@campus.edu)"
                    required
                    disabled={isLoading}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Student ID & Dept 2-Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="portal-pill-input px-3 py-1.5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="Student ID / Roll No"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="portal-pill-input px-3 py-1.5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                      <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      {COLLEGE_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept.split(' ')[0]}...
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="portal-pill-input px-3 py-1.5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                      <Lock className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="portal-pill-input px-3 py-1.5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300/60 flex items-center justify-center shrink-0">
                      <Lock className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cloudflare Verification Widget */}
                <div>
                  <CloudflareCaptcha />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-5 rounded-full text-xs font-extrabold text-white bg-[#174785] hover:bg-[#0f3566] active:bg-[#0a274d] tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>CREATING ACCOUNT...</span>
                    </>
                  ) : (
                    <span>CREATE ACCOUNT</span>
                  )}
                </button>
              </form>

              <div className="text-center pt-0.5">
                <p className="text-[11px] text-slate-600">
                  Already registered?{' '}
                  <Link to="/login" className="font-bold text-[#174785] hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-xs font-semibold text-white/90 hover:text-white drop-shadow transition-colors"
          >
            ← Back to Home Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
