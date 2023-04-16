let task = document.getElementById("tasks");

const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

window.onload = () => {
    display_from_local();
}
document.getElementById('write-btn').addEventListener("click", write_to);
document.getElementById('type').addEventListener("keypress", function (e) {
    if (e.key == 'Enter') {
        write_to();
    }
});



function push_to_local() {
    let item = document.getElementById("type");
    itemsArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    // location.reload();
}


function display_from_local() {

    for (let i = 0; i < itemsArray.length; i++) {
        let div = document.createElement("div");
        let para = document.createElement("p");
        para.textContent = itemsArray[i]

        task.appendChild(div);
        div.appendChild(para);
        para.setAttribute("class", "para");
        div.setAttribute("class", "added-task");
        let done = document.createElement('button');
        done.classList.add("done");
        done.textContent = "Done";
        div.appendChild(done);

        let Remove = document.createElement('button');
        Remove.classList.add("remove");
        Remove.textContent = "Remove";
        div.appendChild(Remove);
        
        done.addEventListener('click', function () {
            done_item(div, para);
        })

    }
    remove_display_item();



    // Remove.addEventListener('click', function () {
    //     localStorage.removeItem("items", itemsArray[i]);
    //     remove_item(div)
    // })
}


function remove_display_item() {
    let removebtn = document.querySelectorAll(".remove");
    removebtn.forEach((element, index) => {
        element.addEventListener("click", () => { delete_item_local(index) })
    })
}
function delete_item_local(index) {
    itemsArray.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    let div = document.querySelectorAll(".added-task");
    remove_item(div[index]);


}




function write_to() {
    if (document.getElementById('type').value == false) {
        alert("Please write something!")

    }
    else {
        push_to_local();
        let div = document.createElement("div");
        let para = document.createElement("p");
        para.textContent = document.getElementById('type').value;

        task.appendChild(div);
        div.appendChild(para);
        para.setAttribute("class", "para");
        div.setAttribute("class", "added-task");


        let done = document.createElement('button');
        done.classList.add("done");
        done.textContent = "Done";
        div.appendChild(done);

        let Remove = document.createElement('button');
        Remove.classList.add("remove");
        Remove.textContent = "Remove";
        div.appendChild(Remove);


        document.getElementById('type').value = "";



        done.addEventListener('click', function () {
            done_item(div, para);

        })
        remove_formation();
    }
}



function remove_formation() {
    let remove = document.querySelectorAll(".remove");
    remove.forEach((element, index) => {
        element.addEventListener("click", () => delete_item_local(index));
    });
}


function done_item(div, para) {
    if (para.style.textDecoration == "line-through") {
        para.style.textDecoration = "none";
        div.style.opacity = 1;
    }
    else {
        para.style.textDecoration = "line-through";
        div.style.opacity = 0.5;
    }
}



function remove_item(div) {
    div.classList.add("fadeout");
    div.addEventListener("animationend", function () {
        div.remove();
    })
}




const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
})
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));





