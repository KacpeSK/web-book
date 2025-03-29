import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useContext,
} from "react";
import { NodeData, NodeType } from "../utils/types";
import styles from "./Node.module.css";
import { nanoid } from "nanoid";
import { AppStateContext } from "../state/AppStateContext";
import CommandPanel from "./CommandPanel";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

const BasicNode: FC<BasicNodeProps> = (props) => {
  const { node, updateFocusedIndex, isFocused, index } = props;

  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { changeNodeValue, changeNodeType, removeNodeByIndex, addNode } =
    useContext(AppStateContext);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node, isFocused]);

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const handleInput: FormEventHandler<HTMLDivElement> = (e) => {
    const textContent = e.currentTarget.textContent;
    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (e.key === "Backspace") {
      if (target.textContent?.length === 0) {
        e.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel
          selectItem={parseCommand}
          nodeText={node.value}
        />
      )}
      <div
        contentEditable
        suppressContentEditableWarning
        ref={nodeRef}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        className={`${styles.node} ${styles[node.type]}`}
      />
    </>
  );
};

export default BasicNode;
