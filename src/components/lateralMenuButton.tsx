import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface LateralMenuButtonProps extends ButtonProps {
  children: ReactNode;
  tooltipContent: string;
  className?: string;
}

export function LateralMenuButton({
  children,
  tooltipContent,
  className,
  ...props
}: LateralMenuButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
        asChild
          variant={"ghost"}
          className={cn(
            `group flex size-10 items-center justify-center rounded-md hover:bg-primary/25 ${className}`,
          )}
          {...props}
        >
          <div className={cn(
            `group cursor-pointer flex size-10 items-center justify-center rounded-md hover:bg-primary/25 ${className}`,
          )}>{children}</div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
