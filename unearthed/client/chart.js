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
        //Boolean - Whether the site is responsive
        responsive: true,

        //Boolean - Whether to show lines for each scale point
        scaleShowLine: true,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        //Boolean - Whether the scale should begin at zero
        scaleBeginAtZero: true,

        //String - Point label font declaration
        pointLabelFontFamily: "'Arial'",

        //String - Point label font weight
        pointLabelFontStyle: "normal",

        //Number - Point label font size in pixels
        pointLabelFontSize: 10,

        //String - Point label font colour
        pointLabelFontColor: "#666",

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,
    };

    //newBarChart = new Chart(ctx).Bar(data, options);
    newBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: null
    });

});
