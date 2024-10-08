import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React from "react";
import { Mosaic, MosaicZeroState } from "../lib";
import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { useLoadCompanyFullData } from "../hooks/useLoadCompanyFullData";
import { THEMES } from "../constants";
import { useWindowControls } from "../hooks/useWindowsControls";
import CompanyWidget from "./CompanyWidget";

const Dashboard = () => {
  const {
    currentNode,
    onChange,
    onRelease,
    currentTheme,
    setCurrentTheme,
    autoArrange,
    addToTopRight,
  } = useWindowControls();

  const { companies, stocks, isLoading, isError } = useLoadCompanyFullData();

  const totalWindowCount = companies.length;

  const getCompanyInfoById = (id: string) => {
    const companyInfo = companies.find((company) => company.id === id);
    const stockInfo = stocks.find((stock) => stock.company_id === id);
    return { companyInfo, stockInfo };
  };

  const companyTickers = companies.map((company) => ({
    id: company.id,
    name: company.ticker,
  }));

  const getDefaultTickerForTile = (index: number) => {
    const companyInfo = companies[index] ?? companies[0];
    const stockInfo = stocks.find(
      (stock) => stock.company_id === companyInfo.id
    );
    return { companyInfo, stockInfo };
  };

  return (
    <React.StrictMode>
      <div className="h-screen w-full overflow-hidden">
        <Navbar
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          autoArrange={autoArrange}
          addToTopRight={addToTopRight}
        />
        {isError && (
          <p className="pt-2 text-xl text-red-500 text-center">
            Error loading data. Please try again.
          </p>
        )}
        {isLoading && <Loader />}
        {!isLoading && !isError && (
          <Mosaic<number>
            renderTile={(count, path) => {
              return (
                <CompanyWidget
                  companyTickers={companyTickers}
                  getCompanyInfoById={getCompanyInfoById}
                  defaultTicker={getDefaultTickerForTile(count - 1)}
                  path={path}
                  totalWindowCount={totalWindowCount}
                />
              );
            }}
            zeroStateView={
              <MosaicZeroState createNode={() => totalWindowCount + 1} />
            }
            value={currentNode}
            onChange={onChange}
            onRelease={onRelease}
            className={THEMES[currentTheme]}
            blueprintNamespace="bp4"
          />
        )}
      </div>
    </React.StrictMode>
  );
};

export default Dashboard;
