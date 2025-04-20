"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div className="max-w-5xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium pb-5 underline">
        mini-note
      </h1>
      <h2 className="text-2xl sm:text-4xl md:text-5xl pb-5">
        Your notes, and nothing else.
      </h2>
      <Button>
        Enter
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
