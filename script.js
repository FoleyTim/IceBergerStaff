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



$('document').ready(function() {
  $("#loginform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=login&email=" + name + "&password=" + password, function(data) {
      if (data['success'] && data['privilege'] > 0) {
        $.cookie("user", data['user']);
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

  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory", function(data) {
    // console.log(data);
    $('#inventory').empty();
    data['inventory'].forEach(function(category) {
      // console.log(category);
      $('#inventory').append("<tr><th>"+category['description']+"</th><th></th></tr>");
      category['items'].forEach(function(item) {
        $('#inventory').append("<tr><td>"+item['name']+"</td><td><input class=\"inventoryitem\" type=\"text\" name=\""+item['id']+"\" value=\""+item['stock_count']+"\"></td></tr>");
      });
      // console.log(item);
      // $('#inventory').append("<tr><td>"+item['name']+"</td><td><input class=\"inventoryitem\" type=\"text\" name=\""+item['id']+"\" value=\""+item['stock_count']+"\"></td></tr>");
    });
  });

  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getusers", function(data) {
    // console.log(data);
    $('#customerList').empty();
    data.forEach(function(user) {
      $('#customerList').append("<tr><td>"+user['name']+"</td><td>"+user['email']+"</td><td>"+(user['privilege'] == 0 ? "Customer" : "Staff")+"</td></tr>");
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

    $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=updateinventory&stock=" + JSON.stringify(json), function(data) {
      console.log(data);
    });
  });
});
