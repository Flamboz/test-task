import React, { useState } from "react";
import {
  DEFAULT_CONTROLS_WITH_CREATION,
  MosaicBranch,
  MosaicWindow,
} from "./lib";
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
}

interface CompanyInfoViewProps {
  companyInfo: CompanyType;
  stockInfo: StockType;
}

const CompanyInfoView = ({ companyInfo, stockInfo }: CompanyInfoViewProps) => {
  return (
    <div>
      <p>
        <span className="font-bold">ticker </span>
        <span>{companyInfo.ticker}</span>
      </p>
      <p>
        <span className="font-bold">Name: </span>
        <span>{companyInfo.name}</span>
      </p>
      <p>
        <span className="font-bold">Legal name: </span>
        <span>{companyInfo.legal_name}</span>
      </p>
      <p>
        <span className="font-bold">Stock exchange: </span>
        <span>{companyInfo.stock_exchange}</span>
      </p>
      <p>
        <span className="font-bold">Short description: </span>
        <span>{companyInfo.short_description}</span>
      </p>
      <p>
        <span className="font-bold">Long description: </span>
        <span>{companyInfo.long_description}</span>
      </p>
      <p>
        <span className="font-bold">Web: </span>
        <span>{companyInfo.company_url}</span>
      </p>
      <p>
        <span className="font-bold">Business address: </span>
        <span>{companyInfo.business_address}</span>
      </p>
      <br />
      <p>
        <span className="font-bold">Business phone: </span>
        <span>{companyInfo.business_phone_no}</span>
      </p>
      <p>
        <span className="font-bold">Entity legal form: </span>
        <span>{companyInfo.entity_legal_form}</span>
      </p>
      <p>
        <span className="font-bold">Latest filling date: </span>
        <span>{companyInfo.latest_filing_date}</span>
      </p>
      <p>
        <span className="font-bold">Inc country: </span>
        <span>{companyInfo.inc_country}</span>
      </p>
      <p>
        <span className="font-bold">Employees: </span>
        <span>{companyInfo.employees}</span>
      </p>
      <p>
        <span className="font-bold">Sector: </span>
        <span>{companyInfo.sector}</span>
      </p>
      <p>
        <span className="font-bold">Industry category: </span>
        <span>{companyInfo.industry_category}</span>
      </p>
      <p>
        <span className="font-bold">Industry group: </span>
        <span>{companyInfo.industry_group}</span>
      </p>
      <p className="mb-0">
        <span>First stock price date: </span>
        <span>{stockInfo?.first_stock_price}</span>
      </p>
      <p>
        <span>Last stock price date: </span>
        <span>{stockInfo?.last_stock_price}</span>
      </p>
      <p>
        <span className="font-bold">Thea enabled true legacy sector: </span>
        <span>{companyInfo.legacy_sector}</span>
      </p>
      <p>
        <span className="font-bold">Legacy industry category: </span>
        <span>{companyInfo.legacy_industry_category}</span>
      </p>
      <p>
        <span className="font-bold">Legacy industry group: </span>
        <span>{companyInfo.legacy_industry_group}</span>
      </p>
    </div>
  );
};

const CompanyWidget = ({
  path,
  totalWindowCount,
  companyTickers,
  getCompanyInfoById,
  defaultTicker,
}: CompanyWidgetProps) => {
  const [selectedTicker, setSelectedTicker] = useState<string | undefined>(
    undefined
  );

  const companyFullInfo = selectedTicker
    ? getCompanyInfoById(selectedTicker)
    : defaultTicker;

  const { companyInfo, stockInfo } = companyFullInfo || {};

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
    >
      <div className="example-window overflow-x-auto h-full p-5 flex items-center flex-col">
        {companyFullInfo && companyInfo && stockInfo && (
          <CompanyInfoView companyInfo={companyInfo} stockInfo={stockInfo} />
        )}
      </div>
    </MosaicWindow>
  );
};

export default CompanyWidget;
