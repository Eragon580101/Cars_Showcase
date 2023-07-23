"use client";
import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from ".";
import { updateSearchParams } from "@/utils";

const ShowMore: React.FC<ShowMoreProps> = ({ pageNumber, isNext }) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newPathName = updateSearchParams("limit", `${(pageNumber + 1) * 10}`);
    router.push(newPathName);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          type="button"
          containerStyles="bg-primary-blue text-white rounded-full"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
