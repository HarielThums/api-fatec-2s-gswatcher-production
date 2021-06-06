<template>
  <div class="chart">
      <apexchart
        class="my-2"
        type="pie"
        height="300"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
  </div>
</template>

<script>
export default {
  name: "pieChart",

  data() {
    return {
      devData: [],
      projectData: [],
      series: [18.7, 81.3],
      chartOptions: {
        chart: {
          width: "100%",
          type: "pie",
        },
        labels: [this.$route.params.name, "Other developers"],
        theme: {
          monochrome: {
            enabled: true,
            color: "#5F27CD",
            shadeTo: "light",
            shadeIntensity: 0.7,
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
          text: "Project Contribution",
          style: {
            fontSize: "16px",
          },
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
      console.log(project)
      // project.forEach((elem) =>{
      //   if(elem.dev_id == "29af5134-9b8d-489a-8303-a83f89cb07ff"){ arr.push(elem)}else{this.projectData.push(elem)}
      // })
      project.forEach((elem) =>{
        if(elem.dev_id == this.$route.params.dev_id){
          if(elem.horas != null) {
            this.devData.push(elem.horas)
          }
        }else if(elem.dev_id != this.$route.params.dev_id){
          if(elem.horas != null){
            this.projectData.push(elem.horas)
          }
        }
      })
      console.log(this.devData)
      console.log(this.projectData)


      
      // this.series = [18.7, 81.3]
      this.series = [this.devData.length, this.projectData.length]

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