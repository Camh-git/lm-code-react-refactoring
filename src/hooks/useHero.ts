import { useEffect, useState } from "react";
import { heroData, HeroDeets } from "../data/heroData";

export const useHero = () => {
  const [heroics, setHeroics] = useState<HeroDeets | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [error] = useState(null); //Unused error handling/reporting

  useEffect(() => {
    setWaiting(true);
    setTimeout(() => {
      setHeroics(pureHeroism);
      setWaiting(false);
    }, 400);
  }, []);

  return { heroics, waiting, error };
};

const pureHeroism: HeroDeets = heroData;
