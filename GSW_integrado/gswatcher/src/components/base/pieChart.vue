<template>
 <div class="chart-wrapper" id="chart">
     <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
     
      </div>
</template>

<script>
// category
// datetime
// numeric
export default {
  name: "lineChart",
  data: () => ({
          
          series: [82.5, 12.5],
          chartOptions: {
            chart: {
              width: '100%',
              type: 'pie',
            },
            labels: ["Complete", "Incomplete"],
            theme: {
              monochrome: {
                enabled: true
              }
            },
            plotOptions: {
              pie: {
                  customScale: 1.1,
                  dataLabels: {
                      offset: -5,
                }
              }
            },
            title: {
              text: "Monochrome Pie"
            },
            dataLabels: {
              formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
              }
            },
            legend: {
              show: false
            }
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