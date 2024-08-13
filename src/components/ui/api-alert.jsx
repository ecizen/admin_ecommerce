'use client'

import toast from "react-hot-toast";
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

import { Button } from "./button";
import { Badge } from "./badge";

// Define text and variant maps directly in JavaScript
const textMap = {
  public: "Public",
  admin: "Admin",
};

const variantMap = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API berhasil di copy");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle>
        {title}
        <Badge variant={variantMap[variant]}>
            {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
