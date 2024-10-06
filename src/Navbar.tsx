import { HTMLSelect } from "@blueprintjs/core";
import React from "react";
import { THEMES } from "./constants";
import { Theme } from "./types";
import { useWindowControls } from "./useWindowsControls";

export const Navbar = () => {
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
