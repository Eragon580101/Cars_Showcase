"use client";
import React from "react";
import { SearchManufacturer } from ".";
import Image from "next/image";
import {useRouter}  from "next/navigation";

const SearchButton: React.FC<{ otherClasses: string }> = ({ otherClasses }) => (
  <button className={`-ml-3 z-10 ${otherClasses}`} type="submit">
    <Image
      src={"/magnifying-glass.svg"}
      width={40}
      height={40}
      alt="search icon"
      objectFit="contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = React.useState("");
  const [model, setModel] = React.useState("");
  const router = useRouter();

  console.log('manufacturer', manufacturer)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (model === "" && manufacturer === "")
      return alert("Please enter a manufacturer and model");
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());  
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = { model, manufacturer };
    model ? searchParams.set("model", model) : searchParams.delete("model");
    manufacturer
      ? searchParams.set("manufacturer", manufacturer)
      : searchParams.delete("manufacturer");

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses={`sm:hidden`} />
      </div>
      <div className="searchbar__item">
        <Image
          src={"/model-icon.png"}
          width={25}
          height={25}
          alt="car model"
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses={`sm:hidden`} />
      </div>
      <SearchButton otherClasses={`max-sm:hidden`} />
    </form>
  );
};

export default SearchBar;
