$(document).ready(function() {
    populateChat();
});

function populateChat() {
    console.log("Populating chat");
    $.ajax({
        url: 'http://woodsman.jessemillar.com:9020/chat',
        datatype: 'application/json',
        success: function(data) {
            data = JSON.parse(data);
            $("#chatbox").html("");
            for (var message in data) { // Insert chat log into the #chatbox div
                $("#chatbox").append("<b>" + data[message].User + "</b>: " + data[message].Message + "<br>");
            }
        }
    });
}

$('#send_chat').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'http://woodsman.jessemillar.com:9020/chat',
        type:'POST',
        success:function(){
            $('#usrmsg').val(''); // Wipe the input field
        }
    });
});

var interval = setInterval(populateChat, 1000); // Refresh every second
