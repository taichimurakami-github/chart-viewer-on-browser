import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/store";
import { Line } from "react-chartjs-2";
import config from "../config.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type datasetObject = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
};

export const View = () => {
  const result = useSelector((arg: { state: StoreState }) => arg.state.result);
  const viewState = useSelector((arg: { state: StoreState }) => arg.state.view);

  //resultにデータが格納されていなかったら終了
  if (!result) return <p>no data</p>;

  //x軸のラベル：普通に数値を入れるだけ
  const x_axis_label = result.data[0].map((val, index) => index);

  //その他設定読みこみ
  const colors = config.View.Chart.colors;
  const width = config.View.Chart.width;

  /**
   * chartJSのdatasetを作成する
   * @param spaceID
   * どの空間のデータセットを作成するかを空間IDで指定
   *
   * @param targetRange
   * axisNames内に指定されたデータの種類から、どれを取り出すかを規定
   */
  const createDataSets = (
    spaceID: number = 0,
    r_start: number = 0,
    r_end: number = result.axisNames.length
  ) => {
    const data = result.data[spaceID];
    const datasetsFromResult = [];

    for (let i = r_start; i < r_end; i++) {
      const insertObj: datasetObject = {
        label: result.axisNames[i],
        data: [],
        borderColor: colors[i],
        backgroundColor: colors[i],
        borderWidth: 2,
      };

      //dataに各ラベルに対応する値を抽出して代入
      for (let j = 0; j < data.length; j++) {
        insertObj.data.push(data[j][i]);
      }

      datasetsFromResult.push(insertObj);
    }

    return datasetsFromResult;
  };

  const createLineChartComponent = (
    r_start: number = 0,
    r_end: number = result.axisNames.length
  ) => {
    const LineChartComponents = [];

    //全ての空間に対して走査
    for (let spaceID = 0; spaceID < result.data.length; spaceID++) {
      const chartJS_chartData = {
        labels: x_axis_label,
        datasets: createDataSets(spaceID, r_start, r_end),
      };
      const chartJS_options = {
        responsive: true,
        aspectRatio: 1.5,
        elements: {
          point: { radius: 0 },
        },
      };

      LineChartComponents.push(
        <div style={{ width: width + "px" }}>
          <Line
            height={100}
            width={100}
            data={chartJS_chartData}
            id={`chart_of_space_${spaceID}`}
            options={chartJS_options}
          />
          <p>Space {spaceID}</p>
        </div>
      );
    }

    return LineChartComponents;
  };

  //描画部分
  const ChartComponents = {
    all: createLineChartComponent(),
    SIR: createLineChartComponent(0, 3),
    I_only: createLineChartComponent(3),
  };

  const handleViewerWidth = () => {
    const w_col = result.config.params.space.length.col;
    switch (result.config.params.space.connectionType) {
      case "partial":
        return (width + config.View.Chart.gap.col) * w_col + "px";
      default:
        return width * 10 + "px";
    }
  };

  const handleView = () => {
    const displayChartTypes = config.View.Chart.chartTypes;
    switch (viewState) {
      case displayChartTypes["002"]:
        return ChartComponents.SIR;

      case displayChartTypes["003"]:
        return ChartComponents.I_only;

      default:
        return ChartComponents.all;
    }
  };

  return (
    <>
      <div
        className="chart-view-container"
        style={{
          display: "flex",
          gap: "10px",
          padding: "100px",
          flexWrap: "wrap",
          width: handleViewerWidth(),
        }}
      >
        {handleView()}
      </div>
    </>
  );
};
