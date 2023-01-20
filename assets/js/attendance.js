//cuourse detail sheet Web app url
const url = 'https://script.google.com/macros/s/AKfycbzAoD9CFcqEv0IXht7cQNwZTzlR4zmJyBsDGk79qozXbpXPpcdgEHzNzHt93TaZLgNyqQ/exec';

const loading = document.getElementById("loader");
let parentDiv = document.getElementById("ul_container");
const card_container = document.getElementById("card_container");
const ul_container = document.getElementById("ul_container")

function getUserRollNumber() {
    // class="loader"
    loading.setAttribute('class', "loader")
    loading.classList.remove("d-none"); 
    let rollNumber = document.getElementById('stdRollNumber').value;
    let errorMsg = document.getElementById("errorMsg")
    
    let numb = ul_container.childElementCount;
    if(numb > 1){
        parentDiv.removeChild(parentDiv.lastElementChild)
        card_container.innerHTML = ""
    }

    if (!rollNumber.trim().length) {
        loading.classList.add("d-none");
        errorMsg.innerText = "Please enter Roll No."
    } else {
        const value = rollNumber.split(' ').join('');
        const sheet = "attendance";
        const newURL = url + '?data=' + sheet;
        fetch(newURL).then((rep) => rep.json()).then((data) => {
            // loading.remove();
            loading.classList.add("d-none");
            const attendanceData = data.data; 
            // console.log("attendanceDataattendanceData",attendanceData)
            let result = attendanceData.filter(e => e.registration_no == value.toUpperCase())
            if(result.length > 0){
                errorMsg.innerText = "";
                mapThroughData(result)
            }else{
                errorMsg.innerText = "Result Not Found Please Enter Correct Roll No."
            }
        })
    }
}

function mapThroughData(data) {
    data.map((item,index) => {
        createContent(item, item.sr_no)
    })
}

function createContent(item, index) {
    let li = document.createElement("li");
    li.setAttribute('style', "border-bottom: 1px solid #ede7e7; padding: 4px 0px 4px 0px")
    // vars for conditional styling
    const labA = item.a_lab_percentage;
    const theoryA = item.a_theory_percent;
    //data into vars
    const regNo = item.registration_no; 
    const name = item.std_name;
    const theory_present = item.p_theory_percent == "#REF!" ? 00 : item.p_theory_percent;
    const theoryP = theory_present.toFixed(1);
    const lab_present = item.p_lab_percentage == "#REF!" ? 00 : item.p_lab_percentage;
    const labP = lab_present.toFixed(1);
    const cardInnerHTML = `
        <div class="pb-3">
            <div class="text-center m-2"><b> Total Lectures : ${item.total_lectures} </b></div>
            <div class="text-center d-flex flex-justify-between"> 
                <div style="width: 49.8%;"> 
                    <div class="bg-blue-100 text-white btlr"><b> Theory </b></div>
                    <div class="d-flex lighterBlue p-tb-8">
                        <div style="width: 50%;" class="border-right-blue"> 
                            <div> <span class="border-b-blue"> Total Presents </span> </div>
                            <div> ${item.theory_P} </div>
                        </div>
                        <div style="width: 50%;" class="border-left-blue" > 
                            <div> <span class="border-b-blue"> Total Absents </span> </div>
                            <div> ${item.theory_A} </div>
                        </div>
                    </div>
                </div>
                <div style="width: 50%;">
                    <div class="bg-green-200 text-white btrr"><b> Lab </b></div>
                    <div class="d-flex lighterGreen p-tb-8">
                        <div style="width: 50%;" class="border-right-green"> 
                            <div> <span class="border-b-green"> Total Presents </span> </div>
                            <div> ${item.lab_P} </div>
                        </div>
                        <div style="width: 50%;" class="border-left-green">  
                            <div> <span class="border-b-green"> Total Absents </span> </div>
                            <div> ${item.lab_A} </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `
    const divContainer =
        `<div style="display: flex;" > 
        <div style="width: 33.33%"
        class="
        ${theoryP == 100 && labP == 100 ? "text-green-200" : ""}
        ${theoryP <= 85 && theoryA < 20 || labP <= 85 && labA < 20 ? "text-yellow-200" : ""}
        ${theoryA >= 20 || labA >= 20 ? "text-red-200" : ""}
        ">
            ${regNo}
        </div>
        <div style="width: 33.33%"
            class="
            ${theoryP == 100 ? "text-green-200" : ""}
            ${theoryP <= 85 && theoryA < 20 ? "text-yellow-200" : ""}
            ${theoryA >= 20 ? "text-red-200" : ""}
            ">
                ${theoryP}%
        </div>
        <div style="width: 33.33%"
            class="
            ${labP == 100 ? "text-green-200" : ""}
            ${labP <= 85 && labA < 20 ? "text-yellow-200" : ""}
            ${labA >= 20 ? "text-red-200" : ""}
            ">
                ${labP}%
        </div>
    </div>`
    li.innerHTML = divContainer;
    parentDiv.appendChild(li);
    card_container.innerHTML = cardInnerHTML
}
