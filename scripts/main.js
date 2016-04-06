var idleTime = 0; // Keep track of how long the user has been idle
var username; // The user's username

$(document).ready(function() {
    askName(); // Ask the user's name

    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 1000 * 60); // 1 minute

    // Zero the idle timer on mouse movement.
    $(this).mousemove(function(e) {
        idleTime = 0;
    });

    $(this).keypress(function(e) {
        idleTime = 0;
    });
});

function timerIncrement() { // Keep track of how long the user has been idle
    idleTime = idleTime + 1;

    if (idleTime > 29) { // 30 minutes
        sweetAlert({
            title: "You've been logged out...",
            text: "You were idle for 30 minutes.",
            type: "error"
        }, function() {
            window.location.reload();
        });
    }
}

function askName() {
    swal({
        title: "What is your name?",
        text: "This will be your username.",
        type: "input",
        showCancelButton: false,
        confirmButtonColor: "#b0c965",
        closeOnConfirm: false,
        inputPlaceholder: "Joseph"
    }, function(inputValue) {
        if (inputValue === false) {
            return false;
        }

        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false;
        }

        username = inputValue;
        populateChat(); // Load chat messages
        var interval = setInterval(populateChat, 1000); // Refresh every second
        $(".message_input").focus();
        swal.close();
    });
}

function populateChat() {
    $.ajax({
        url: "http://woodsman.jessemillar.com:9020/chat",
        datatype: "application/json",
        success: function(data) {
            data = JSON.parse(data); // Parse the JSON into an object
            $(".messages").html(""); // Wipe the current messages

            for (var message in data) { // Insert chat log into the #chatbox div
                if (data[message].User == username) {
                    postMessage(data[message].User, data[message].Message, "right");
                } else {
                    postMessage(data[message].User, data[message].Message, "left");
                }
            }

            $(".messages").animate({ // Scroll to the bottom of the chat window
                scrollTop: $(".messages").prop("scrollHeight")
            }, 10);
        }
    });
}

var Message = function(arg) {
    this.text = arg.text;
    this.message_side = arg.message_side;

    this.draw = function(_this) {
        return function() {
            var $message = $($(".message_template").clone().html());
            $message.addClass(_this.message_side).find(".text").html(_this.text);

            $(".messages").append($message);
        };
    }(this);

    return this;
};

function clearInput() {
    $(".message_input").val("");
}

function sendMessage() {
    $.ajax({
        type: "POST",
        url: "http://woodsman.jessemillar.com:9020/chat?name=" + username + "&line=" + $(".message_input").val(),
        success: function() {
            $("#line").val(""); // Wipe the input field
            populateChat(); // Get the chat log now for instant feedback
        }
    });
}

function postMessage(user, text, message_side) {
    if (text.trim() === "") {
        return;
    }

    var $messages = $(".messages");

    var message = new Message({
        text: "<b>" + user + ":</b> " + text,
        message_side: message_side
    });

    message.draw();
}

$(".send_message").click(function(e) { // On "send" button click
    sendMessage(username, $(".message_input").val(), "right");
    clearInput();
    return;
});

$(".message_input").keyup(function(e) {
    if (e.which === 13) { // Enter key
        sendMessage(username, $(".message_input").val(), "right");
        clearInput();
        return;
    }
});
