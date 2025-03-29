import { NodeData } from "../utils/types";
import { ChangeEvent, FC, useContext, useEffect, useRef } from "react";

import { AppStateContext } from "../state/AppStateContext";
import styles from "./Node.module.css";
import FileImage from "../components/FileImage";
import { uploadImage } from "../utils/uploadImage";

type ImageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

const ImageNode: FC<ImageNodeProps> = ({ node, isFocused, index }) => {
  const { removeNodeByIndex, changeNodeType, changeNodeValue } =
    useContext(AppStateContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!node.value || node.value.length === 0) {
      fileInputRef.current?.click();
    }
  }, [node]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }
      if (event.key === "Enter") {
        fileInputRef.current?.click();
      }
    };
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, removeNodeByIndex, index, node]);

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target.files) {
      changeNodeType(index, "text");
    }
    try {
      const result = await uploadImage(target.files?.[0]);
      if (result?.filePath) {
        changeNodeValue(index, result?.filePath);
      }
    } catch (error) {
      changeNodeType(index, "text");
      console.log(error);
    }
  };

  return (
    <div
      className={`${styles.node} ${styles.image} ${
        isFocused ? styles.focused : ""
      }`}
    >
      <FileImage filePath={node.type} />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onImageUpload}
      />
    </div>
  );
};

export default ImageNode;
