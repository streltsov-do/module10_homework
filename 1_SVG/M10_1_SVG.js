const btn_1 = document.querySelector(".btn-change");
const btn_1_icon = document.querySelector(".btn-change-icon");

btn_1.addEventListener("click", () => {
    let str_0 = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
        </svg>
    `;
    let str_1 = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
        </svg>
    `;

    let btn_1_stat_session=sessionStorage.getItem('btn_1_stat');
    
    switch (btn_1_stat_session) {
        case "0" :
            btn_1_icon.innerHTML=str_1;
            sessionStorage.setItem("btn_1_stat","1");
            console.log("0");
            break;
        case "1" :
            btn_1_icon.innerHTML=str_0;
            sessionStorage.setItem("btn_1_stat","0");
            console.log("1");
            break;
    }
})