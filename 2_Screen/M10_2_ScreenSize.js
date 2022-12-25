// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn_1 = document.querySelector(".btn-view-screen");

btn_1.addEventListener("click", () => {
    let windowWidth = window.screen.width;
    let windowHeight = window.screen.height;

    console.log("screen width = "   , windowWidth);
    console.log("screen height = "  , windowHeight);
    alert(`Размер экрана:
        \nШирина=${windowWidth}, Высота=${windowHeight}`);
});
////////////////////////////////////////////////////////////////////
const btn_2 = document.querySelector(".btn-view-scroll");

btn_2.addEventListener("click", () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    console.log("viewport+scroll width = "   , windowWidth);
    console.log("viewport+scroll height = "  , windowHeight);
    alert(`Размер области просмотра с учётом области прокрутки:
        \nШирина=${windowWidth}, Высота=${windowHeight}`);
});
////////////////////////////////////////////////////////////////////
const btn_3 = document.querySelector(".btn-view-area");

btn_3.addEventListener("click", () => {
    let windowWidth     = document.documentElement.clientWidth;
    let windowHeight    = document.documentElement.clientWidth;

    console.log("viewport width = "   , windowWidth);
    console.log("viewport height = "  , windowHeight);
    alert(`Размер области просмотра:
        \nШирина=${windowWidth}, Высота=${windowHeight}`);
});