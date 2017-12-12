$(document).ready(function() {

  $("#mkBtn").on("click", function() {

    var genBtn = $('<button />');
    var inputTxt = $('#animalText').val().trim();

    if (inputTxt == "") {
      alert('Please enter the name of an animal.');
    } else {
      genBtn.addClass('btn btn-default animalBtn')
      genBtn.attr('data-name', inputTxt);
      genBtn.text(inputTxt.toUpperCase());
      $('#btnSpace').append(genBtn);
      $('#animalText').val('');
    }

  });

  $(document).on("click", ".animalBtn", function() {

    var animalName = $(this).attr("data-name");
    console.log(animalName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=12";
    console.log(queryURL);

    $('#gifSpace').empty();
    $('small').text(animalName.toUpperCase() + " EDITION");

    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
    .done(function(response) {

      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalPic = $("<img />");

        // Setting the src attribute of the image to a property pulled off the result item
        animalPic.attr("src", results[i].images.fixed_height.url);
        animalPic.addClass('animalPic img-rounded media-middle')
        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifSpace").prepend(animalPic);
      }
    });


  });

});
