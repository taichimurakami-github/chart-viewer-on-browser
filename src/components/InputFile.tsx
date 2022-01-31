import React from "react";
import { useDispatch } from "react-redux";

export const InputFile = () => {
  const dispatchStore = useDispatch();

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      if (file.name.split(".").pop() === "json") {
        (async () => {
          const fileDataAsText = await file.text();
          dispatchStore({
            type: "LOAD",
            result: JSON.parse(fileDataAsText),
          });
        })();
      }
    } else {
      console.error("failed to load JSON");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <input type="file" onChange={handleLoadFile} />
    </div>
  );
};
