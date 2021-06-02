<template>
  <div class="mainBarChart">
    <div class="chart">
      <!-- <v-btn @click="setData(compltask)"></v-btn> -->
      <div id="chart" class="chart-wrapper">
        <!-- original: width="1000"------------------------------------------------------------------>
        <!-- original: type="bar"------------------------------------------------------------------>
        <apexchart
          min-width="350"
          height="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainBarChart",
  data() {
    return {
      tasksCompleted: [],
      tasksIncompleted: [],
      projectName: [],
      series: [
        {
          name: "Complete",
          data: [],
        },
        {
          name: "Incomplete",
          data: [],
        },
      ],
      // array 'series' trata dos valores de cada status dentro do projeto
      //"FOR_TEST","DONE","RELEASE_TO_PROD","QA_TESTING","IN_PROGRESS","PROD_DEPLOYING","QA_DEPLOYING",
      chartOptions: {
        chart: {
          width: "100%",
          height: "500",
          type: "bar",
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: "50%",
            barHeight: "100%",
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: true,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                },
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
            },
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val; /** + " tasks" -----------------------------------------------------------*/
          },
          offsetY: -20,
          offsetX: 0,
          style: {
            fontSize: "12px",
            colors: ["#000000"],
          },
        },

        xaxis: {
          labels: {
            show: false,
          },
          style: {
            fontSize: "10px",
          },
          categories: [],
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
                opacityFrom: 0.4,
                opacityTo: 0.5,
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
        title: {
          text: "Project's Tasks Overview",
          floating: true,
          //   offsetY: 330,
          offsetY: -5,
          align: "left",
          style: {
            color: "#444",
            fontSize: "15px",
          },
        },
        colors: ["#01579B", "#E53935"],
      },
    };
  },

  computed: {
    compltask() {
      return this.$store.state.compltask;
    },
  },

  watch: {
    compltask() {
      this.setData(this.compltask);
    },
  },

  mounted() {
    this.$store.dispatch("getCompleteTask");
  },

  methods: {
    setData(compltask) {
      this.projectName = [];
      this.tasksCompleted = [];
      this.tasksIncompleted = [];
      console.log(compltask);

      compltask.forEach((elem) => {
        this.projectName.push(elem.projeto_nome);
        this.tasksCompleted.push(elem.tasks_completas);
        this.tasksIncompleted.push(elem.tasks_incompletas);
      });

      console.log(this.projectName);
      console.log(this.tasksCompleted);
      console.log(this.tasksIncompleted);

      console.log(this.series.name);

      (this.series = [
        {
          name: "Complete",
          data: this.tasksCompleted,
        },
        {
          name: "Incomplete",
          data: this.tasksIncompleted,
        },
      ]),
        (this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: this.projectName,
            },
          },
        });
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
  box-shadow: 5px 5px 5px 2px grey;
}
</style>