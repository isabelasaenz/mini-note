import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Page not found</h2>
      <p className="text-sm text-gray-500">The page you are looking for does not exist.</p>
      <Button asChild>
        <Link href="/notes">Return</Link>
      </Button>
    </div>
  );
};

export default NotFound;
