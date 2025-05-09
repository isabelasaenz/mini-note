"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
};

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
    const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
    e.stopPropagation();
    onConfirm();
    };

    return (
    <AlertDialog>
        <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action is permanent
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    );
};