import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Camera,
  Layers,
  Bell,
  ArrowRight,
  School,
  Sparkles,
  Users,
  Building2,
  Wrench,
  Wifi,
  Zap,
  Droplets,
  HelpCircle,
  ChevronDown,
  Activity,
  Award,
  Shield,
  MessageSquare,
  Star,
  Quote,
  ThumbsUp,
} from "lucide-react";
import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeFaq, setActiveFaq] = useState(null);
  const [statCounts, setStatCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const targets = [5200, 24, 100, 12];
    const duration = 1600;
    const startTime = performance.now();
    let animationFrame;

    const updateCounts = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setStatCounts(
        targets.map((target) => Math.floor(target * easedProgress)),
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounts);
      }
    };

    animationFrame = requestAnimationFrame(updateCounts);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const stats = [
    {
      label: "Grievances Resolved",
      icon: CheckCircle2,
      color: "text-[#4CAF50]",
      format: (count) => `${count.toLocaleString()}+`,
    },
    {
      label: "Average Turnaround",
      icon: Clock,
      color: "text-[#35D0B5]",
      format: (count) => `< ${count} Hours`,
    },
    {
      label: "Transparent Audit Trail",
      icon: ShieldCheck,
      color: "text-[#FFBD58]",
      format: (count) => `${count}%`,
    },
    {
      label: "Campus Departments",
      icon: Layers,
      color: "text-[#3155E7]",
      format: (count) => `${count}+ Teams`,
    },
  ];

  const categories = [
    {
      name: "Internet / Wi-Fi",
      icon: Wifi,
      count: "Fast SLA",
      color: "from-blue-500/20 to-blue-600/10 border-blue-200",
    },
    {
      name: "Electricity & Lighting",
      icon: Zap,
      count: "Immediate",
      color: "from-amber-500/20 to-amber-600/10 border-amber-200",
    },
    {
      name: "Water & Plumbing",
      icon: Droplets,
      count: "High Priority",
      color: "from-cyan-500/20 to-cyan-600/10 border-cyan-200",
    },
    {
      name: "Classroom & AV",
      icon: School,
      count: "Same Day",
      color: "from-teal-500/20 to-teal-600/10 border-teal-200",
    },
    {
      name: "Cleaning & Hygiene",
      icon: Sparkles,
      count: "Daily Duty",
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-200",
    },
    {
      name: "Hostel & Furniture",
      icon: Building2,
      count: "Dedicated Team",
      color: "from-purple-500/20 to-purple-600/10 border-purple-200",
    },
  ];

  const faqs = [
    {
      q: "How do I track my complaint after submitting?",
      a: "Every complaint is assigned an official sequential ID (e.g., CMP-2026-0001). You can track live department assignments, technician logs, and status updates on your My Complaints dashboard.",
    },
    {
      q: "Who reviews and assigns my complaint?",
      a: "College Facility Administrators review submitted grievances and route them to relevant specialized departments such as IT, Electrical, Maintenance, or Sanitation.",
    },
    {
      q: "Can I upload photo evidence of the issue?",
      a: "Yes! You can attach JPG, PNG, or JPEG photos (up to 5 MB) directly when lodging a complaint to help maintenance engineers diagnose the issue faster.",
    },
    {
      q: "Can I communicate with the assigned maintenance staff?",
      a: "Absolutely. Each complaint has an active discussion thread where students and administrators can exchange real-time updates and clarification remarks.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      gender: "female",
      role: "B.Tech CSE, 3rd Year",
      block: "Block 3 • Lab 402",
      rating: 5,
      resolvedIn: "Resolved in 2.5 hrs",
      complaintId: "CMP-2026-0038",
      quote:
        "Reported the projector flicker in Lab 4 at 10 AM. It was replaced with a new lamp before our afternoon lab session at 2 PM! The live tracking kept me updated every step of the way.",
      tag: "Lab Equipment",
      avatarGradient: "from-[#EC4899] to-[#F43F5E]",
      floatDuration: 5.2,
      floatDelay: 0,
    },
    {
      name: "Rohan Verma",
      gender: "male",
      role: "B.Tech Mechanical, 4th Year",
      block: "Boys Hostel Block C",
      rating: 5,
      resolvedIn: "Resolved in 4 hrs",
      complaintId: "CMP-2026-0089",
      quote:
        "The water cooler on the 2nd floor was leaking for days before CampusFix. I uploaded a quick photo, got assigned to Plumbing immediately, and the technician fixed the valve the same afternoon.",
      tag: "Hostel Maintenance",
      avatarGradient: "from-[#3B82F6] to-[#1D4ED8]",
      floatDuration: 4.6,
      floatDelay: 0.4,
    },
    {
      name: "Ananya Iyer",
      gender: "female",
      role: "MBA Finance, 2nd Year",
      block: "Central University Library",
      rating: 5,
      resolvedIn: "Resolved in 3 hrs",
      complaintId: "CMP-2026-0112",
      quote:
        "Direct chat with maintenance staff is a game changer. I asked when the reading hall AC would be serviced, and the administrator replied with the technician ETA within 15 minutes!",
      tag: "Library Air Conditioning",
      avatarGradient: "from-[#8B5CF6] to-[#6D28D9]",
      floatDuration: 5.8,
      floatDelay: 0.8,
    },
    {
      name: "Aarav Patel",
      gender: "male",
      role: "B.Tech Electrical, 2nd Year",
      block: "Digital Electronics Wing",
      rating: 5,
      resolvedIn: "Resolved in 1.5 hrs",
      complaintId: "CMP-2026-0145",
      quote:
        "No more running around administrative offices or filling out paper forms. Raised a ticket for a loose electrical socket, got sequential CMP-ID, and it was secured before the evening practical.",
      tag: "Electrical Safety",
      avatarGradient: "from-[#10B981] to-[#059669]",
      floatDuration: 4.9,
      floatDelay: 0.2,
    },
    {
      name: "Sneha Kulkarni",
      gender: "female",
      role: "B.Sc Biotechnology, 3rd Year",
      block: "Life Sciences Wing, 3rd Fl",
      rating: 5,
      resolvedIn: "Resolved in 5 hrs",
      complaintId: "CMP-2026-0176",
      quote:
        "Submitted a grievance for broken bench locks in Seminar Hall 2. Received an instant portal notification as soon as the carpenter completed the repair with inspection remarks.",
      tag: "Classroom Furniture",
      avatarGradient: "from-[#F59E0B] to-[#D97706]",
      floatDuration: 5.5,
      floatDelay: 0.6,
    },
    {
      name: "Vikram Aditya",
      gender: "male",
      role: "B.Tech Information Tech, 1st Year",
      block: "Academic Block A",
      rating: 5,
      resolvedIn: "Resolved in 24 hrs",
      complaintId: "CMP-2026-0203",
      quote:
        "As a first-year student, CampusFix made reporting the Wi-Fi deadzone near the cafeteria seamless. The network admin inspected signal strength and installed an additional AP point!",
      tag: "Campus Wi-Fi & IT",
      avatarGradient: "from-[#06B6D4] to-[#0891B2]",
      floatDuration: 4.4,
      floatDelay: 1.0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col selection:bg-[#3155E7] selection:text-white pt-16">
      {/* Fixed Top Navbar */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#15559A]/95 backdrop-blur-md text-white shadow-md border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="md" variant="light" showTagline={false} />

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#35D0B5] text-[#15559A] hover:bg-[#35D0B5]/90 rounded-xl shadow-md transition-all uppercase tracking-wider hover:scale-105"
              >
                <span>Go to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl transition-colors uppercase tracking-wider"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold bg-[#3155E7] hover:bg-blue-600 text-white rounded-xl shadow-sm transition-all uppercase tracking-wider border border-white/20 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Floating Badges & Live Card Simulation */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#15559A] via-[#1A488E] to-[#3155E7] text-white py-16 sm:py-24 px-4 sm:px-6">
        {/* Animated Radial Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#35D0B5]/25 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FFBD58]/20 blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column (Copy & CTA) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md shadow-sm"
            >
              <Sparkles
                className="w-4 h-4 text-[#FFBD58] animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-100">
                Official Campus Grievance System
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
            >
              SMART CAMPUS COMPLAINT{" "}
              <span className="text-[#35D0B5] block sm:inline drop-shadow-[0_2px_10px_rgba(53,208,181,0.3)]">
                MANAGEMENT SYSTEM.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              CampusFix makes it simple for students to report campus facility
              problems and track their resolution from submission to completion.
              Transparent, accountable, and reliable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to={isAuthenticated ? "/complaints/new" : "/login"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-black bg-[#35D0B5] text-[#15559A] hover:bg-[#35D0B5]/90 rounded-2xl shadow-xl transition-all uppercase tracking-wider hover:scale-105 active:scale-95"
              >
                <span>REPORT AN ISSUE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-black bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/30 backdrop-blur-md transition-all uppercase tracking-wider hover:scale-105 active:scale-95"
              >
                <span>STUDENT LOGIN</span>
              </Link>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-blue-200"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35D0B5]" /> No paper
                forms required
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35D0B5]" /> 24/7 Digital
                tracking
              </span>
            </motion.div>
          </div>

          {/* Hero Right Column: Animated Live Complaint Simulation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            {/* Floating Top Badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-white flex items-center gap-2 text-[#15559A]"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  98.4% Fixed
                </p>
                <p className="text-[8px] text-slate-500 font-semibold">
                  Verified SLA Resolution
                </p>
              </div>
            </motion.div>

            {/* Floating Bottom Badge */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-white flex items-center gap-2 text-[#15559A]"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3155E7] flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  Live Updates
                </p>
                <p className="text-[8px] text-slate-500 font-semibold">
                  Instant Alert Dispatch
                </p>
              </div>
            </motion.div>

            {/* Main Interactive Grievance Simulator Card */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-white/80 text-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-xs font-black text-[#15559A]">
                    CMP-2026-0014
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#3155E7] border border-blue-200 uppercase">
                  In Progress
                </span>
              </div>

              <div className="my-4 space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  High-speed Wi-Fi disconnected in Computer Lab 2
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">
                    Computer Lab
                  </span>
                  <span>•</span>
                  <span>Main Building</span>
                  <span>•</span>
                  <span className="text-amber-600 font-bold">
                    High Priority
                  </span>
                </div>
              </div>

              {/* Progress Timeline in Hero Card */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Submitted by Student
                  </span>
                  <span className="text-slate-400 text-[10px]">10:15 AM</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#15559A] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#3155E7] animate-spin" />
                    Assigned: IT Dept (Alex Turner)
                  </span>
                  <span className="text-slate-400 text-[10px]">10:45 AM</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  Estimated fix:{" "}
                  <strong className="text-slate-800">Within 2 hrs</strong>
                </span>
                <span className="text-[#3155E7] font-bold text-[11px]">
                  2 Messages Active
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-[#F4F6F8] rounded-t-3xl" />
      </section>

      {/* Live Impact Metric Counters */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full -mt-6 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md flex items-center gap-4 transition-all"
              >
                <div
                  className={`p-3 rounded-xl bg-slate-50 border border-slate-200 ${st.color} shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {st.format(statCounts[i])}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {st.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#3155E7] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2">
            HOW CAMPUSFIX WORKS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            A 3-step structured grievance lifecycle ensuring total institutional
            accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#3155E7] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3155E7] flex items-center justify-center font-black text-xl mb-4 border border-blue-100 group-hover:bg-[#3155E7] group-hover:text-white transition-colors shadow-sm">
              01
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-1.5">
              1. REPORT AN ISSUE
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select the category, campus block, room number, describe the
              problem, and attach photographic proof.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#3155E7] flex items-center gap-1">
              <span>Instant sequential CMP-ID</span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#35D0B5] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center font-black text-xl mb-4 border border-teal-100 group-hover:bg-[#0F766E] group-hover:text-white transition-colors shadow-sm">
              02
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-1.5">
              2. DEPARTMENT ASSIGNED
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Administrators immediately dispatch the grievance to Electrical,
              IT, Civil or Maintenance engineers.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0F766E] flex items-center gap-1">
              <span>Live status audit timeline</span>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#4CAF50] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#4CAF50] flex items-center justify-center font-black text-xl mb-4 border border-emerald-100 group-hover:bg-[#4CAF50] group-hover:text-white transition-colors shadow-sm">
              03
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-1.5">
              3. RESOLVED & VERIFIED
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive automated notification alerts when repairs are inspected,
              fixed, and verified by department leads.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#4CAF50] flex items-center gap-1">
              <span>Automated alert notification</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 sm:px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#15559A] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Campus Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2">
              COMPLAINT CATEGORIES WE HANDLE
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.name}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${c.color} border flex flex-col items-center text-center group hover:scale-105 transition-all shadow-sm`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#15559A] mb-2 group-hover:rotate-6 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{c.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 mt-1">
                    {c.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual Portal Gateway Section */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#15559A] tracking-widest uppercase">
            Two Portals, One System
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
            TAILORED CAMPUS INTERFACES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Portal Card */}
          <div className="rounded-3xl p-7 bg-gradient-to-br from-white to-blue-50/60 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#15559A] text-[10px] font-extrabold uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>Student Portal</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">
                For University Students
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Report classroom issues, electrical malfunctions, lab Wi-Fi
                outages, and washroom cleanliness in seconds.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Track complaint status timeline step-by-step
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Direct chat with maintenance administrators
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Instant notification alerts upon resolution
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                <span>STUDENT PORTAL LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Admin Control Center Card */}
          <div className="rounded-3xl p-7 bg-gradient-to-br from-[#091738] via-[#0d2153] to-[#154b85] text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider mb-4 border border-white/30">
                <Shield className="w-3.5 h-3.5 text-[#FFBD58]" />
                <span>Administrative Center</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                For Campus Administration
              </h3>
              <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
                Centralized dashboard to triage grievances, assign staff,
                oversee SLA metrics, and manage facility departments.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-blue-100 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35D0B5] shrink-0" />
                  Real-time analytics across categories & campus locations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35D0B5] shrink-0" />
                  One-click department routing & engineer assignment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35D0B5] shrink-0" />
                  Full audit log history and status transitions
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold text-[#15559A] bg-[#35D0B5] hover:bg-[#35D0B5]/90 rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                <span>ADMIN CONTROL LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Student Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle decorative glow orbs */}
        <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-[#35D0B5]/15 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-[#3155E7]/15 blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#3155E7] text-xs font-extrabold uppercase tracking-widest mb-2.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFBD58]" />
              <span>Student Voices & Real Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
              RESOLVING ISSUES ACROSS CAMPUS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Hear from university students whose reported problems were
              diagnosed, tracked, and fixed swiftly by college facilities.
            </p>
          </div>

          {/* Floating Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  y: {
                    duration: t.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: t.floatDelay,
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.015,
                  boxShadow: "0 20px 35px -10px rgba(21, 85, 154, 0.12)",
                }}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-[#3155E7]/40 relative flex flex-col justify-between transition-all duration-300"
              >
                {/* Card Top: Student Profile & Stars */}
                <div>
                  <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      {/* Student Avatar */}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${t.avatarGradient} text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0`}
                      >
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 leading-none">
                            {t.name}
                          </h4>
                          <span
                            title="Verified University Student"
                            className="inline-flex items-center text-[#35D0B5]"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* 5 Stars Rating */}
                    <div className="flex items-center gap-0.5 shrink-0 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200/60">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#FFBD58] text-[#FFBD58]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="my-4">
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      "{t.quote}"
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Resolution Tag & Location */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[#3155E7] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {t.complaintId}
                    </span>
                    <span className="font-medium text-slate-500 truncate max-w-[110px] sm:max-w-[130px]">
                      {t.tag}
                    </span>
                  </div>

                  <span className="font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t.resolvedIn}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust Highlights */}
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <ThumbsUp className="w-4 h-4 text-[#35D0B5]" />
                98.7% Satisfaction Rate
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Over 5,200 Campus Fixes Verified
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3155E7]" />
                100% Student Data Transparency
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-[#3155E7] tracking-widest uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 mt-1">
            EVERYTHING YOU NEED TO KNOW
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:text-[#3155E7] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-[#3155E7]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto w-full text-center">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#15559A] via-[#3155E7] to-[#15559A] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              SEE A PROBLEM ON CAMPUS?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Report broken classroom equipment, electrical faults, Wi-Fi
              outages, and facility maintenance needs to keep our university
              safe and high-performing.
            </p>
            <div className="pt-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 text-xs font-black bg-[#35D0B5] text-[#15559A] hover:bg-[#35D0B5]/90 rounded-2xl shadow-xl transition-all uppercase tracking-wider hover:scale-105 active:scale-95"
              >
                <span>CREATE ACCOUNT & REPORT ISSUE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#15559A] text-white py-6 px-4 sm:px-6 border-t border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <Logo size="sm" variant="light" />
          <p>
            © {new Date().getFullYear()} CampusFix Portal. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-white transition-colors">
              Student Login
            </Link>
            <Link to="/login" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
