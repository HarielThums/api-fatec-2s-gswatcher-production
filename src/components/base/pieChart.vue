<template>
  <div class="chart">
    <div class="chart-wrapper" id="chart">
      <apexchart
        class="my-3"
        type="pie"
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
  name: "pieChart",

  data() {
    return {
      complData: [],
      incomplData: [],
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
      title: {
        text: "Percentage of Completed Tasks",
      },
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
      colors: ["#03a9f4", "#ffa726"],
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
    setSides(project){
      //console.log(project)
      project.forEach((elem) =>{
        if(elem.horas != null) {
          this.complData.push(elem.horas)
        }else {
            this.incomplData.push(elem.horas)
        }
        
      })
      //console.log(this.incomplData)

      let completed  = (this.complData.length/2)
      let incompleted  = (this.incomplData.length/2)

      
      // this.series = [18.7, 81.3]
      this.series = [completed, incompleted]

    }
  }



};
</script>

<style scoped>
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