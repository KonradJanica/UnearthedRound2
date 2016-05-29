data = {
    labels: ["", "", "", ""],
    datasets: [
        {
            backgroundColor: "rgb(51, 102, 153)",
            borderColor: "rgb(51, 102, 153)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(51, 102, 153)",
            hoverBorderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0],
        }
    ]
};

newBarChart = null;

Template.barChart.onRendered(function() {

var ctx = document.getElementById("resultBarChart").getContext("2d");
    Chart.defaults.global.legend.display = false;

    newBarChart = new Chart(ctx, {
        type: 'bar',
        data: data
    });
});
