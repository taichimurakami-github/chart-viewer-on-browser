import config from "../../config.json";
import { BarChartDataset } from "../../types/chartJS";
import { resultData } from "../../types/data";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ShowSnapShotCharts = (props: { result: resultData }) => {
  const result = props.result;

  //x軸のラベル：普通に数値を入れるだけ
  const x_axis_label = result.data[0].map((val, index) => index);

  //その他設定読みこみ
  const colors = config.View.Chart.colors;
  const width = config.View.Chart.width;

  /**
   * chartJSのdatasetを作成する
   * axisNames内に指定されたデータの種類から、どれを取り出すかを規定
   */
  const createDataSets = (t: number) => {
    const datasetsFromResult: BarChartDataset[] = [];

    //各空間ごとの割合を保存
    //二次元配列：[2:空間毎の、axisNamesに対応する各データの割合の配列][1:空間IDによる区切り]
    const every_space_rate_data: number[][] = [];

    //axisNamesの何番目から何番目に対応するか
    const range_start = 3;
    const range_end = result.axisNames.length;

    const spaceLength = result.data.length;

    for (let spaceID = 0; spaceID < spaceLength; spaceID++) {
      every_space_rate_data.push([]);
      const data = result.data[spaceID][t];
      let sum_all = 0;

      //全体を保存(S + R + I_ALL)
      sum_all += data[0] + data[1] + data[2];

      //空間毎の、axisNamesに対応する各データの割合の配列
      for (let i = range_start; i < range_end; i++) {
        every_space_rate_data[spaceID].push(data[i] / sum_all);
      }
    }

    for (let i = range_start; i < range_end; i++) {
      const insertObj: BarChartDataset = {
        label: result.axisNames[i],
        data: [],
        borderColor: colors[i],
        backgroundColor: colors[i],
      };

      for (const d of every_space_rate_data) {
        //every_space_rate_dataはrange_start地点から計算を開始した結果なので、
        //index=0がaxisNames.id=3に対応している
        //このズレを修正する
        insertObj.data.push(d[i - range_start]);
      }
    }

    return datasetsFromResult;
  };

  for (let i = 0; i < result.config.params.timeLength; i++) {
    const chartJS_chartData = {
      labels: x_axis_label,
      datasets: createDataSets(i),
    };

    const chartJS_options = {
      responsive: true,
      aspectRatio: 1.5,
      elements: {
        point: { radius: 0 },
      },
    };
  }

  return <></>;
};
