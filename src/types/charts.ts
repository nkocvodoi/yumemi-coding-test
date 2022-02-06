interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface City {
  prefCode: number;
  cityCode: string;
  cityName: string;
  bigCityFlag: string;
}

interface YearPopulation {
  year: number;
  value: number;
}

interface PopulationType {
  label: string;
  data: YearPopulation[];
}

