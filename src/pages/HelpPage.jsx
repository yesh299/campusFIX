import React from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileCheck,
  Layers,
  AlertCircle,
} from "lucide-react";
import { CATEGORIES, DEPARTMENTS } from "../utils/constants";

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          Campus Grievance Guidelines & Help Center
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Service level agreements, category descriptions, and facility support
          contacts
        </p>
      </div>

      {/* SLA Info Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
          Expected Resolution Timeframes (SLA)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
            <span className="font-extrabold text-rose-700 block uppercase text-[11px]">
              Critical Priority
            </span>
            <p className="text-base font-black text-slate-800 mt-1">
              Within 4 to 8 Hours
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Water mains, major electrical outages, hazardous campus
              conditions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <span className="font-extrabold text-amber-800 block uppercase text-[11px]">
              High Priority
            </span>
            <p className="text-base font-black text-slate-800 mt-1">
              Within 24 Hours
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Computer lab Wi-Fi, classroom fans, washroom water supply.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <span className="font-extrabold text-[#15559A] block uppercase text-[11px]">
              Medium / Low Priority
            </span>
            <p className="text-base font-black text-slate-800 mt-1">
              2 to 3 Business Days
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Furniture repairs, paint touchups, library AV equipment.
            </p>
          </div>
        </div>
      </div>

      {/* Department Contacts */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
          Campus Departments Directory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
            >
              <span className="font-bold text-slate-800">{dept}</span>
              <span className="text-[11px] text-slate-500 font-mono">
                Ext 100 - 400
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Support Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#15559A] to-[#3155E7] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-base font-bold">
            Need Immediate Emergency Assistance?
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Contact Campus Security Desk or Central IT Control Room 24/7.
          </p>
          <p className="text-xs text-blue-100 mt-2">
            Dial{" "}
            <a href="tel:7644663322" className="font-bold text-white underline">
              7644663322
            </a>{" "}
            to contact the Security Head.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:7644663322"
            className="px-4 py-2 bg-white text-[#15559A] rounded-xl text-xs font-bold shadow-sm uppercase tracking-wider hover:bg-slate-100 transition-colors"
          >
            Call Security
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
