<template>
  <div class="barChart">
    <h3>Tasks Per Status</h3>
    <v-divider></v-divider>
    <div id="chart" class="chart-wrapper">
      <apexchart
        class="my-8"
        type="bar"
        height="350"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "barChart",
  data() {
    return {
      series: [
        {
          data: [13, 12, 11, 20, 94, 21, 9],
        },
      ],
      // array 'series' trata dos valores de cada status dentro do projeto
      //"FOR_TEST","DONE","RELEASE_TO_PROD","QA_TESTING","IN_PROGRESS","PROD_DEPLOYING","QA_DEPLOYING",
      chartOptions: {
        chart: {
          width: "100%",
          height: "auto",
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val; /*original: + " tasks"*/
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#1976d2"],
          },
        },

        xaxis: {
          categories: [
            "FOR_TEST",
            "DONE",
            "RELEASE_TO_PROD",
            "QA_TESTING",
            "IN_PROGRESS",
            "PROD_DEPLOYING",
            "QA_DEPLOYING",
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
              return val + "%";
            },
          },
        },
        //title: {
        //text: "Tasks Per Status",
        //floating: true,
        //   offsetY: 330,
        //offsetY: -5,
        //align: "left",
        //style: {
        //color: "#444",
        //fontSize: "15px",
        //},
        //},
        colors: ["#304758"],
      },
    };
  },
};
</script>


<style>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>