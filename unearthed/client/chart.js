Template.barChart.onRendered(function() {

var ctx = document.getElementById("resultBarChart").getContext("2d");

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};

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

var newBarChart = new Chart(ctx).Bar(data, options);

});
