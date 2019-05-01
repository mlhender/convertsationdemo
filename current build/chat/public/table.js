// open and close table chat
$(".input").click(function() {
  event.stopPropagation();
  $(".Table").addClass("open");
  $(".input").addClass("open");
});

$(document).on("click", function(e) {
  $(".Table").removeClass("open");
  $(".input").removeClass("open");
});

$(".inputMessage").bind("input propertychange", function() {
  message = $(".inputMessage").val();

  if (!$.trim($(".inputMessage").val())) {
    $(".send").removeClass("active");
  } else {
    $(".send").addClass("active");
  }
});


$(".Library-open").on("click", function(e) {
  e.stopPropagation();
  $(".Library").addClass("open");
  $(".Library-collapse").addClass("open");
  $(".User-table").addClass("push");
  $(".border").addClass("push");
  $(".Table").addClass("push");
  $(".table-upload").addClass("push");
});

$(".Library").on("click", function(e) {
  e.stopPropagation();
});

$(document).on("click", function(e) {
  $(".Library").removeClass("open");
  $(".Library-collapse").removeClass("open");
  $(".User-table").removeClass("push");
  $(".border").removeClass("push");
  $(".Table").removeClass("push");
  $(".table-upload").removeClass("push");

});


window.onload = function() {
  $(".Library-search").click(function() {
    $(".Library-search").addClass("active");
    $(".Library-close-search").addClass("active");
    $(".Library-searchbox").addClass("active");
  });

  $(".Library-close-search").click(function() {
    $(".Library-search").removeClass("active");
    $(".Library-close-search").removeClass("active");
    $(".Library-searchbox").removeClass("active");
  });

  $(".Library-bookmark").click(function() {
    $(".Library-bookmark").addClass("active");
    $(".Library-close-bookmark").addClass("active");
    $(".Library-bookmarkspage").addClass("active");

    //CLOSE THE SEARCH BAR WHEN BOOKMARKS OPENED
    $(".Library-searchbox").removeClass("active");
    $(".Library-search").removeClass("active");
    $(".Library-close-search").removeClass("active");
  });

  $(".Library-close-bookmark").click(function() {
    $(".Library-bookmark").removeClass("active");
    $(".Library-close-bookmark").removeClass("active");
    $(".Library-bookmarkspage").removeClass("active");
  });

  $(".inputSearch").bind("enterKey", function(e) {
    $(".Library-searchprompt").addClass("active");
    $(".Library-searchresults").removeClass("active");

    //CLOSE THE BOOKMARKS AFTER SEARCHING
    $(".Library-bookmark").removeClass("active");
    $(".Library-bookmarkspage").removeClass("active");
    $(".Library-close-bookmark").removeClass("active");

    setTimeout(function() {
      $(".Library-loader").addClass("active");
    }, 400);

    setTimeout(function() {
      $(".Library-loader").removeClass("active");
      $(".Library-searchresults").addClass("active");
    }, 2400);
  });

  $(".inputSearch").keyup(function(e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });

};


$("#search_form").submit(function(e) {
  $("#books").html("");

  e.preventDefault();

  var searchQuery = $("#search_txt").val();
  searchQuery = searchQuery.split(" ").join("+");

  if (!searchQuery) {
    searchQuery = "paleo";
  }

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchQuery,
    success: function(json) {
      var htmlcontent = "";
      var thumb = "";
      var author = "";

      for (i = 0; i < json.items.length; i++) {

        if (typeof json.items[i].volumeInfo.imageLinks != "undefined") {
          thumb = json.items[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else {
          thumb = 'http://i.imgur.com/oM3MdAi.png';
          //thumb = 'http://slems-oldboys.org.uk/library/wp-content/uploads/2013/11/library_nocover.jpg'
        }
        // AUTHOR
         if (typeof json.items[i].volumeInfo.authors != "undefined") {
          author = json.items[i].volumeInfo.authors[0];
        }

        htmlcontent +=
          "<div class='thumbs'><b>Title:</b> " +
          json.items[i].volumeInfo.title +
          "&nbsp <b>Author:</b> " +
          '<img src="' +
          thumb +
          '" + alt="' +
          json.items[i].volumeInfo.title +
          '">' +
          json.items[i].volumeInfo.title +
          "&nbsp Author: " +
          author +
          "</div>";
      }
      document.getElementById("books").innerHTML =
        "<div>" + htmlcontent + "</div><br>";
    }
  });
});
