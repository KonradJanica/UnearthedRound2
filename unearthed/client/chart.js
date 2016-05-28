data = {
    labels: ["", "", "", "", ""],
    datasets: [
        {
            backgroundColor: "rgba(255,99,132,1.0)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [0, 0, 0, 0, 0],
        }
    ]
};

newBarChart = null;

Template.barChart.onRendered(function() {

var ctx = document.getElementById("resultBarChart").getContext("2d");
    Chart.defaults.global.legend.display = false;
    Chart.defaults.bar.display = false;
    Chart.defaults.global.defaultColor = "rgba(255,255,255,0.0)";

    newBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
    });
    console.log(data);
});
