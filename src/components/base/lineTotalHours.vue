<template>
  <div class="chart">
    <div class="barChart">
        <apexchart
          class="my-8"
          type="line"
          height="300"
          width="100%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teste: [],
      teste2: [],
      inicio: [],
      horas: [],
      series: [
        {
          data: [
            4.68,
            4.28,
            8.75,
            4.26,
            4.14,
            0.86,
            9.08,
            9.09,
            3.55,
            8.52,
            5,
            4.82,
            3.88,
            2.29,
            6.44,
            9,
            8.32,
            1.86,
            7.84,
            4.52,
            3.52,
            4.55,
            5.96,
            2.96,
            0.9,
            8.05,
            1.25,
            4.49,
            6.66,
            2.88,
            6.34,
            5.68,
            3.85,
            1.05,
            6.02,
            3.49,
            0.11,
            8.12,
            5.96,
            4.92,
            4.04,
            7.41,
            2.34,
            3.02,
            4.47,
            5.21,
            7.89,
            7.25,
            2.75,
            6.53,
            5.32,
            2.27,
            8.95,
            7.41,
            1.8,
            1.91,
            9.29,
            8.19,
            3.88,
            4.08,
            8.48,
            9.17,
            6.58,
            8.34,
            7.31,
            0.93,
            0.72,
            4.09,
            1.82,
            0.15,
            2.91,
            8.76,
            1.63,
            2.72,
            0.02,
            4.56,
          ],
        },
      ],

      chartOptions: {
        chart: {
          width: "100%",
          height: "100%",
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 9,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },

        title: {
          text: "Worked Hours",
          align: "left",
          style: {
            color: "#444",
            fontSize: "16px",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val; /*original: + " tasks"*/
          },
          offsetY: -20,
          style: {
            fontSize: "14px",
            colors: ["#333333"],
          },
        },

        xaxis: {
          type: "datetime",
          categories: [
            "2019-01-11",
            "2019-01-24",
            "2019-01-25",
            "2019-02-05",
            "2019-02-11",
            "2019-05-14",
            "2019-05-17",
            "2019-05-17",
            "2019-05-28",
            "2019-05-29",
            "2019-06-04",
            "2019-06-05",
            "2019-06-12",
            "2019-06-13",
            "2019-06-17",
            "2019-06-20",
            "2019-07-05",
            "2019-07-09",
            "2019-07-16",
            "2019-07-22",
            "2019-07-24",
            "2019-08-04",
            "2019-08-28",
            "2019-09-01",
            "2019-09-09",
            "2019-09-16",
            "2019-09-30",
            "2019-10-01",
            "2019-10-15",
            "2019-10-20",
            "2019-10-21",
            "2019-10-25",
            "2019-11-12",
            "2019-11-18",
            "2019-11-30",
            "2019-12-27",
            "2020-01-02",
            "2020-01-07",
            "2020-01-11",
            "2020-02-12",
            "2020-02-20",
            "2020-02-21",
            "2020-02-28",
            "2020-03-08",
            "2020-03-31",
            "2020-03-31",
            "2020-04-15",
            "2020-04-18",
            "2020-04-20",
            "2020-04-23",
            "2020-05-05",
            "2020-05-05",
            "2020-05-08",
            "2020-05-18",
            "2020-06-09",
            "2020-08-01",
            "2020-08-27",
            "2020-09-12",
            "2020-09-19",
            "2020-09-26",
            "2020-10-12",
            "2020-10-22",
            "2020-10-25",
            "2020-10-29",
            "2020-11-12",
            "2020-11-12",
            "2020-11-19",
            "2020-11-23",
            "2020-11-28",
            "2020-11-28",
            "2020-11-29",
            "2020-12-01",
            "2020-12-06",
            "2020-12-10",
            "2020-12-11",
            "2020-12-15",
            "2020-12-20",
            "2020-12-26",
            "2020-12-31",
            "2020-12-31",
            "2021-01-03",
          ],
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.3,
                opacityTo: 0.4,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            },
          },
        },
        colors: ["#FFA726"],
      },
    };
  },

  computed: {
    project() {
      return this.$store.state.project;
    },
  },

  mounted() {
    this.$store.dispatch("getProject", this.$route.params.id);
  },

  watch: {
    project() {
      this.setSides(this.project);
    },
  },

  methods: {
    setSides(project) {
      console.log(project);
      project.forEach((elem) => {
        if (elem.dev_id == this.$route.params.dev_id) {
          if (elem.horas != null) {
            this.horas.push(elem.horas);
            this.inicio.push(elem.inicio);

            // this.teste2 = [elem.inicio, elem.horas]
            // this.teste.push(this.teste2)
          }
          //  if(elem.inicio != null){
          //   this.inicio.push(elem.inicio)
          // }
        }
      });

      // this.teste = {
      //         horas: this.horas,
      //         inicio: this.inicio
      //       }

      console.log(this.horas);
      console.log(this.inicio);
      // console.log(this.teste)

      // this.teste.sort()

      // console.log(this.teste)

      // this.series = [18.7, 81.3]
      // this.series = [this.horas.length, this.inicio.length]
      this.series = [
        {
          data: this.horas,
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.inicio,
          },
        },
      };
    },
  },
};
</script>


<style>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart {
  padding: 10px 10px 0px 10px;
  border: 2px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 4px grey;
}
</style>