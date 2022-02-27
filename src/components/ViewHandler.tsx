import { useSelector } from "react-redux";
import { StoreState } from "../types/store";

import config from "../config.json";
import { ShowLineCharts } from "./generators/ShowLineCharts";
import { ShowSnapShotCharts } from "./generators/ShowSnapShotCharts";
import { useMemo } from "react";

export const ViewHandler = () => {
  const result = useSelector((arg: { state: StoreState }) => arg.state.result);
  const viewState = useSelector((arg: { state: StoreState }) => arg.state.view);

  //resultにデータが格納されていなかったら終了
  const displayChartTypes = config.View.Chart.chartTypes;

  //S, R, E_ALL, I_ALL, E_xx, I_xx,...
  //I_ALLのid
  const START_OF_I_AND_E = 4;

  const viewData = useMemo(() => {
    console.log("useMemo");
    if (result) {
      return {
        [displayChartTypes["001"]]: (
          <ShowLineCharts
            result={result}
            range={{
              start: null,
              end: null,
            }}
          />
        ),
        [displayChartTypes["002"]]: (
          <ShowLineCharts
            result={result}
            range={{
              start: 0,
              end: START_OF_I_AND_E,
            }}
          />
        ),
        [displayChartTypes["003"]]: (
          <ShowLineCharts
            result={result}
            range={{
              start: START_OF_I_AND_E,
              end: null,
            }}
          />
        ),
        [displayChartTypes["010"]]: <ShowSnapShotCharts result={result} />,
      };
    }
  }, [result]);

  if (result && viewData) {
    return (
      <>
        {viewState === ""
          ? viewData[displayChartTypes["010"]]
          : viewData[viewState]}
      </>
    );
  } else {
    return <>{<p>no data.</p>}</>;
  }
};
