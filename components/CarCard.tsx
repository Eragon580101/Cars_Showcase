"use client";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import React from "react";
import { CarDetails, CustomButton } from ".";

export interface CarCardProps {
  car: CarProps;
}

const CarCard:React.FC<CarCardProps> = ({ car }) => {
  const { make, model, city_mpg, year, transmission, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsopen] = React.useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-10 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt={model + " " + make}
          fill
          priority
          objectFit="contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src={"/steering-wheel.svg"}
              width={20}
              height={20}
              alt="steering wheel"
            ></Image>
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={"/tire.svg"} width={20} height={20} alt="tyre"></Image>
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src={"/gas.svg"}
              width={20}
              height={20}
              alt="steering wheel"
            ></Image>
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px]"
            rightIcon="/right-arrow.svg"
            handleClick={() => {
              setIsopen(true);
            }}
          />
        </div>
      </div>
      {isOpen && (
        <CarDetails
          isOpen={isOpen}
          closeModal={() => setIsopen(false)}
          car={car}
        />
      )}
    </div>
  );
};

export default CarCard;
