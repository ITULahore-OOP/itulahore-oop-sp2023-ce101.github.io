//cuourse detail sheet Web app url
const url = 'https://script.google.com/macros/s/AKfycbzAoD9CFcqEv0IXht7cQNwZTzlR4zmJyBsDGk79qozXbpXPpcdgEHzNzHt93TaZLgNyqQ/exec';
//analysis sheet Web app url
// const progressSheetUrl = "https://script.google.com/macros/s/AKfycbwhaB64SCi3CPWof11lpd9tgJJeUqerhqoiamuJwyhtBQ9-BwkL__hoCk5MZACiztof1g/exec"
const progressSheetUrl = "https://script.google.com/macros/s/AKfycby15Vqqu5HuyhpO2D3E2a1pskupqHe5lqtXA_h0iWBchzSfdXosCtXv2iG-LlaUQBnYnQ/exec"
const loading = document.getElementById("loader1");
const loading2 = document.getElementById("loader2");
loadData();
function loadData() {

    const sheet = "top_std_of_week";
    // const sheet2 = "overall_top_std";
    const studentPosition = "student_position"
    const newURL = url + '?data=' + sheet;
    const newURL2 = progressSheetUrl + '?sheetName=' + studentPosition;
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        loading.remove();
        const top_std_of_week = data.data;
        // console.log("top_std_of_week",top_std_of_week)
        mapThroughData(top_std_of_week, "top_std_of_week")
    })
    fetch(newURL2).then((rep) => rep.json()).then((data) => {
        loading2.remove();
        const overall_top_std = data.data;

        // console.log("overall_top_std", overall_top_std)
        const top_3_stds = overall_top_std.filter(e => { if (e.theory_position <= 3) { return e } })
        // console.log("top 3 *** ", top_3_stds)
        mapThroughData(top_3_stds, "overall_top_std")
    })
}

function mapThroughData(data, container) {
    // console.log("data:::", data)
    data.map(item => {
        // console.log("item.student_name",item)
        if (item.student_name !== "") {
            if (container === "top_std_of_week") {
                createContentWeekly(item, container)
            }
            if (container === "overall_top_std") {
                createContent(item, container)
            }
        }
    })
}

function createContentWeekly(item, container) {
    let parentDiv = document.getElementById(container);
    let fameDiv = document.createElement("div");
    fameDiv.classList.add("staffer");
    let responsiveClass = "no-responsive"
    fameDiv.classList.add(responsiveClass);
    const divContainer = `${container === "top_std_of_week" ?
        `<img class="staffer-image" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
        <div>
            <h3 class="staffer-name">
                ${item.student_name}
            </h3>
            ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
            <p>${item.week ? item.week : ""}</p>
        </div>`
        : ""
        }`
    fameDiv.innerHTML = divContainer;
    parentDiv.appendChild(fameDiv);
}

function createContent(item, container) {
    let parentDiv = document.getElementById(container);
    let fameDiv = document.createElement("div");
    fameDiv.classList.add("staffer");
    let responsiveClass = "fame-responsive"
    fameDiv.classList.add(responsiveClass);
    const divContainer = `${container === "overall_top_std" ?
        `${item.student_name !== "" ? `<div class="fame-std-container">
        <img class="staffer-image" style="width: 100px" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
        <div class="fame-detailContainer">
            <h3 class="staffer-name">
                ${item.student_name}
            </h3>
            ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
            <p>${item.theory_position === 1 ? item.theory_position + "st"
                : item.theory_position === 2 ? item.theory_position + "nd"
                    : item.theory_position === 3 ? item.theory_position + "rd" :
                        ""}</p>
        </div>
        </div>
        ${item.position !== "" ? `<div class="fame-position-image"><img class="staffer-image fame-badge-image" src="/assets/images/positions/${item.theory_position &&
                item.theory_position === 1 ? "First.jpeg"
                : item.theory_position === 2 ? "Second.jpeg"
                    : item.theory_position === 3 ? "Third.jpeg" :
                        "" + ".jpeg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image"></div>` : ""}` : ""}`
        : ""
        }`
    fameDiv.innerHTML = divContainer;
    parentDiv.appendChild(fameDiv);
}
