import { FC } from "react";
import styles from "./Spacer.module.css";

type SpacerProps = {
  handleClick(): void;
  showHint: boolean;
};

const Spacer: FC<SpacerProps> = ({ handleClick, showHint }) => {
  return (
    <div
      className={styles.spacer}
      onClick={handleClick}
    >
      {showHint && "Click to create the first paragraph."}
    </div>
  );
};

export default Spacer;
