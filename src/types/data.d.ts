export type data_ofArray = number[][][];

export type data_axis = string[];

export type type_SettingsConfig = {
  params: {
    timeLength: number;
    maxTravelCoeff: number;

    spaceConnectionType: "partial";
    spaceLength: {
      col: number;
      row: number;
    };

    birthRate: number;
    initialInfectiousRate: number; //いらない
    initialFatarity: number;
    feedbackRate: number; //R -> before Rへの遷移
    initialPopulationMaxSize: number;
    initialPopulationRange: {
      min: number;
      max: number;
    };
  };
  io: {
    [key: string]: boolean;
  };
};

export type type_AllConfig = type_SettingsConfig & {
  variantConfig: type_VariantConfig;
  vaccine: type_VaccineConfig;
};

export type corona_model_config = type_AllConfig;

export type resultData = {
  axisNames: data_axis;
  config: corona_model_config;
  data: data_ofArray;
};
