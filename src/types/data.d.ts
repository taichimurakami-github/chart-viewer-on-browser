export type data_ofArray = number[][][];

export type data_axis = string[];

export type corona_model_config = {
  params: {
    timeLength: number;
    maxCoeffConst: number;
    maxPopulationSize: number;
    birthRate: number;
    initialInfectiousRate: number;
    initialFatarity: number;
    feedbackRate: number;
  };
  models: {
    Space: {
      connectionType: "partial" | "full";
      length: {
        col: number;
        row: number;
      };
    };
  };
  io: {
    writeResultAsXLSX: boolean;
    writeResultAsJSON: boolean;
    writeResultAsPNG: boolean;
    showProgressBar: boolean;
    resultArrayDepth: number;
  };
  variantConfig: {
    strainType: string;
    infectivity: number;
    resilience: number;
    fatarity: number;
    appearanceTime: number;
    appearanceAt: number[];
    crossImmunity: { [virusID: string]: string };
  }[];
};

export type resultData = {
  axisNames: data_axis;
  config: corona_model_config;
  data: data_ofArray;
};
