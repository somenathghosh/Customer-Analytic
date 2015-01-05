
Array.prototype.formatter = function() {

    var string = "";
    this.forEach(function(element, index, array){

        element = element.replace(" ", "-");
        string = string + " " + element;


    });
        
    return string;
};

//$('.spinnerModal').modal('show');

$(document).ready(function() {
    "use strict";

    var hm = new HM();

    
    console.log(hm.data);

    var greenTea = function(argument) {

        var string = "";

        $.ajax({

            type: 'GET',
            contentType: 'application/json',
            url: '/score',
            success: function(data) {

                //console.log(JSON.parse(data.score));

                var array = JSON.parse(data.score);
                hm.withData(array);
                hm.generateData(hm.data)
                console.log(hm.data);
                hm.draw(hm.data);
                //console.log(array);
                var text = [];
                var people = [];
                var peopleObj = [];
                var minDate;
                var dates = [];
                array.forEach(function function_name(element, index, array) {
                    if (people.indexOf(element.name) < 0) {
                        people.push(element.name);
                        peopleObj.push({
                            "name": element.name,
                            "text": element.rank
                        });
                    } else {
                        peopleObj[people.indexOf(element.name)].text = text.concat(element.rank);
                    }
                    dates.push(new Date(element.date));
                    text = text.concat(element.rank);
                });
                dates = dates.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date);
                });

                minDate = dates[0];
                var index = 0;
                var rowCount = 0;

                peopleObj.forEach(function(element) {
                    /*if (index == 0 || index % 2 == 0) {
                        $('#cloud-container').append(
                            '<div id="row' + rowCount + '" class="row"></div>'
                        );
                    }*/


                    //console.log(index);
                    console.log(rowCount);

                    $('#row' + index).append(
                        '<div class="middle"><h3>' +
                        element.name +
                        //'<div class="row">'+
                        ' </h3><div id="vis' + index + '"></div>' +
                        '<form id="form' + index + '">' +
                        '<div style="text-align: center">' +
                        ' <div id="presets"></div>' +
                        '<div id="custom-area">' +
                        '<textarea id="text' + index + '" class="hidden"></textarea>' +
                        '<div id="dateSlider' + index + '"></div>' +
                        '<div><br/></div>' +
                        ' <button id="go' + index + '" type="submit" type="button" class="btn btn-sm btn-success" >Rearrange</button>' +
                        '</div>' +
                        '</div>' +
                        '</form>' +

                        '</div>');
                    if (index % 2 != 0) {
                        rowCount++;
                    }
                    $("#dateSlider" + index).dateRangeSlider({
                        bounds: {
                            min: minDate,
                            max: new Date()
                        },
                        defaultValues: {
                            min: minDate,
                            max: new Date()
                        }
                    });
                    $("#dateSlider" + index).bind("valuesChanging", function(e, data) {
                        var cloudNumber = this.id.substring(10, this.length);
                        updateCloud(cloudNumber, data.values.min, data.values.max);
                    });

                    $('#text' + index).val(string);
                    genCloud(string, {

                        width: 960,
                        height: 600,
                        svgID: "#vis" + index,
                        formID: "#form" + index,
                        textID: "#text" + index,

                    });
                    $('#go' + index).trigger('click');
                    updateCloud(index, minDate, new Date());

                    index++;
                });


                $("#dateSlider").dateRangeSlider({
                    bounds: {
                        min: minDate,
                        max: new Date()
                    },
                    defaultValues: {
                        min: minDate,
                        max: new Date()
                    }
                });
                $("#dateSlider").bind("valuesChanging", function(e, data) {
                    updateBigCloud(data.values.min, data.values.max);
                });

                $('#text').val(string);
                genCloud(string, {

                    width: 960,
                    height: 600,
                    svgID: "#vis",
                    formID: "#form",
                    textID: "#text",

                });
                $('#go').trigger('click');
                updateBigCloud(minDate, new Date());

                function updateBigCloud(startDate, endDate) {
                    var mainText = [];
                    array.forEach(function(element) {
                        var elementDate = new Date(element.date);
                        if (elementDate > startDate && elementDate < endDate) {
                            mainText = mainText.concat(element.rank);
                        }
                    });


                    $('#text').val(mainText.formatter());
                    $('#go').trigger('click');

                }


                function updateCloud(cloudNumber, startDate, endDate) {

                    var textElements = [];
                    array.forEach(function function_name(element) {

                        var elementDate = new Date(element.date);
                        if (element.name == people[cloudNumber] && elementDate > startDate && elementDate < endDate) {
                            textElements = textElements.concat(element.rank);
                        }



                    });

                    $('#text' + cloudNumber).val(textElements.formatter());
                    $('#go' + cloudNumber).trigger('click');
                }




                //$('.spinnerModal').modal('hide');

                return string;



            },


            error: function(error) {
                alert('error');
            }

        });



    };


    greenTea();


    /*$('#keywords').click(function(e) {
        e.preventDefault();

        console.log('click');
        $.ajax({

            type: 'GET',
            contentType: 'application/json',
            url: '/keywords',
            success: function(data) {

                //console.log(data);
                var string = '<table class="table">';
                data.forEach(function(element, index) {

                    string = string + "<tr><td> " + element + "</td></tr> ";


                });
                string = string + "</table>";
                console.log(string);
                $('.modal-content').html(string);
                $('.keywordModal').modal('show');

            },
            error: function(error) {
                alert('error');
            }

        });

    });*/







});