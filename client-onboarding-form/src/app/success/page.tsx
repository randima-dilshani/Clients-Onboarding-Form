"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();

  const fullName = searchParams.get("fullName");
  const email = searchParams.get("email");
  const companyName = searchParams.get("companyName");
  const services = searchParams.get("services")?.split(",") ?? [];
  const budgetUsd = searchParams.get("budgetUsd");
  const projectStartDate = searchParams.get("projectStartDate");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-6"
    >
      <div className="max-w-lg w-full rounded-2xl shadow-xl bg-gray-900/80 backdrop-blur p-8 border border-gray-700">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
        >
          ✅ Form Submitted Successfully
        </motion.h1>

        <p className="text-center text-gray-400 mb-6">
          Thank you{" "}
          <span className="font-semibold text-gray-200">{fullName}</span>, we’ll be in touch soon!
        </p>

        {/* Details Card */}
        <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/60 space-y-2 text-sm">
          <p><span className="font-semibold text-gray-300">Name:</span> {fullName}</p>
          <p><span className="font-semibold text-gray-300">Email:</span> {email}</p>
          <p><span className="font-semibold text-gray-300">Company:</span> {companyName}</p>
          {services.length > 0 && (
            <p><span className="font-semibold text-gray-300">Services:</span> {services.join(", ")}</p>
          )}
          {budgetUsd && (
            <p><span className="font-semibold text-gray-300">Budget:</span> ${budgetUsd}</p>
          )}
          <p><span className="font-semibold text-gray-300">Start Date:</span> {projectStartDate}</p>
        </div>

        {/* Button */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block w-full text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-white font-semibold shadow-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-500"
        >
          Go Back Home
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-400">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
