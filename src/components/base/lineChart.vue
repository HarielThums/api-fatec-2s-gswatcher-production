<template>
  <div class="chart">
    <apexchart
      class="my-8"
      height="300"
      width="100%"
      type="line"
      :options="options"
      :series="series"
    >
    </apexchart>
  </div>
</template>

<script>
// category
// datetime
// numeric
export default {
  name: "lineChart",
  // props: ["project"],
  data: () => ({
    options: {
      chart: {
        title: "Nome",
        id: "vuechart-example",
      },

      // *** Título do Gráfico ***
      title: {
        text: "Total Hours",
        align: "left",
        style: {
          color: "#444",
          fontSize: "15px",
        },
      },

      // *** Dados (números) na Linha do Gráfico ***
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
      colors: ["#006064"],

      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
     yaxis: {
       lines: {
         show: true
        }
     },

      xaxis: {
        // type: "datetime",
        categories: [],
      },
    },
    series: [
      {
        data: [],
      },
    ],
  }),
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
      this.count(this.project);
    },
  },

  // mounted() {
  //   console.log("BarChart mounted!");
  // this.count(this.project);
  // },

  methods: {
    count(project) {
      let horas = []
      let inicio = []
      // let timeDate = {}
      let arr = []

      project.forEach((e) => {
        if (e.horas) {
          horas.push(e.horas);
          if (e.inicio) {
            e.inicio = new Date(e.inicio)
            e.inicio.toLocaleDateString()

            inicio.push(e.inicio.toLocaleDateString())
            // timeDate.push([e.horas, e.inicio.toLocaleDateString()])
            // timeDate = {
            //   horas: e.horas,
            //   data: e.inicio.toLocaleDateString()
            // }
            arr.push({
              horas: e.horas,
              data: e.inicio.toLocaleDateString()
            })
          }
        }
      });

      console.log(horas)
      console.log(inicio)
      console.log(arr)




      // console.log(status);
      // console.log(statusValue);

      this.series = [
        {
          data: horas,
        },
      ];
      this.options = {
        ...this.options,
        ...{
          xaxis: {
            categories: inicio,
          },
        },
      };
    },
  },
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