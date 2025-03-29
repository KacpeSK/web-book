import { FC } from "react";
import { NodeData, NodeType } from "../utils/types";
import BasicNode from "./BasicNode";
import PageNode from "./PageNode";
import ImageNode from "./ImageNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

const TEXT_NODES_TYPES: NodeType[] = [
  "text",
  "list",
  "heading1",
  "heading2",
  "heading3",
];

const NodeTypeSwitcher: FC<NodeTypeSwitcherProps> = ({
  node,
  isFocused,
  index,
  updateFocusedIndex,
}) => {
  if (TEXT_NODES_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}
      />
    );
  }
  if (node.type == "page") {
    return (
      <PageNode
        node={node}
        index={index}
        isFocused={isFocused}
      />
    );
  }
  if (node.type == "image") {
    return (
      <ImageNode
        node={node}
        index={index}
        isFocused={isFocused}
      />
    );
  }
  return null;
};

export default NodeTypeSwitcher;
