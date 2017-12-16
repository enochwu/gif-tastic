$(document).ready(function() {

var createdButtons = [];

  $("#mkBtn").on("click", function() {


    var genBtn = $('<button />');
    var inputTxt = $('#animalText').val().trim();
    var animalLowerCase = inputTxt.toLowerCase();
    var animalCheck = createdButtons.indexOf(animalLowerCase);

    if (inputTxt == "") {
      alert('Please enter the name of an animal.');
    }

    if (animalCheck == -1) {
      console.log(animalCheck);
      genBtn.addClass('btn btn-default animalBtn')
      genBtn.attr('data-name', inputTxt);
      genBtn.text(inputTxt.toUpperCase());
      createdButtons.push(inputTxt.toLowerCase());
      console.log(inputTxt);
      console.log(createdButtons);
      $('#btnSpace').append(genBtn);
      $('#animalText').val('');
    } else {
      alert('You\'ve already made a button for this animal.');
      $('#animalText').val('');
    }

    // if () {
    //
    // }

  });

  $(document).on("click", ".animalBtn", function() {

    var animalName = $(this).attr("data-name");
    console.log(animalName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=Xsvjyjb7Jzs4h7HiMXAAOTjGJn30uB3b&limit=12";
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
        animalPic.addClass('animalPic img-rounded media-middle');
        animalPic.attr("src", results[i].images.fixed_height.url);
        animalPic.attr("data-animate", results[i].images.fixed_height.url);
        animalPic.attr("data-still", results[i].images.fixed_height_still.url);
        animalPic.attr("data-still", results[i].images.fixed_height_still.url);
        animalPic.attr("data-state", "animate");

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifSpace").prepend(animalPic);
      }
    });

  });

  $(document).on("click", ".animalPic", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    } else {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
  });

});

// Ask Mark about filtering PG. Can we filter out via ratings?
// Mebe some novelty fonts for some added fun.
// Change the look of the generated buttons
// Enter key can be used to sumbit input.
// Fix the duplicate button option. Be more explicit.
