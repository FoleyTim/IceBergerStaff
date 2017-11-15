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


//LOG IN
$('document').ready(function() {
  $("#loginform").submit(function(event) {
    event.preventDefault();
    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=login&email=" + name + "&password=" + password, function(data) {
      if (data['success'] && data['privilege'] > 0) {
        $.cookie("user", data['user']);
        window.location.href = "index.html";
      }else{
        alert("incorrect username or password");
      }
    });
    return false;
  });


  //SIGN UP
  $("#createStaffButton").click(function(event) {
    event.preventDefault();
    var name = document.getElementById("signUname").value;
    var password = document.getElementById("signPsw").value;
    var email = document.getElementById("signEmail").value;
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=registerstaff&name=" + name + "&password=" + password + "&email=" + email, function(data) {
      console.log(data);
      if (data['success']) {
        alert("new account created");
      }
    });
    return false;
  });
  //LOG OUT BUTTON
  $("#logout").click(function(event) {
    event.preventDefault();
    $.removeCookie("user");
    window.location.href = "Login.html";
    return false;
  });

//POPULATE STOCKLIST
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory", function(data) {
    $('#inventory').empty();
    data['inventory'].forEach(function(category) {
      $('#inventory').append("<tr><th>"+category['description']+"</th><th></th></tr>");
      category['items'].forEach(function(item) {
        $('#inventory').append("<tr><td>"+item['name']+"</td><td><input class=\"inventoryitem\" type=\"text\" name=\""+item['id']+"\" value=\""+item['stock_count']+"\"></td></tr>");
      });
    });
  });

//POPULATE CUSTOMER LIST
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getcustomers", function(data) {
    $('#customerList').empty();
    data.forEach(function(user) {
      $('#customerList').append("<tr><td>"+user['name']+"</td><td>"+user['email']+"</td></tr>");
    });
  });

  //POPULATE STAFF LIST
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getstaff", function(data) {
    $('#staffList').empty();
    data.forEach(function(user) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      row.appendChild(col1);
      row.appendChild(col2);
      col1.appendChild(document.createTextNode(user['name']));

      var btn = document.createElement('button');
      btn.appendChild(document.createTextNode('remove'));
      col2.appendChild(btn);

      btn.addEventListener('click', function(e) {
        console.log('remove press');
        $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=deleteuser&user=" + user['id'], function(data) {
              document.getElementById('staffList').removeChild(row);
        });
      });

      document.getElementById('staffList').appendChild(row);
      // $('#staffList').append("<tr><td>"+user['name']+"</td><td><button>remove</button></td></tr>");
    });
  });


  function showMsgOnUpdate(){
   alert("the database has been updated!");
  }

//UPDATE BUTTON CLICK EVENT
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
      showMsgOnUpdate();
    });
  });
});
