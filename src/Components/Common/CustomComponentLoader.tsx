import { CircularProgress } from "@mui/material";
import React from "react";

interface CustomComponentLoaderProps {
  padding: string;
  size: number;
}

const CustomComponentLoader: React.FC<CustomComponentLoaderProps> = ({ padding, size }) => {
  return (
    <div
      style={{
        padding: padding,
      }}
    >
      <CircularProgress color="inherit" size={size} />
    </div>
  );
};

export default CustomComponentLoader;

