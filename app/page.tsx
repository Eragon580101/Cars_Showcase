import {
  CarCard,
  CustomButton,
  CustomFilter,
  Hero,
  SearchBar,
  ShowMore,
} from "@/components";
import { Cars } from "@/constants/Cars";
import { fuels, yearsOfProduction } from "@/constants/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: { searchParams: any }) {
  const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer || "",
    model: searchParams?.model || "",
    fuel: searchParams?.fuel || "",
    year: searchParams?.year || 2020,
    limit: searchParams?.limit || 10,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 0 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <div className="home__cars">
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard car={car} />
                ))}
              </div>
              {
                <ShowMore
                  pageNumber={(searchParams?.limit || 10) / 10}
                  isNext={(searchParams?.limit || 10) > allCars?.length}
                />
              }
            </section>
          </div>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
