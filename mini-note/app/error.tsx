"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Something went wrong.</h2>
      <p className="text-sm text-gray-500">Please try again or go back to your notes.</p>
      <Button asChild>
        <Link href="/notes">Return</Link>
      </Button>
    </div>
  );
};

export default Error;
