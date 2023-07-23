"use client";
import { manufacturers } from "@/constants/constants";
import { SearchManufacturerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import React from "react";

const SearchManufacturer: React.FC<SearchManufacturerProps> = ({
  manufacturer,
  setManufacturer,
}) => {
  const [query, setQuery] = React.useState("");
  console.log('query', query)

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((manufacturer) =>
          manufacturer
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute w-full top-[14px]">
            <Image
              src={`/car-logo.svg`}
              width={20}
              height={20}
              alt="Car Logo"
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            as="input"
            className={`search-manufacturer__input`}
            placeholder="Volkswagen"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Transition
            as={React.Fragment}
            leave={`transition ease-in duration-100`}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options>
              {filteredManufacturers.map((item) => {
                return (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                    
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {item}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? "text-white" : "text-primary-blue"
                            } absolute inset-y-0 left-0 flex items-center pl-4`}
                          ></span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
