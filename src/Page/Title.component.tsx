import { FC, useEffect, useRef } from "react";
import { NodeData } from "../utils/types";
import styles from "./Title.module.css";
import { nanoid } from "nanoid";

type TitleProps = {
  title: string;
  changePageTitle(title: string): void;
  addNode(node: NodeData, index: number): void;
};

const Title: FC<TitleProps> = ({ title, changePageTitle, addNode }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        ref={headerRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNode({ type: "text", id: nanoid(), value: "" }, 0);
          }
        }}
      />
    </div>
  );
};

export default Title;
