"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";

interface CopyEventTypeButtonProps {
  makeUrl: string;
}

const CopyEventTypeButton: FC<CopyEventTypeButtonProps> = ({ makeUrl }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 800 });

  const handleCopy = () => {
    copyToClipboard(makeUrl);
    toast.success("Copied to clipboard successfully!", {
      id: "copy-event-type",
    });
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={isCopied}
      variant="ghost"
      className="w-full justify-start text-sm"
      size="sm"
    >
      {isCopied ? (
        <CheckCheck className="w-4 h-4 mr-2 stroke-green-500" />
      ) : (
        <Copy className="w-4 h-4 mr-2" />
      )}
      Copy
    </Button>
  );
};

export default CopyEventTypeButton;
