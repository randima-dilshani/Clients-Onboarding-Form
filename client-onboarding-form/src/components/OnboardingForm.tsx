"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../lib/schema";
import { useState } from "react";

export default function Form() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      setSuccess(true);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  if (success) {
    return <div className="p-6 bg-green-100 text-green-800 rounded">
      🎉 Success! Thanks for submitting.
    </div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow">
      {serverError && <div className="p-2 bg-red-100 text-red-600">{serverError}</div>}

      <div>
        <label className="block mb-1">Full Name</label>
        <input {...register("fullName")} className="w-full border p-2 rounded" />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input type="email" {...register("email")} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Company Name</label>
        <input {...register("companyName")} className="w-full border p-2 rounded" />
        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
      </div>

      <div>
        <p className="mb-1">Services Interested In</p>
        {["UI/UX", "Branding", "Web Dev", "Mobile App"].map(service => (
          <label key={service} className="block">
            <input type="checkbox" value={service} {...register("services")} /> {service}
          </label>
        ))}
        {errors.services && <p className="text-red-500 text-sm">{errors.services.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Budget (USD)</label>
        <input type="number" {...register("budgetUsd", { valueAsNumber: true })} className="w-full border p-2 rounded" />
        {errors.budgetUsd && <p className="text-red-500 text-sm">{errors.budgetUsd.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Project Start Date</label>
        <input type="date" {...register("projectStartDate")} className="w-full border p-2 rounded" />
        {errors.projectStartDate && <p className="text-red-500 text-sm">{errors.projectStartDate.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("acceptTerms")} /> Accept Terms
        </label>
        {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
