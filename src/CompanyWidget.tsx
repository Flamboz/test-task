import React, { useEffect, useRef } from "react";
import { MosaicBranch, MosaicWindow } from "./app";
import { CompanyType } from "./Dashboard";

interface CompanyWidgetProps {
  path: MosaicBranch[];
  totalWindowCount: number;
  companyInfo: CompanyType;
  isLoading: boolean;
}

const CompanyWidget = ({
  path,
  totalWindowCount,
  companyInfo,
  isLoading,
}: CompanyWidgetProps) => {
  const adContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (adContainer.current == null) {
      return;
    }

    const script = document.createElement("script");

    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CEAIEK3E&placement=nomcoptergithubio";
    script.async = true;
    script.type = "text/javascript";
    script.id = "_carbonads_js";

    adContainer.current.appendChild(script);
  }, []);

  return (
    <MosaicWindow<number>
      title={"Company info"}
      className="text-base"
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log("MosaicWindow.onDragStart")}
      onDragEnd={(type) => console.log("MosaicWindow.onDragEnd", type)}
    >
      <div className="example-window">
        {isLoading && "Loading..."}
        {!isLoading && (
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
            <br/>
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
            <p>
              <span className="font-bold">
                Thea enabled true legacy sector:{" "}
              </span>
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
        )}
      </div>
    </MosaicWindow>
  );
};

export default CompanyWidget;
