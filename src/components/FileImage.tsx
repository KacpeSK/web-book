import { FC, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../utils/utils.module.css";
import { Loader } from "./Loader";

type FileImageProps = {
  filePath: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const FileImage: FC<FileImageProps> = ({ filePath, ...props }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setLoading(true);
      const { data } = await supabase.storage.from("images").download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
        setLoading(false);
      }
    };
    if (filePath && filePath.length > 0) {
      downloadImage(filePath);
    }
  }, [filePath]);

  if (loading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader />
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={filePath}
      {...props}
    ></img>
  );
};

export default FileImage;
