data = {
    labels: ["", "", "", "", ""],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
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

    var options = {
        responsive: true,
    };

    newBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
    console.log(data);
});
