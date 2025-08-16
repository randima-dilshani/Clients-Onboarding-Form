"use client";

import { Suspense } from "react";
import SuccessPageContent from "../../components/SuccessPageContent";

export const dynamic = "force-dynamic"; 

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
