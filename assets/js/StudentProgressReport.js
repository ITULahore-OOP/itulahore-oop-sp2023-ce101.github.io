// analysis sheet Web app url
// const progressSheetUrl = "https://script.google.com/macros/s/AKfycbwhaB64SCi3CPWof11lpd9tgJJeUqerhqoiamuJwyhtBQ9-BwkL__hoCk5MZACiztof1g/exec"
const progressSheetUrl = "https://script.google.com/macros/s/AKfycby15Vqqu5HuyhpO2D3E2a1pskupqHe5lqtXA_h0iWBchzSfdXosCtXv2iG-LlaUQBnYnQ/exec"
//cuourse detail sheet Web app url
const rollNumUrl = 'https://script.google.com/macros/s/AKfycbzAoD9CFcqEv0IXht7cQNwZTzlR4zmJyBsDGk79qozXbpXPpcdgEHzNzHt93TaZLgNyqQ/exec';
const sheet = "attendance";
const progressSheetName = "StudentProgressChart";
const urlForRollNo = rollNumUrl + '?data=' + sheet;

let quiz1 = false;
let quiz2 = false;
let assignment = false;
let labA = false;
let labB = false;

let pdfLink = null;
// let pdfButton = document.getElementById("pdfButton");

const loading = document.getElementById("loader");
let errorMsg = document.getElementById("errorMsg")
errorMsg.setAttribute('style', "color: red");

function getInput() {
    loading.setAttribute('class', "loader")
    let rollNumber = document.getElementById('rollNumber').value;
    errorMsg.innerText = "";
    if (!rollNumber.trim().length) {
        // console.log("Please Enter Roll no.",rollNumber)
        loading.classList.add("d-none");
        errorMsg.innerText = "Please enter Roll No."
    } else {
        let value = rollNumber.split(' ').join('');
        if (quiz1 == false && quiz2 == false && assignment == false && labA == false && labB == false) {
            // console.log("Please Enter Roll no.",rollNumber)
            loading.classList.add("d-none");
            errorMsg.innerText = "Please select atleast single option."
        } else {
            loadData(value);
        }
    }
}

function setCheckBox(checkBoxId) {
    switch (checkBoxId) {
        case "quiz1":
            quiz1 = !quiz1;
            break;
        case "quiz2":
            quiz2 = !quiz2;
            break;
        case "assignment":
            assignment = !assignment
            break;
        case "labA":
            labA = !labA
            break;
        case "labB":
            labB = !labB
            break;
        default:
            break;
    }
}

function loadData(requested_rollNo) {
    const rollNo = requested_rollNo.toUpperCase();
    const quiz1ValSet = quiz1 == true ? "y" : "n";
    const quiz2ValSet = quiz2 == true ? "y" : "n";
    const assignmentValSet = assignment == true ? "y" : "n";
    const labAValSet = labA == true ? "y" : "n";
    const labBValSet = labB == true ? "y" : "n";

    const newURL = progressSheetUrl + "?rollNo=" + rollNo + "&sheetName=" + progressSheetName + "&quiz1=" + quiz1ValSet + "&quiz2=" + quiz2ValSet + "&assignment=" + assignmentValSet + "&labA=" + labAValSet + "&labB=" + labBValSet;

    fetch(urlForRollNo).then((rep) => rep.json()).then((data) => {
        const stdData = data.data;

        let result = stdData.filter(e => e.registration_no == requested_rollNo.toUpperCase())
        // console.log("result in uppercase :*** ", result)

        if (result.length > 0) {
            fetch(newURL).then((chatRep) => chatRep.json()).then((chartData) => {
                // console.log("datadatadata",chartData)
                errorMsg.removeAttribute('style', "color: red");
                errorMsg.setAttribute('style', "color: #41d693");
                errorMsg.innerText = chartData.data;
                loading.classList.add("d-none");
            })
        } else {
            errorMsg.innerText = "Record not found Please enter valid Roll no."
            loading.classList.add("d-none");
        }

    })
}
