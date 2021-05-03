<template>
  <div>
    <apexchart
      width="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      series: [
        {
          name: "Completed Tasks",
          data: [
            44,
            55,
            41,
            64,
            22,
            43,
            21,
            44,
            55,
            41,
            64,
            22,
            43,
            21,
            44,
            55,
            41,
            64,
            22,
          ],
        },
        {
          name: "Incompleted Tasks",
          data: [
            53,
            32,
            33,
            52,
            13,
            44,
            32,
            12,
            15,
            43,
            76,
            11,
            32,
            14,
            34,
            32,
            22,
            21,
            22,
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: "auto",
          width: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            columnWidth: "100%",
            barHeight: "50%",
            //distributed: false,
            //rangeBarOverlap: true,
            //rangeBarGroupRows: true,
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
              hideOverflowingLabels: true,
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 15,
          offsetY: 0,
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
        },
        stroke: {
          show: false,
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "",
        },
        xaxis: {
          labels: {
            show: false,
            trim: false,
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
        tooltip: {
          shared: true,
          intersect: false,
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  },
};
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>