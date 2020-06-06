var params = new URLSearchParams(window.location.search);

var users = $('#divUsuarios');
var fromSend = $('#formSend');
var messageForm = $('#message');
var divChatbox = $('#divChatbox');
var titleBox = $('#titleBox');

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


users.on('click', 'a', function () {
    var id = $(this).data('id');
    console.log(id);
})

fromSend.on('submit', function (e) {
    e.preventDefault();
    if (messageForm.val().trim().length === 0) {
        return;
    }
    socket.emit('send', {
        user: params.get('name'),
        message: messageForm.val(),
        date: new Date().getTime()
    }, function (data) {
        renderMessage(data, true),
        scrollBottom();
    })
    messageForm.val('').focus();
})

function renderUsers(people) {
    console.log(people);

    var html = `
        <li>
            <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
        </li>
    `;

    for (i = 0; i < people.length; i++) {
        html += `
        <li>
            <a data-id="${people[i].id}" href="javascript:void(0)"><img src="assets/images/users/user.webp" alt="user-img" class="img-circle"> <span>${people[i].name}<small class="text-success">online</small></span></a>
        </li>
        `
    }
    users.html(html);
}

function renderMessage(data, me, state) {
    var txt = '';
    var date = new Date(data.date);
    // console.log(data);
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    if (me) {
        if (data.user !== 'ADMIN') {
            txt = `
                <li class="reverse">
                    <div class="chat-content">
                        <h5>${data.user}</h5>
                        <div class="box bg-light-inverse">${data.message}</div>
                    </div>
                    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />
                    </div>
                    <div class="chat-time">${time}</div>
                </li>
    `
        } else {

            if(state){
                txt = `
           <li class="reverse">
               <div class="chat-content">
                   <h5>${data.user}</h5>
                   <div class="box bg-light-success">${data.message}</div>
               </div>
               <div class="chat-time">${time}</div>
           </li>
`
            }else{
                txt = `
           <li class="reverse">
               <div class="chat-content">
                   <h5>${data.user}</h5>
                   <div class="box bg-light-danger">${data.message}</div>
               </div>
               <div class="chat-time">${time}</div>
           </li>
`
            }
        }

    } else {
        if (data.user !== 'ADMIN') {
            txt = `
                <li class="animated fadeIn">
                    <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" />
                        </div>
                    <div class="chat-content">
                        <h5>${data.user}</h5>
                        <div class="box bg-light-info">${data.message}</div>
                    </div>
                    <div class="chat-time">${time}</div>
                </li>
            `;
        }else{

            if(state){
                txt = `
                <li class="animated fadeIn">
                    <div class="chat-content">
                        <h5>${data.user}</h5>
                        <div class="box bg-light-success">${data.message}</div>
                    </div>
                    <div class="chat-time">${time}</div>
                </li>
            `;
            }else{
                txt = `
                <li class="animated fadeIn">
                    <div class="chat-content">
                        <h5>${data.user}</h5>
                        <div class="box bg-light-danger">${data.message}</div>
                    </div>
                    <div class="chat-time">${time}</div>
                </li>
            `;
            }
        }
    }
    divChatbox.append(txt);
}

var title = `<h3 class="box-title">Sala de chat <small>${params.get('room')}</small></h3>`;
titleBox.html(title);
