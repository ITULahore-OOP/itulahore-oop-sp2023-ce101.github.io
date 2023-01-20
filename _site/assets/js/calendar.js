//cuourse detail sheet Web app url
const url = 'https://script.google.com/macros/s/AKfycbzAoD9CFcqEv0IXht7cQNwZTzlR4zmJyBsDGk79qozXbpXPpcdgEHzNzHt93TaZLgNyqQ/exec';
const sheet = "week_data";
const loading = document.getElementById("loader");
const newURL = url + '?data=' + sheet;
loadData();
// console.log("newURL",newURL)
function loadData() {
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        // console.log("this is somethins", data.data.map(e => e))
        loading.remove();
        const listData = data.data;
        mapThroughData(listData)
    })
}

function mapThroughData(data) {
    // console.log("data inside mapThroughData 23:::", data)
    data.reverse().map(item => {
        if (item.visible == "y"){
        createContent(item)
        }
    })
}

function createContent(item) {
    let calendarDiv = document.getElementById("calendar_container");
    let calendarContainer = document.createElement("div");
    calendarContainer.classList.add("module");

    let heading = document.createElement("h2");
    heading.classList.add("fs-4");

    heading.innerHTML = `${item.visible == "y" ? `
    ${item.week} - ${item.title}` : ""}`

    let cardDHTML = `${item.visible == "y" ? `
    ${item.notice_date == "" || item.notice_date == "n" ? "" : createNoticeList(item.notice_date, item.notice)}
    ${item.notice_b_date == "" || item.notice_b_date == "n" ? "" :  createNoticeList(item.notice_b_date, item.notice_b)}
    ${item.lec_a_date == "" || item.lec_a_date == "n" ? "" : createLecList(item.lec_a_date, item.lec_a_makeup, item.lec_a_topic, item.lec_a_link, item.quiz_a_link, item.quiz_a_sol_link)}
    ${item.lab_a_date == "" || item.lab_a_date =="n" ? "" : createLabList(item.lab_a_makeup, item.lab_a_date, item.lab_a, item.lab_a_link, item.lab_a_sol_link, item.lab_a_deadline_time)}
    ${item.lec_b_date == "" || item.lec_b_date == "n" ? "" : createLecList(item.lec_b_date, item.lec_b_makeup, item.lec_b_topic, item.lec_b_link, item.quiz_b_link, item.quiz_b_sol_link)}
    ${item.lab_b_date == "" || item.lab_b_date == "n" ? "" : createLabList(item.lab_b_makeup, item.lab_b_date, item.lab_b, item.lab_b_link, item.lab_b_sol_link, item.lab_b_deadline_time)}
    ${item.assignment_date == "" || item.assignment_date == "n" ? "" : createAssignmentList(item.assignment_date, item.assignment_no, item.assignment_link, item.assignment_sol_link, item.assign_deadline_time)}
    ` : ""}`

    calendarContainer.innerHTML = cardDHTML;
    calendarDiv.appendChild(heading);
    calendarDiv.appendChild(calendarContainer);

}
// for simple notice 
function createNoticeList(noticeDate, notice) {
    return (`
    <dl>
        <dt>${noticeDate}</dt>
        <dd>${notice}</dd>
    </dl>`)
}
// for lecs
function createLecList(lecDate, lecMakeUp, lecTopic, lecLink, quizLink, quizSolLink) {
    // console.log("lecLink", lecLink)
    return (`
        <dl>
            <dt>${lecDate}</dt>
            <dd>                
                <strong class="label schedule-event lecture">Theory</strong>
                ${lecMakeUp == "y" ? `<strong class="label label-yellow">Make-up</strong>` : ""}
                ${lecLink == "n" || lecLink == "" ? `${lecTopic}` : `<strong><a href=${lecLink}>${lecTopic}</a></strong>`}
                &emsp;
                ${quizLink == "n" || quizLink == "" ? "" : `<strong><a href=${quizLink}>Quiz</a></strong>` }
                &emsp;
                ${quizSolLink == "n" || quizSolLink == "" ? "" : `<strong><a href=${quizSolLink}>Quiz Solution</a></strong>` }
            </dd>
        </dl>
    `)
}
// for labs
function createLabList(labMakeup, date, labName, labLink, labSolLink, deadlineTime) {
    return (`
        <dl>
            <dt>${date}</dt>
            <dd>                
                <strong class="label label-green">Lab</strong>
                ${labMakeup == "y" ? `<strong class="label label-yellow">Make-up</strong>` : ""}
                ${labLink == "n" || labLink == "" ? `${labName}` : `<strong><a href=${labLink}>${labName}</a></strong>`}
                &emsp;
                ${labSolLink == "n" || labSolLink == "" ? "" : `<strong><a href=${labSolLink}>Lab Solution</a></strong>` }
                &emsp;
                ${deadlineTime == "n" || deadlineTime == "" ? "" : `<strong>Due : ${deadlineTime}</strong>` }
            </dd>
        </dl>
    `)
}
// for assignments
function createAssignmentList(date, AssignmentNo, assignmentLink, assignmentSolLink, deadlineTime) {
    return (`
    <dl>
        <dt>${date}</dt>
        <dd>                
            <strong class="label label-red">Assignment</strong>
            ${assignmentLink == "n" || assignmentLink == "" ? `${AssignmentNo}` : `<strong><a href=${assignmentLink}>${AssignmentNo}</a></strong>`}
            &emsp;
            ${assignmentSolLink == "n" || assignmentSolLink == "" ? "" : `<strong><a href=${assignmentSolLink}>Solution</a></strong>` }
            &emsp;
            ${deadlineTime == "n" || deadlineTime == "" ? "" : `<strong>Due : ${deadlineTime}</strong>` }
        </dd>
    </dl>
    `)
}