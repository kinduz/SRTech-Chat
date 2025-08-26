"use client";

import * as React from "react";
import { Checkbox } from "../../components/ui/checkbox";

interface CustomCheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function CustomCheckbox({
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  children,
}: CustomCheckboxProps) {
  const handleLabelClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="border-white/20 bg-white/10 data-[state=checked]:bg-pink-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-transparent data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/25 hover:border-purple-400 focus-visible:ring-purple-500/50"
      />
      {children && (
        <label
          className="text-sm text-gray-300 cursor-pointer select-none leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          onClick={handleLabelClick}
        >
          {children}
        </label>
      )}
    </div>
  );
}
