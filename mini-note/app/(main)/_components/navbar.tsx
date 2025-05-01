"use client";

import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_genera ted/api";
import { Id } from "@/convex/_generated/dataModel";

type NavbarProps = {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    return(
        <div>
            Navbar
        </div>
    )
};
