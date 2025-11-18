"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Brain } from "lucide-react";

interface ReasoningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  stepCount?: number;
}

export function ReasoningDialog({
  open,
  onOpenChange,
  children,
  stepCount,
}: ReasoningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/30">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <DialogTitle className="text-lg">
                AI Reasoning Process
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {stepCount
                  ? `Complete activity log with ${stepCount} steps`
                  : "Complete activity log and tool usage"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
