

const submit = document.getElementById("submit");
let arr = [];
localStorage.setItem("crud", JSON.stringify(arr));
selectdata();
let str = ""
submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.querySelector('input[name="gender"]').checked == false) {
        document.getElementById("gn").innerHTML = " enter gender !!"
    }
    const fname = document.getElementById("fname").value;
    console.log("fname ", fname);
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const city = document.getElementById("city").value;
    const hobby = document.querySelectorAll(".hob:checked");
    let array = [];
    for (let i = 0; i < hobby.length; i++) {
        array.push(hobby[i].value)
    }
    console.log("fname lr", fname.length);
    if (fname == "") {
        return document.getElementById("fn").innerHTML = " *enter your first name !!"
        // console.log("fname ", fname);
    } else if (lname == "") {
        return document.getElementById("ln").innerHTML = " *enter your last name !!"
        // console.log("la ", lname);
    }
    else if (email == "") {
        return document.getElementById("em").innerHTML = "* enter your email !!"
        // console.log("ema ", ename);
    }
    else if (city == "") {
        return document.getElementById("ci").innerHTML = " *enter your city !!"
        // console.log("ema ", ename);
    }
    let obj = {
        fname: `${fname}`,
        lname: `${lname}`,
        email: `${email}`,
        gender: `${gender}`,
        city: `${city}`,
        hobby: array
    }
    console.log(obj);
    if (str == "") {
        let data = JSON.parse(localStorage.getItem("crud"));
        if (data === null) {
            arr.push(obj);
            localStorage.setItem("crud", JSON.stringify(arr));
        } else {
            data.push(obj);
            localStorage.setItem("crud", JSON.stringify(data))
        }
    } else {
        let data = JSON.parse(localStorage.getItem("crud"));
        data[str].fname = fname;
        data[str].lname = lname;
        data[str].email = email;
        data[str].gender = gender;
        data[str].city = city;
        data[str].hobby = array;
        localStorage.setItem("crud", JSON.stringify(data));

        console.log("datatata",data);
    }
    selectdata();
})
function selectdata() {
    const root = document.querySelector("tbody");
    let data = JSON.parse(localStorage.getItem("crud"));
    let str = ""
    data.map((val, index) => {
        let tebledate = `
                <tr>
                <td>${index + 1}</td>
      <td>${val.fname}</td>
      <td>${val.lname}</td>
      <td>${val.email}</td>
      <td>${val.gender}</td>
      <td>${val.city}</td>
      <td>${val.hobby}</td>
      <td><button onclick="updatedata(${index})">edit</button><button onclick="deletedata(${index})">delete</button></td>
    </tr>`;
        str += tebledate;
    })
    root.innerHTML = str;
    console.log("data", data);
    const fname = document.getElementById("fname").value = "";
    const lname = document.getElementById("lname").value = "";
    const email = document.getElementById("email").value = "";
    document.querySelector('input[value="male"]').checked = false;
    document.querySelector('input[value="female"]').checked = false;
    const city = document.getElementById("city").value = "";
    document.querySelector('input[value="cricket"]').checked = false
    document.querySelector('input[value="reading"]').checked = false;
    document.querySelector('input[value="dancing"]').checked = false;
}
function deletedata(id) {
    const data = JSON.parse(localStorage.getItem("crud"));
    data.splice(id, 1);
    localStorage.setItem("crud", JSON.stringify(data));
    selectdata();
}
function updatedata(id) {
    console.log("id", id);
    str = id;
    const data = JSON.parse(localStorage.getItem("crud"));
    console.log("newdata", data[id]);
    let selectedvaluedata = data[id];
    const fname = document.getElementById("fname").value = selectedvaluedata.fname;
    const lname = document.getElementById("lname").value = selectedvaluedata.lname;
    const email = document.getElementById("email").value = selectedvaluedata.email;
    if (selectedvaluedata.gender === "male") {
        const gender = document.querySelector('input[value="male"]').checked = true;
    }
    else {
        const gender = document.querySelector('input[value="female"]').checked = true;
    }
    const city = document.getElementById("city").value = selectedvaluedata.city;
    const hobby = document.querySelectorAll(".hob:checked").value;
    console.log("hobby", hobby);
    for (let i = 0; i < selectedvaluedata.hobby.length; i++) {
        console.log(selectedvaluedata.hobby);
        if (selectedvaluedata.hobby[i] == "cricket") {
            document.querySelector('input[value="cricket"]').checked = true;
            console.log(selectedvaluedata.hobby[i]);
        }
        else if (selectedvaluedata.hobby[i] == "reading") {
            document.querySelector('input[value="reading"]').checked = true;
            console.log(selectedvaluedata.hobby[i]);
        } else if (selectedvaluedata.hobby[i] == "dancing") {
            document.querySelector('input[value="dancing"]').checked = true;
            console.log(selectedvaluedata.hobby[i]);
        }
    }
}
// let narr = [];
// const search = document.getElementById("search");
// search.addEventListener("click", () => {
//     let iner = document.getElementById("iner").value;
//     const data = JSON.parse(localStorage.getItem("crud"));
//     let fil = data.filter((val) => {
//         return val.fname.includes(iner);
//     })
//     console.log(fil);
//     narr = fil;
//     let str = ""
//     narr.map((value) => {
//         let a = `  <tr>
// <td>${value.fname}</td>
// <td>${value.lname}</td>
// <td>${value.email}</td>
// <td>${value.gender}</td>
// <td>${value.city}</td>
// <td>${value.hobby}</td>
// </tr>`;
//         str += a;
//     });
//     document.getElementById("root").innerHTML = str;
// })
$(document).ready(function () {
    $("#iner").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#root tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});