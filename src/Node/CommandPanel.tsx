import { FC, useEffect, useState } from "react";
import { NodeType } from "../utils/types";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css";

type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "page", name: "Page" },
  { value: "image", name: "Image" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
];

const CommandPanel: FC<CommandPanelProps> = ({ selectItem, nodeText }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLocaleLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      supportedNodeTypes.findIndex((item) => {
        return item.value.match(normalizedValue);
      })
    );
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={`${styles.panel} ${overflows ? styles.reverse : ""}`}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;

          return (
            <li
              key={type.value}
              className={`${selected ? styles.selected : ""}`}
              onClick={() => selectItem(type.value)}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommandPanel;
