<template>
  <div class="population">
    <h1>{{ msg }}</h1>
    <Multiselect
      :class="$style.prefSelectBox"
      v-model="selectedPref"
      placeholder="Choose a Prefecture"
      label="name"
      :filter-results="false"
      :min-chars="1"
      :resolve-on-load="false"
      :delay="0"
      :searchable="true"
      :options="
        async function (query) {
          return filteringPrefectures(query);
        }
      "
    />
    <Multiselect
      :class="$style.citySelectBox"
      v-if="cities.length > 0"
      v-model="selectedCity"
      placeholder="Choose a City"
      label="name"
      :filter-results="false"
      :min-chars="1"
      :resolve-on-load="false"
      :delay="0"
      :searchable="true"
      :options="
        async function (query) {
          return filteringCities(query);
        }
      "
    />
    <h1 v-if="chartData">
      {{ chartTitle }}
    </h1>
    <BarChart v-if="chartData" :options="barOpt" :chartData="chartData" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { fetchChartData, fetchCities, fetchPrefectures } from "@/utils/methods";
import Multiselect from "@vueform/multiselect";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Options({
  props: {
    msg: String,
  },
  components: {
    Multiselect,
    BarChart,
  },
  watch: {},
})
export default class PopulationChart extends Vue {
  msg!: string;
  prefectures: any[] = [];
  cities: any[] = [];
  populationData: any = null;
  selectedPref = 0;
  selectedPrefName = "";
  selectedCityName = "";
  selectedCity = "";
  chartTitle = "";
  barOpt = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  colorPallete = [
    "#00429d",
    "#1e4da2",
    "#2e59a8",
    "#3b65ad",
    "#4771b2",
    "#527db8",
    "#5d8abd",
    "#6896c2",
    "#73a2c6",
    "#7eafcb",
    "#8abccf",
    "#97c8d4",
    "#a5d5d8",
    "#b4e1db",
  ];
  @Watch("selectedPref")
  onChangeSelectedPref() {
    this.selectedCity = "";
    this.cities = [];
    if (this.selectedPref && this.selectedPref != 0) {
      this.selectedPrefName = this.prefectures.find(
        (val) => val.prefCode === this.selectedPref
      ).prefName;
      this.getCities();
    }
  }

  @Watch("selectedCity")
  onChangeselectedCity() {
    this.populationData = null;
    if (this.selectedCity && this.selectedCity != "") {
      this.selectedCityName = "";
      this.selectedCityName = this.cities.find(
        (val) => val.cityCode === this.selectedCity
      ).cityName;
      this.getChartData();
    }
    this.chartTitle = `Population of ${this.selectedPrefName}, ${this.selectedCityName}`;
  }

  mounted() {
    this.getPrefectures();
  }

  filteringPrefectures(query: string) {
    let prefs: { value: number; name: string }[] = [];
    const prefectures = this.prefectures.filter((pref) =>
      pref.prefName.includes(query)
    );
    if (prefectures) {
      prefs = prefectures.map((val) => ({
        value: val.prefCode,
        name: val.prefName,
      }));
    }
    return prefs;
  }

  filteringCities(query: string) {
    let cities: { value: string; name: string }[] = [];
    const cityData = this.cities.filter((city) =>
      city.cityName.includes(query)
    );
    if (cityData) {
      cities = cityData.map((val) => ({
        value: val.cityCode,
        name: val.cityName,
      }));
    }
    return cities;
  }

  get chartData() {
    if (this.populationData) {
      const yearLabels: number[] = this.populationData[0].data.map(
        (val: { year: number }) => val.year
      );
      const totalPopulations: number[] = this.populationData[0].data.map(
        (val: { value: number }) => val.value
      );
      const youngPopulations: number[] = this.populationData[1].data.map(
        (val: { value: number }) => val.value
      );
      const workingAgePopulations: number[] = this.populationData[2].data.map(
        (val: { value: number }) => val.value
      );
      const agedPopulations: number[] = this.populationData[3].data.map(
        (val: { value: number }) => val.value
      );
      const chartDataset = {
        labels: yearLabels,
        datasets: [
          {
            label: "Total",
            data: totalPopulations,
            backgroundColor: this.colorPallete,
          },
          {
            label: "Young",
            data: youngPopulations,
            backgroundColor: this.colorPallete,
          },
          {
            label: "Working-age",
            data: workingAgePopulations,
            backgroundColor: this.colorPallete,
          },
          {
            label: "Aged",
            data: agedPopulations,
            backgroundColor: this.colorPallete,
          },
        ],
      };
      return chartDataset;
    }
    return null;
  }

  async getPrefectures() {
    this.prefectures = await fetchPrefectures();
  }

  async getCities() {
    this.cities = await fetchCities(this.selectedPref);
  }

  async getChartData() {
    this.populationData = await fetchChartData(
      this.selectedPref,
      this.selectedCity
    );
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped module>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.prefSelectBox {
  margin-top: 10vh;
  width: 60%;
}

.citySelectBox {
  margin-top: 4vh;
  margin-bottom: 4vh;
  width: 60%;
}
</style>
