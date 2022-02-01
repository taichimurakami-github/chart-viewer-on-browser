import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/store";

import config from "../config.json";
import { ShowLineChartComponents } from "./chartGenerators/ShowLineChartComponent";

export const ViewHandler = () => {
  const result = useSelector((arg: { state: StoreState }) => arg.state.result);
  const viewState = useSelector((arg: { state: StoreState }) => arg.state.view);

  //resultにデータが格納されていなかったら終了
  if (!result) return <p>no data</p>;

  const handleView = () => {
    const displayChartTypes = config.View.Chart.chartTypes;
    switch (viewState) {
      case displayChartTypes["002"]:
        return (
          <ShowLineChartComponents
            result={result}
            range={{
              start: 0,
              end: 3,
            }}
          />
        );

      case displayChartTypes["003"]:
        return (
          <ShowLineChartComponents
            result={result}
            range={{
              start: 3,
              end: null,
            }}
          />
        );

      default:
        return (
          <ShowLineChartComponents
            result={result}
            range={{
              start: null,
              end: null,
            }}
          />
        );
    }
  };

  return <>{handleView()}</>;
};
