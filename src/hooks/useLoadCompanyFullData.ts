import { useEffect, useState } from "react";
import { CompanyType, StockType } from "../types";

export const useLoadCompanyFullData = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const companyResponse = await fetch("http://localhost:5001/companies");
        const stockResponse = await fetch("http://localhost:5002/securities");

        const companyData = await companyResponse.json();
        const stockData = await stockResponse.json();

        setCompanies(companyData);
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    companies,
    stocks,
    isLoading,
    isError,
  };
};
