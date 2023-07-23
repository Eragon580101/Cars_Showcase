"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";
import { CustomButtonProps } from "@/types";

const CustomButton: React.FC<CustomButtonProps> = ({
  containerStyles,
  title,
  type,
  disabled,
  textStyles,
  rightIcon,
  isDisabled,
  handleClick,
}): JSX.Element => {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            objectFit="contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
