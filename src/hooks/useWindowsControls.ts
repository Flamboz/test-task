import { useState } from "react";
import { Corner, createBalancedTreeFromLeaves, getLeaves, getNodeAtPath, getOtherDirection, getPathToCorner, MosaicDirection, MosaicNode, MosaicParent, updateTree } from "../lib";
import { dropRight } from "lodash";
import { Theme } from "../types";

export const useWindowControls = () => {
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
