function openMenu(evt, item) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(item).style.display = "block";
    evt.currentTarget.className += " active";
}
// document.getElementsById("default").trigger('click');

/*remove row on click*/
function approveGram(o) {
  var p=o.parentNode.parentNode;
   p.parentNode.removeChild(p);
   showMsgOnEmptyTable('#BurgerTable');
}
function declineGram(o) {
  var p=o.parentNode.parentNode;
   p.parentNode.removeChild(p);
   showMsgOnEmptyTable('#BurgerTable');
}

function showMsgOnEmptyTable(table){ /*shows a message saying there are no submitted burgers if table body is empty**/
  if ($(table + ' tbody').children().length == 0) {
    $(table).hide();
    $("#msgDiv").text("There are currently no submitted burgers to review");
  }

}

$('document').ready(function() {
  $("#loginform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("http://10.140.124.121/iceberger_backend/api.php?callback=?", "method=login&email=" + name + "&password=" + password, function(data) {
      if (data['success'] && data['privilege'] > 0) {
        $.cookie("user", $data['user']);
        window.location.href = "index.html";
      }
    });

    return false;
  });

  $("#logout").click(function(event) {
    event.preventDefault();

    $.removeCookie("user");
    window.location.href = "Login.html";

    return false;
  });

  $.getJSON("http://10.140.124.121/iceberger_backend/api.php?callback=?", "method=getinventory", function(data) {
    // console.log(data);
    $('#inventory').empty();
    data.forEach(function(category) {
      // console.log(category);
      $('#inventory').append("<tr><th>"+category['description']+"</th><th></th></tr>");
      category['items'].forEach(function(item) {
        $('#inventory').append("<tr><td>"+item['name']+"</td><td><input class=\"inventoryitem\" type=\"text\" name=\""+item['id']+"\" value=\""+item['stock_count']+"\"></td></tr>");
      });
      // console.log(item);
      // $('#inventory').append("<tr><td>"+item['name']+"</td><td><input class=\"inventoryitem\" type=\"text\" name=\""+item['id']+"\" value=\""+item['stock_count']+"\"></td></tr>");
    });
  });

  $("#updateButton").click(function(event) {
    event.preventDefault;

    var json = {};

    $(".inventoryitem").each(function() {
      var id = $(this).attr("name");
      var count = parseInt($(this).val());
      json[id] = count;
    })

    console.log(JSON.stringify(json));

    $.getJSON("http://10.140.124.121/iceberger_backend/api.php?callback=?", "method=updateinventory&stock=" + JSON.stringify(json), function(data) {
      console.log(data);
    });
  });
});
