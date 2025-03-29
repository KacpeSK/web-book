import { Dispatch, useEffect, useState } from "react";
import { NodeData } from "../utils/types";

type UseFocusedNodeIndexProps = {
  nodes: NodeData[];
};

type UseFocusedNodeIndexReturn = [
  index: number,
  setIndex: Dispatch<React.SetStateAction<number>>
];

export const useFocusedNodeIndex = ({
  nodes,
}: UseFocusedNodeIndexProps): UseFocusedNodeIndexReturn => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState<number>(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      }
      if (e.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
