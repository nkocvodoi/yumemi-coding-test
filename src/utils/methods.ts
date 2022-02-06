import api from "./api";
import "@/types/charts.ts";

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const res = await api.get(`/prefectures`);
    let prefectures: Prefecture[] = [];
    if (res.status == 200) {
      prefectures = res.data.result;
    }
    return prefectures;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchCities = async (prefCode: number): Promise<City[]> => {
  try {
    const res = await api.get(`/cities`, {
      params: {
        prefCode: prefCode,
      },
    });
    let cities: City[] = [];
    if (res.status == 200) {
      cities = res.data.result;
    }
    return cities;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchChartData = async (
  prefCode: number,
  cityCode: string
): Promise<PopulationType[]> => {
  try {
    const res = await api.get(`/population/composition/perYear`, {
      params: {
        prefCode: prefCode,
        cityCode: cityCode,
      },
    });
    let population: PopulationType[] = [];
    if (res.status == 200) {
      population = res.data.result.data;
    }
    return population;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
