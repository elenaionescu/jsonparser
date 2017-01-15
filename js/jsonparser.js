$(document).ready(function(){
    var jsonUrl = 'https://gist.githubusercontent.com/jizq/8177ddf6efc335bd8c2094fd2cf1a5fb/raw/e2c4eac365a3872fc9267e0c80d1b2f8b9c754a5/data.json?callback=?';
    $.ajaxSetup({ dataType: "jsonp" });
    $.ajax({
        url: jsonUrl,
        type: "GET",
        dataType: "jsonp",
        async:false,
        success: function (data) {
            drawTable(data);
        },
        error: function () {
            displayErrorMessage();
        }

    });

    function drawTable(data)
    {
        var json_obj = $.parseJSON(data);//parse JSON
        var output="<ul>";
        for (var i=0; i<50; i++)
        {
            output+="<li>" + json_obj[i].teaser + "</li>";
            output+="<li>" + json_obj[i].description + "</li>";
            output+="<li>" + json_obj[i].image + "</li>";
        }
        output+="</ul>";
        $('#results').html(output);
    }

    function displayErrorMessage() {
        $('#results').html('Error!');
    }

});
