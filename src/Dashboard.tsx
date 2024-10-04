import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Classes, HTMLSelect } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
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
} from "./app";
import CompanyWidget from "./CompanyWidget";
import companiesData from "./fake_api_json/companies-lookup.json";

const { version } = require("../package.json");

export const THEMES = {
  ["Blueprint"]: "mosaic-blueprint-theme",
  ["Blueprint Dark"]: classNames("mosaic-blueprint-theme", Classes.DARK),
  ["None"]: "",
};

export type Theme = keyof typeof THEMES;

export type CompanyType = {
  id: string;
  ticker: string;
  name: string;
  lei: string | null;
  legal_name: string;
  stock_exchange: string;
  sic: number;
  short_description: string;
  long_description: string;
  ceo: string;
  company_url: string;
  business_address: string;
  mailing_address: string;
  business_phone_no: string;
  hq_address1: string;
  hq_address2: string | null;
  hq_address_city: string;
  hq_address_postal_code: string;
  entity_legal_form: string | null;
  cik: string;
  latest_filing_date: string | null;
  hq_state: string | null;
  hq_country: string;
  inc_state: string | null;
  inc_country: string;
  employees: number;
  entity_status: string | null;
  sector: string;
  industry_category: string;
  industry_group: string;
  template: string;
  standardized_active: boolean;
  first_fundamental_date: string;
  last_fundamental_date: string;
  first_stock_price_date: string;
  last_stock_price_date: string;
  thea_enabled: boolean | null;
  legacy_sector: string;
  legacy_industry_category: string;
  legacy_industry_group: string;
};

const Dashboard = () => {
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

  const renderNavBar = () => {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={Classes.NAVBAR_GROUP}>
          <div className={Classes.NAVBAR_HEADING}>
            <a href="https://github.com/nomcopter/react-mosaic">
              react-mosaic <span className="version">v{version}</span>
            </a>
          </div>
        </div>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <label
            className={classNames(
              "theme-selection",
              Classes.LABEL,
              Classes.INLINE
            )}
          >
            Theme:
            <HTMLSelect
              value={currentTheme}
              onChange={(e) => setCurrentTheme(e.currentTarget.value as Theme)}
            >
              {React.Children.toArray(
                Object.keys(THEMES).map((label) => <option>{label}</option>)
              )}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />
          <span className="actions-label">Example Actions:</span>
          <button
            className={classNames(
              Classes.BUTTON,
              Classes.iconClass(IconNames.GRID_VIEW)
            )}
            onClick={autoArrange}
          >
            Auto Arrange
          </button>
          <button
            className={classNames(
              Classes.BUTTON,
              Classes.iconClass(IconNames.ARROW_TOP_RIGHT)
            )}
            onClick={addToTopRight}
          >
            Add Window to Top Right
          </button>
        </div>
      </div>
    );
  };

  const totalWindowCount = getLeaves(currentNode).length;

  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompanies(companiesData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <div className="react-mosaic-example-app">
        {renderNavBar()}
        <Mosaic<number>
          renderTile={(count, path) => (
            <CompanyWidget
              companyInfo={companies[count-1]}
              isLoading={isLoading}
              path={path}
              totalWindowCount={totalWindowCount}
            />
          )}
          zeroStateView={
            <MosaicZeroState createNode={() => totalWindowCount + 1} />
          }
          value={currentNode}
          onChange={onChange}
          onRelease={onRelease}
          className={THEMES[currentTheme]}
          blueprintNamespace="bp4"
        />
      </div>
    </React.StrictMode>
  );
};

export default Dashboard;
