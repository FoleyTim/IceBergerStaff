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
document.getElementsById("default").trigger('click');

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
