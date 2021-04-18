<template>
  <div>
    <h3>Percentage of Completed and Incompleted Tasks</h3>
    <v-divider></v-divider>
    <div class="chart-wrapper" id="chart">
      <apexchart
        class="my-3"
        type="pie"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
// category
// datetime
// numeric
export default {
  name: "lineChart",
  data: () => ({
    series: [87.5, 12.5],
    chartOptions: {
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: ["Complete", "Incomplete"],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          //size: 500,
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 0.77,
          dataLabels: {
            offset: 50,
            minAngleToShowLabel: 10,
          },
        },
      },
      //title: {
      //  text: "Monochrome Pie",
      //},
      dataLabels: {
        unable: false,
        unableOnSeries: undefined,
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "14px",
          fontWeight: "500",
          colors: ["black"],
        },
      },
      legend: {
        show: false,
      },
    },
  }),
};
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>