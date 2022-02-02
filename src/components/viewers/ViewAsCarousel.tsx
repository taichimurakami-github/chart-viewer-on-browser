import { useEffect, useState } from "react";

export const ViewAsCarousel = (props: any) => {
  const [viewID, setViewID] = useState(0);
  const [inputState, setInputState] = useState<string>("0");
  const elementsLength = props.components.length;
  const getViewComponent = () => props.components[viewID];
  let autoIncrement: any;
  const autoIncrementViewID = () => {
    if (autoIncrement) return;
    autoIncrement = setInterval(() => {
      setViewID((val) => {
        if (val === elementsLength - 1 || val > elementsLength - 1) {
          clearInterval(autoIncrement);
          return elementsLength - 1;
        }
        return val + 1;
      });
    }, 75);
  };

  useEffect(() => {
    setInputState(String(viewID));
  }, [viewID]);
  return (
    <div style={{ padding: "100px" }}>
      {getViewComponent()}
      <form
        onSubmit={(e) => {
          if (
            typeof Number(inputState) === "number" &&
            Number(inputState) < elementsLength
          )
            setViewID(Number(inputState));
        }}
      >
        <input
          type="text"
          value={inputState}
          onChange={(e) => {
            const value = e.target.value;
            setInputState(value);
          }}
        />
        <button type="submit">表示</button>
      </form>
      <button
        onClick={() => {
          viewID !== 0 && setViewID(viewID - 1);
        }}
      >
        &lt;
      </button>
      <button
        onClick={() => {
          viewID !== elementsLength - 1 && setViewID(viewID + 1);
        }}
      >
        &gt;
      </button>
      <button onClick={autoIncrementViewID}>auto_play</button>
      <button
        onClick={() => {
          clearInterval(autoIncrement);
          setViewID(0);
        }}
      >
        reset
      </button>
    </div>
  );
};
