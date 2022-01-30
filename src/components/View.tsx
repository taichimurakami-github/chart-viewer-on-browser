import { useSelector } from "react-redux";
import { StoreState } from "../types/store";
import { Line } from "react-chartjs-2";
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
import { resultData } from "../types/data";

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

  const createLineChartComponent = (result: resultData, spaceID: number) => {
    const datasetsFromResult = [];
    const x_axis_label = [];

    const data = result.data[spaceID];
    for (let i = 0; i < data.length; i++) x_axis_label.push(i);
    const colors = [
      "red",
      "yellow",
      "blue",
      "lightgreen",
      "green",
      "skyblue",
      "blue",
      "purple",
      "pink",
      "brown",
      "black",
    ];

    //とりあえず０番空間のみ描画してみる
    for (let i = 0; i < result.axisNames.length; i++) {
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

    const chartData = {
      labels: x_axis_label,
      datasets: datasetsFromResult,
    };
    const options = {
      responsive: true,
      aspectRatio: 1.5,
      elements: {
        point: { radius: 0 },
      },
    };

    return (
      <div style={{ width: "500px" }}>
        <Line
          height={100}
          width={100}
          data={chartData}
          id={`chart_of_space_${0}`}
          options={options}
        />
      </div>
    );
  };

  //描画用canvas作成
  if (result) {
    const ChartComponents = [];
    for (let spaceID = 0; spaceID < result.data.length; spaceID++) {
      ChartComponents.push(createLineChartComponent(result, spaceID));
    }
    return (
      <div
        className="chart-view-wrapper"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {ChartComponents}
      </div>
    );
  } else {
    return <p>no data.</p>;
  }
};
