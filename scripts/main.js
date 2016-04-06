var username; // The user's username

$(document).ready(function() {
    askName();
    // populateChat(); // Load chat messages on page start
});

function askName() {
    swal({
        title: "What's your name?",
        text: "This will be your username.",
        type: "input",
        showCancelButton: false,
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

        swal("Nice!", "Your username will be: " + inputValue + ".", "success");
    });
}

// function populateChat() {
//     console.log("Populating chat");
//     $.ajax({
//         url: 'http://woodsman.jessemillar.com:9020/chat',
//         datatype: 'application/json',
//         success: function(data) {
//             data = JSON.parse(data); // Parse the JSON into an object
//             $("#chatbox").html(""); // Wipe the current messages
//             for (var message in data) { // Insert chat log into the #chatbox div
//                 $("#chatbox").append("<b>" + data[message].User + "</b>: " + data[message].Message + "<br>");
//             }
//         }
//     });
// }
//
// function sendMessage() {
//     console.log("Sending message");
//     $.ajax({
//         type: "POST",
//         url: "http://woodsman.jessemillar.com:9020/chat?name=" + $('#name').val() + "&line=" + $('#line').val(),
//         success: function() {
//             console.log("Message sent");
//             $('#line').val(''); // Wipe the input field
//             populateChat(); // Get the chat log now for instant feedback
//         }
//     });
// }
//
// var interval = setInterval(populateChat, 1000); // Refresh every second

(function() {
    var Message = function(arg) {
        this.text = arg.text;
        this.message_side = arg.message_side;

        this.draw = function(_this) {
            return function() {
                var $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);

                $('.messages').append($message);

                return setTimeout(function() {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);

        return this;
    };

    $(function() {
        var getMessageText = function() {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        var clearInput = function() {
            $('.message_input').val('');
        };

        var sendMessage = function(user, text, message_side) {
            if (text.trim() === '') {
                return;
            }

            var $messages = $('.messages');

            var message = new Message({
                text: "<b>" + user + ":</b> " + text,
                message_side: message_side
            });

            message.draw();

            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };

        $('.send_message').click(function(e) { // On send button click
            sendMessage(getMessageText(), "right");
            clearInput();
            return;
        });

        $('.message_input').keyup(function(e) {
            if (e.which === 13) { // Enter key
                sendMessage(getMessageText(), "right");
                clearInput();
                return;
            }
        });

        sendMessage("Sandy", 'Hello Philip! :)', "left");
        setTimeout(function() {
            return sendMessage("Philip", 'Hi Sandy! How are you?', "right");
        }, 1000);
        return setTimeout(function() {
            return sendMessage("Sandy", 'I\'m fine, thank you!', "left");
        }, 2000);
    });
}.call(this));
