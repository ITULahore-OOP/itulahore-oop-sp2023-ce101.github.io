// analysis sheet Web app url
// const progressSheetUrl = "https://script.google.com/macros/s/AKfycbwhaB64SCi3CPWof11lpd9tgJJeUqerhqoiamuJwyhtBQ9-BwkL__hoCk5MZACiztof1g/exec"
const progressSheetUrl = "https://script.google.com/macros/s/AKfycby15Vqqu5HuyhpO2D3E2a1pskupqHe5lqtXA_h0iWBchzSfdXosCtXv2iG-LlaUQBnYnQ/exec"
const studentPosition = "student_position"
//cuourse detail sheet Web app url
const rollNumUrl = 'https://script.google.com/macros/s/AKfycbzAoD9CFcqEv0IXht7cQNwZTzlR4zmJyBsDGk79qozXbpXPpcdgEHzNzHt93TaZLgNyqQ/exec';
const sheet = "attendance";
const urlForRollNo = rollNumUrl + '?data=' + sheet;

const loading = document.getElementById("loader");
let errorMsg = document.getElementById("errorMsg");
const card_container = document.getElementById("card_container");
errorMsg.setAttribute('style', "color: red");

function getInput() {
    loading.setAttribute('class', "loader")
    let rollNumber = document.getElementById('rollNumber').value;
    errorMsg.innerText = "";
    if (!rollNumber.trim().length) {
        // console.log("Please Enter Roll no.", rollNumber)
        loading.classList.add("d-none");
        errorMsg.innerText = "Please enter Roll No."
    } else {
        let value = rollNumber.split(' ').join('');
        loadData(value);
    }
}


function loadData(requested_rollNo) {
    const rollNo = requested_rollNo.toUpperCase();

    const newURL = progressSheetUrl + "?rollNo=" + rollNo + "&sheetName=" + studentPosition;

    // console.log("inside loadData *** ", rollNo)

    fetch(urlForRollNo).then((rep) => rep.json()).then((data) => {
        const stdData = data.data;

        let registrationNo = stdData.filter(e => e.registration_no == requested_rollNo.toUpperCase())
        // console.log("result in uppercase :*** ", registrationNo)

        if (registrationNo.length > 0) {
            fetch(newURL).then(res => res.json()).then((data) => {
                loading.classList.add("d-none");
                errorMsg.removeAttribute('style', "color: red");

                const positionRecord = data.data;
                let result = positionRecord.filter(e => e.student_reg == rollNo)
                // console.log("result **** ", result)
                mapThroughData(result)
            })
        } else {
            errorMsg.setAttribute('style', "color: red");
            errorMsg.innerText = "Record not found Please enter valid Roll no."
            loading.classList.add("d-none");
        }
    })
}

function mapThroughData(data) {
    data.map((item, index) => {
        createContent(item)
    })
}

function createContent(item) {
    var datetime = new Date().toLocaleString();;
    // console.log("datetime",datetime)
    const cardInnerHTML = `
        <div>
            <div class="text-center m-2"><b> Registration No : ${item.student_reg} </b></div>
            <div class="text-center m-2"><b> Current Position. </b></div>
            <div class="text-center d-flex flex-justify-between"> 
                <div style="width: 49.8%;"> 
                    <div class="bg-blue-100 text-white btlr"><b> Theory. </b></div>
                    <div class="d-flex lighterBlue p-tb-8">
                        <div style="width: 100%;"> 
                            <div> ${item.theory_position} </div>
                        </div>
                    </div>
                </div>
                <div style="width: 50%;">
                    <div class="bg-green-200 text-white btrr"><b> Lab. </b></div>
                    <div class="d-flex lighterGreen p-tb-8">
                        <div style="width: 100%;"> 
                            <div> ${item.lab_position} </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="text-center m-2"><small> Date : ${datetime} </small></div>
        </div>
        `
    
    

    card_container.innerHTML = cardInnerHTML
}