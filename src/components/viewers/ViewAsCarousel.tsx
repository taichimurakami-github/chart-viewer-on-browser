import { useEffect, useRef, useState } from "react";

export const ViewAsCarousel = (props: any) => {
  const [viewID, setViewID] = useState(0);
  const [inputState, setInputState] = useState<string>("0");

  const elementsLength: number = props.components.length;

  const auto_IC_flg = useRef(false);
  const autoIC_interval = 50;

  const getViewComponent = () => props.components[viewID];
  const autoIncrementViewID = async () => {
    //viewIDは最初に渡された値で固定されてしまうので、
    //現在のviewIDをトレースするカウンタを別途用意
    //ループ管理はこれで行う
    let cnt = viewID;

    //ループ可能かどうか判定
    const isAbleToIterate = () =>
      cnt < elementsLength - 1 && auto_IC_flg.current;

    //最後の要素を参照していたらループしない
    if (viewID >= elementsLength - 1) return setViewID(elementsLength - 1);

    auto_IC_flg.current = true;
    while (isAbleToIterate()) {
      setViewID((val) => val + 1);
      cnt++;
      var timeoutID;
      await new Promise((res, rej) => {
        timeoutID = setTimeout(res, autoIC_interval);
      });
      clearTimeout(timeoutID);
    }
  };

  useEffect(() => {
    setInputState(String(viewID));
  }, [viewID]);
  return (
    <div style={{ padding: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {getViewComponent()}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const inputID = Number(inputState);
          if (typeof inputID === "number") {
            setViewID(
              inputID < elementsLength - 1 ? inputID : elementsLength - 1
            );
          }
        }}
      >
        <label style={{ fontSize: "18px" }}>t = </label>
        <input
          type="text"
          value={inputState}
          style={{ width: "60px" }}
          onChange={(e) => {
            const value = e.target.value;
            setInputState(value);
          }}
        />
        <span> / {elementsLength - 1} </span>
        <button style={{ marginLeft: "15px" }} type="submit">
          表示
        </button>
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
          !auto_IC_flg.current && autoIncrementViewID();
        }}
      >
        auto_play
      </button>
      <button
        onClick={() => {
          auto_IC_flg.current = false;
        }}
        disabled={!auto_IC_flg.current}
      >
        stop
      </button>
      <button
        onClick={() => {
          auto_IC_flg.current = false;
          setViewID(0);
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          viewID !== elementsLength - 1 && setViewID(viewID + 1);
        }}
      >
        &gt;
      </button>
    </div>
  );
};
