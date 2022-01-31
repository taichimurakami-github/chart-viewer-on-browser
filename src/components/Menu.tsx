import { useDispatch, useSelector } from "react-redux";
import { InputFile } from "./InputFile";
import config from "../config.json";
import { StoreState } from "../types/store";

export const Menu = () => {
  const dispatch = useDispatch();
  const result = useSelector((arg: { state: StoreState }) => arg.state.result);
  const displayChartTypes = config.View.Chart.chartTypes;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "0",
        left: "0",
        background: "white",
        padding: "10px",
      }}
    >
      <p>MENU</p>
      <InputFile />

      {result && (
        <div className="chart-view-control-panel">
          <ul
            style={{
              display: "flex",
              columnGap: "15px",
              padding: "0",
            }}
          >
            <button
              onClick={() => {
                dispatch({
                  type: "VIEW_CHANGE_CHART_TYPE",
                  chartType: displayChartTypes["001"],
                });
              }}
            >
              all
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "VIEW_CHANGE_CHART_TYPE",
                  chartType: displayChartTypes["002"],
                });
              }}
            >
              SIR
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "VIEW_CHANGE_CHART_TYPE",
                  chartType: displayChartTypes["003"],
                });
              }}
            >
              I_only
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};
