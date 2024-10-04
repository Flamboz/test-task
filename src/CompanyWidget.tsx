import React, { useEffect, useRef } from "react";
import { MosaicBranch, MosaicWindow } from "./app";

interface CompanyWidgetProps {
  path: MosaicBranch[];
  totalWindowCount: number;
}

const CompanyWidget = ({ path, totalWindowCount }: CompanyWidgetProps) => {
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
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log("MosaicWindow.onDragStart")}
      onDragEnd={(type) => console.log("MosaicWindow.onDragEnd", type)}
    >
      <div className="example-window">
        <h1>hello</h1>
      </div>
    </MosaicWindow>
  );
};

export default CompanyWidget;
