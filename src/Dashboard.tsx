import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Classes, HTMLSelect } from "@blueprintjs/core";
import classNames from "classnames";
import dropRight from "lodash/dropRight";
import React, { useEffect, useState } from "react";

import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicZeroState,
  updateTree,
} from "./lib";
import CompanyWidget from "./CompanyWidget";
import { CompanyType, StockType } from "./types";

const THEMES = {
  Blueprint: "mosaic-blueprint-theme",
  "Blueprint Dark": classNames("mosaic-blueprint-theme", Classes.DARK),
  None: "",
};

export type Theme = keyof typeof THEMES;

const useWindowControls = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>({
    direction: "row",
    first: 1,
    second: {
      direction: "column",
      first: 2,
      second: 3,
    },
    splitPercentage: 40,
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>("Blueprint");

  const onChange = (newNode: MosaicNode<number> | null) => {
    setCurrentNode(newNode);
  };

  const onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log("Mosaic.onRelease():", currentNode);
  };

  const autoArrange = () => {
    const leaves = getLeaves(currentNode);
    setCurrentNode(createBalancedTreeFromLeaves(leaves));
  };

  const addToTopRight = () => {
    let node = currentNode;
    const totalWindowCount = getLeaves(node).length;
    if (node) {
      const path = getPathToCorner(node, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(
        node,
        dropRight(path)
      ) as MosaicParent<number>;
      const destination = getNodeAtPath(node, path) as MosaicNode<number>;
      const direction: MosaicDirection = parent
        ? getOtherDirection(parent.direction)
        : "row";

      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === "row") {
        first = destination;
        second = totalWindowCount + 1;
      } else {
        first = totalWindowCount + 1;
        second = destination;
      }

      node = updateTree(node, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      node = totalWindowCount + 1;
    }

    setCurrentNode(node);
  };

  return {
    currentNode,
    currentTheme,
    setCurrentTheme,
    onChange,
    onRelease,
    autoArrange,
    addToTopRight,
  };
};

const useLoadCompanyFullData = () => {
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

const Navbar = () => {
  const { currentTheme, setCurrentTheme, autoArrange, addToTopRight } =
    useWindowControls();

  return (
    <div className="flex items-center justify-end bg-gray-800 p-4">
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2 text-white">
          <HTMLSelect
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.currentTarget.value as Theme)}
          >
            {React.Children.toArray(
              Object.keys(THEMES).map((label) => <option>{label}</option>)
            )}
          </HTMLSelect>
        </label>
        <div className="h-6 border-l border-gray-600 mx-4 hidden sm:block"></div>
        <div className="flex gap-4">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
            onClick={autoArrange}
          >
            Auto Arrange
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
            onClick={addToTopRight}
          >
            Add Window to Top Right
          </button>
        </div>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

const Dashboard = () => {
  const { currentNode, currentTheme, onChange, onRelease } =
    useWindowControls();

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
        <Navbar />
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
