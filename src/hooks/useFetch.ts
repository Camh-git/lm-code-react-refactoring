import { useEffect, useState } from "react";
import { tripInfo } from "../data/tripData";

//Rename to something better, like useTripData
export const useFetch = () => {
  const [data, setData] = useState<TripDatum[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error] = useState(null); //Unused error handling/reporting

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(tripData);
      setIsLoading(false);
    }, 800);
  }, []);

  return { data, isLoading, error };
};

interface TripDatum {
  id: string;
  tripName: string;
  description: string;
  cost: number;
  lengthInDays: number;
  imageUrl: string;
  isBookable: boolean;
}

const tripData = tripInfo;
