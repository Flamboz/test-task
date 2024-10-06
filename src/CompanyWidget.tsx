import React, { useState } from "react";
import {
  DEFAULT_CONTROLS_WITH_CREATION,
  MosaicBranch,
  MosaicWindow,
} from "./app";
import { CompanyType, StockType } from "./types";
interface CompanyWidgetProps {
  path: MosaicBranch[];
  totalWindowCount: number;
  companyTickers: {
    id: string;
    name: string;
  }[];
  getCompanyInfoById: (id: string) => {
    companyInfo: CompanyType | undefined;
    stockInfo: StockType | undefined;
  };
  defaultTicker: {
    companyInfo: CompanyType | undefined;
    stockInfo: StockType | undefined;
  };
  isError: boolean;
  isLoading: boolean;
}

const CompanyWidget = ({
  path,
  totalWindowCount,
  companyTickers,
  getCompanyInfoById,
  defaultTicker,
  isError,
  isLoading,
}: CompanyWidgetProps) => {
  const [selectedTicker, setSelectedTicker] = useState<string | undefined>(
    undefined
  );
  const companyFullInfo = selectedTicker
    ? getCompanyInfoById(selectedTicker)
    : defaultTicker;

  return (
    <MosaicWindow<number>
      title={"Company info"}
      toolbarControls={
        <div className="w-full flex justify-between items-center">
          <div className="mr-2">
            <select
              className="border border-slate-400 rounded p-0.5 text-xs"
              name="tickers"
              onChange={(event) => setSelectedTicker(event.target.value)}
              value={selectedTicker}
            >
              <option value="">Select a ticker</option>
              {companyTickers.map((ticker) => (
                <option key={ticker.id} value={ticker.id}>
                  {ticker.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow flex justify-end">
            {DEFAULT_CONTROLS_WITH_CREATION}
          </div>
        </div>
      }
      className="text-base"
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log("MosaicWindow.onDragStart")}
      onDragEnd={(type) => console.log("MosaicWindow.onDragEnd", type)}
    >
      <div className="example-window overflow-x-auto h-full p-5 flex items-center flex-col">
        {isError && (
          <div className="text-red-500">
            Error loading data. Please try again.
          </div>
        )}
        {!companyFullInfo && !isLoading && (
          <div>Choose company from select</div>
        )}
        {isLoading && "Loading..."}
        {!isLoading && companyFullInfo && companyFullInfo.companyInfo && (
          <div>
            <p>
              <span className="font-bold">ticker </span>
              <span>{companyFullInfo.companyInfo.ticker}</span>
            </p>
            <p>
              <span className="font-bold">Name: </span>
              <span>{companyFullInfo.companyInfo.name}</span>
            </p>
            <p>
              <span className="font-bold">Legal name: </span>
              <span>{companyFullInfo.companyInfo.legal_name}</span>
            </p>
            <p>
              <span className="font-bold">Stock exchange: </span>
              <span>{companyFullInfo.companyInfo.stock_exchange}</span>
            </p>
            <p>
              <span className="font-bold">Short description: </span>
              <span>{companyFullInfo.companyInfo.short_description}</span>
            </p>
            <p>
              <span className="font-bold">Long description: </span>
              <span>{companyFullInfo.companyInfo.long_description}</span>
            </p>
            <p>
              <span className="font-bold">Web: </span>
              <span>{companyFullInfo.companyInfo.company_url}</span>
            </p>
            <p>
              <span className="font-bold">Business address: </span>
              <span>{companyFullInfo.companyInfo.business_address}</span>
            </p>
            <br />
            <p>
              <span className="font-bold">Business phone: </span>
              <span>{companyFullInfo.companyInfo.business_phone_no}</span>
            </p>
            <p>
              <span className="font-bold">Entity legal form: </span>
              <span>{companyFullInfo.companyInfo.entity_legal_form}</span>
            </p>
            <p>
              <span className="font-bold">Latest filling date: </span>
              <span>{companyFullInfo.companyInfo.latest_filing_date}</span>
            </p>
            <p>
              <span className="font-bold">Inc country: </span>
              <span>{companyFullInfo.companyInfo.inc_country}</span>
            </p>
            <p>
              <span className="font-bold">Employees: </span>
              <span>{companyFullInfo.companyInfo.employees}</span>
            </p>
            <p>
              <span className="font-bold">Sector: </span>
              <span>{companyFullInfo.companyInfo.sector}</span>
            </p>
            <p>
              <span className="font-bold">Industry category: </span>
              <span>{companyFullInfo.companyInfo.industry_category}</span>
            </p>
            <p>
              <span className="font-bold">Industry group: </span>
              <span>{companyFullInfo.companyInfo.industry_group}</span>
            </p>
            <p className="mb-0">
              <span>First stock price date: </span>
              <span>{companyFullInfo.stockInfo?.first_stock_price}</span>
            </p>
            <p>
              <span>Last stock price date: </span>
              <span>{companyFullInfo.stockInfo?.last_stock_price}</span>
            </p>
            <p>
              <span className="font-bold">
                Thea enabled true legacy sector:{" "}
              </span>
              <span>{companyFullInfo.companyInfo.legacy_sector}</span>
            </p>
            <p>
              <span className="font-bold">Legacy industry category: </span>
              <span>
                {companyFullInfo.companyInfo.legacy_industry_category}
              </span>
            </p>
            <p>
              <span className="font-bold">Legacy industry group: </span>
              <span>{companyFullInfo.companyInfo.legacy_industry_group}</span>
            </p>
          </div>
        )}
      </div>
    </MosaicWindow>
  );
};

export default CompanyWidget;
