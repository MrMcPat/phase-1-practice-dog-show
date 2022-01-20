function fetchDogs() {
    return fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => {
        const tableBody = document.getElementById("table-body");
        console.log(data);
        data.forEach(dog => {
            const doggo = document.createElement("tr");
            doggo.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="${dog.id}">Edit</button></td>
            `
            tableBody.appendChild(doggo);
        })
    })
}

function editDogs(event) {
    event.preventDefault();
    let dogObj = {
        name: event.target.elements[0].value,
        breed: event.target.elements[1].value,
        sex: event.target.elements[2].value
    }
    document.getElementById("table-body").addEventListener("click", event => {
        patchDogs(dogObj, event.target.id);
    }, {once: true})
}

function patchDogs(dogObj, dog) {
    return fetch(`http://localhost:3000/dogs/${dog}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dogObj),
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    document.getElementById("dog-form").addEventListener("submit", editDogs);
})