<template>
  <div class="mainBarChart">
    <div id="chart" class="chart-wrapper">
      <!-- original: width="1000"------------------------------------------------------------------>
      <!-- original: type="bar"------------------------------------------------------------------>
      <apexchart :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainBarChart",
  data() {
    return {
      series: [
        {
          data: [
            5,
            8,
            9,
            3,
            9,
            13,
            8,
            9,
            9,
            8,
            7,
            8,
            9,
            13,
            10,
            11,
            4,
            10,
            8,
            10,
          ],
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
            colors: ["#1976d2"],
          },
        },

        xaxis: {
          labels: {
            show: false,
          },
          style: {
            fontSize: "10px",
          },
          categories: [
            "[Albuquerque Albuquerque and Carvalho Comércio]",
            "[Batista Moreira and Pereira LTDA]",
            "[Carvalho Costa and Costa e Associados]",
            "[Costa Comércio Comércio]",
            "[Costa LTDA S.A.]",
            "[Melo Melo and Santos e Associados]",
            "[Pereira - Barros Comércio]",
            "[Santos - Batista Comércio]",
            "[Souza Comércio e Associados]",
            "[Xavier EIRELI S.A.]",
            "[Albuquerque Albuquerque and Carvalho Comércio]",
            "[Batista Moreira and Pereira LTDA]",
            "[Carvalho Costa and Costa e Associados]",
            "[Costa Comércio Comércio]",
            "[Costa LTDA S.A.]",
            "[Melo Melo and Santos e Associados]",
            "[Pereira - Barros Comércio]",
            "[Santos - Batista Comércio]",
            "[Souza Comércio e Associados]",
            "[Xavier EIRELI S.A.]",
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
              return val;
            },
          },
        },
        title: {
          text: "Completed Tasks",
          floating: true,
          //   offsetY: 330,
          offsetY: -5,
          align: "left",
          style: {
            color: "#444",
            fontSize: "15px",
          },
        },
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