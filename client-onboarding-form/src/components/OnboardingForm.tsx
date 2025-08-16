"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Form() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      // redirect with query params (pass data to success page)
      const query = new URLSearchParams({
        fullName: data.fullName,
        email: data.email,
        companyName: data.companyName,
        services: data.services.join(","),
        budgetUsd: data.budgetUsd?.toString() ?? "",
        projectStartDate: data.projectStartDate,
      }).toString();

      router.push(`/success?${query}`);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-xl p-8 rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
    >
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Client Onboarding
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Fill out the form below. We will get back to you shortly!
      </p>

      <AnimatePresence>
        {serverError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-lg border border-red-500 bg-red-800/30 p-3 text-red-300"
          >
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name + Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              {...register("fullName")}
              placeholder="Ada Lovelace"
              className="w-full border border-gray-700 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="ada@example.com"
              className="w-full border border-gray-700 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            {...register("companyName")}
            placeholder="Analytical Engines Ltd"
            className="w-full border border-gray-700 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.companyName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Services */}
        <div>
          <p className="mb-2 font-medium">Services Interested In</p>
          <div className="grid grid-cols-2 gap-2">
            {["UI/UX", "Branding", "Web Dev", "Mobile App"].map((service) => (
              <label
                key={service}
                className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 cursor-pointer hover:border-indigo-500 transition"
              >
                <input
                  type="checkbox"
                  value={service}
                  {...register("services")}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <p className="text-red-400 text-sm mt-1">
              {errors.services.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-1 font-medium">Budget (USD)</label>
          <input
            type="number"
            {...register("budgetUsd", { valueAsNumber: true })}
            placeholder="50000"
            className="w-full border border-gray-700 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.budgetUsd && (
            <p className="text-red-400 text-sm mt-1">
              {errors.budgetUsd.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Project Start Date</label>
          <input
            type="date"
            {...register("projectStartDate")}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-700 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.projectStartDate && (
            <p className="text-red-400 text-sm mt-1">
              {errors.projectStartDate.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            className="h-4 w-4 accent-indigo-500"
          />
          <label>I accept the terms</label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-400 text-sm">{errors.acceptTerms.message}</p>
        )}

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
