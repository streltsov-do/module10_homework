// 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

// 2. Добавить в чат механизм отправки гео-локации:
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу 
// и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
// Сообщение, которое отправит обратно эхо-сервер, не выводить.

////////////////////////////////////////////////////////////////////
/// chat window
////////////////////////////////////////////////////////////////////
// const cnv = document.getElementById("canvas");
// const ctx = cnv.getContext("2d");

// const cnv_width     = cnv.width;
// const cnv_height    = cnv.height;

// console.log("cnv_width=",cnv_width);
// console.log("cnv_height=",cnv_height);

// ctx.fillStyle = "gray";
// ctx.fillRect(0,0,cnv_width,cnv_height);
////////////////////////////////////////////////////////////////////
/// Chat new message
////////////////////////////////////////////////////////////////////
const div_chat = document.querySelector(".div-chat");

function writeToChat(message,right,length){
    let newMessage = document.createElement("div");
    
    newMessage.style.class = "12";
    newMessage.style.color = "black";
    let newMessagePadding = 10;
    newMessage.style.padding = `5px ${newMessagePadding}px`;
    newMessage.style.borderColor = "blue";
    let newMessageBorder = 2;
    newMessage.style.borderWidth = `${newMessageBorder}px`;
    newMessage.style.borderStyle = "solid";
    newMessage.style.borderRadius = "10px";
    newMessage.style.backgroundColor = "rgb(189, 252, 247)";

    newMessage.innerHTML = message;
    let messageLen= (length!==undefined)?length:message.length
    console.log("message.length",messageLen);
    let newWidth = messageLen*8 + newMessagePadding*2 + newMessageBorder*2;
    newMessage.style.width = `${newWidth}px`;
    console.log("newMessage.style.width ",newMessage.style.width);


    if (right){
        // newMessage.style.textAlign="right";
        newMessage.style.alignSelf="flex-end";
        newMessage.style.backgroundColor = "rgb(217, 252, 189)";
    }

    div_chat.appendChild(newMessage);
}
////////////////////////////////////////////////////////////////////
/// WebSocket send message
////////////////////////////////////////////////////////////////////
var websocketSendUrl = "wss://echo-ws-service.herokuapp.com";
const websocketSendLoad = () => {

    websocketSend = new WebSocket(websocketSendUrl);

    websocketSend.onopen = function(evt) {
        console.log("websocketSend open");
    }
    websocketSend.onclose = function(evt) {
        console.log("websocketSend close");
    }
    websocketSend.onmessage = function(evt) {
        writeToChat(evt.data);
    }
    websocketSend.onerror = function(evt) {
        console.log("websocketSend Error");
        alert(`ALO WebSocket(${websocketSendUrl}) 404`);
    }
    // console.log("websocket func started");
}

function sendMessage() {
    websocketSend.send(input_text.value);
}

function websocketSendClose() {
    websocketSend.close();
}

function websocketSendState() {
    let timer = 0;
    let bool = false;
    
    var checkWebSocket = setInterval(
        () => { 
            if ((websocketSend.readyState!==1)&&(timer<5)){
                console.log("timer =",timer);
                timer++;
            } else {
                bool = (websocketSend.readyState!==1);
                clearInterval(checkWebSocket);
                console.log("3 readyState",websocketSend.readyState);
            }
        }, 
        1000
    )
    console.log("4 readyState",websocketSend.readyState);
    return bool;
}

////////////////////////////////////////////////////////////////////
const btn_send = document.querySelector(".btn-send");
const input_text = document.querySelector(".input-text");

btn_send.addEventListener("click", () => {

    // console.log("writeToChat");
    // writeToChat("1",true);
    
    // console.log("input_text =",input_text.value);
    // console.log("my message =","");
    if (input_text.value!=="") {
        writeToChat(input_text.value,true);
        console.log("websocketSend.readyState=",websocketSend.readyState);
        if (websocketSend.readyState==1){
            sendMessage();
        } else {
            // было произведено отключение от сервера
            websocketSendLoad();

                        
                // const usePromiseMe = async() => {
                //     console.log("1 readyState=",websocketSend.readyState);
                //     websocketSendState();
                
                
                //     console.log("state 3=",websocketSend.readyState);
                // }
                // usePromiseMe();
                // console.log("state 4=",websocketSend.readyState);

                    // .then(() => {
                    //     console.log("1")
                    // })
                    // .then(() => {
                    //     console.log("2")
                    // })
                    // .catch(()=> {
                    //     console.log("nealo")
                    // })
            // }
            // blya();
        }
    } else {
        alert("ОШИБКА: Пустое сообщение");
        console.log("empty message");
    }
});
////////////////////////////////////////////////////////////////////
const btn_geo = document.querySelector(".btn-geo");
const geoStart = "https://www.openstreetmap.org";

const geoSuccess = (position) => {
    console.log('position', position);

    const latitude = position.coords.latitude;
    const longitude= position.coords.longitude;

    let geoOut=`${geoStart}/#map=18/${latitude}/${longitude}}`;
    let geoOutStr="Моя геолокация";
    let geoOutElem= `<a href="${geoOut}" target="_blank">${geoOutStr}</a>`
    writeToChat(geoOutElem,true,geoOutStr.length);
}

const geoError = () => {
    alert("Геолокация запрещена, обновите страницу!");
}

btn_geo.addEventListener("click", () => {
    
    if(!navigator.geolocation) {
        alert("Геолокация не поддержана!");
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError);
    }
});

////////////////////////////////////////////////////////////////////
const btn_close = document.querySelector(".btn-close-wss");
btn_close.addEventListener("click", () => {
    websocketSendClose();
});