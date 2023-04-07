let tbody = document.querySelector('tbody');

let url = 'https://simple-rest-api-production-6482.up.railway.app/myclass';

let myClasses = [];

let data = {};

function getMyClasses(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        myClasses = data.data;
        updateTable();
        
    })

    
}

getMyClasses();

function updateTable(){
    let data = "";

    if(myClasses.length > 0){
        for(i= 0;i < myClasses.length;i++){

            data +=  `<tr id="${myClasses[i]['ID']}">
                        <td>${myClasses[i]['name']}</td>
                        <td>${myClasses[i]['level']}</td>
                        <td>${myClasses[i]['instructor']}</td>
                        <td><button class="btn btn-danger" onclick="deleteMobile(event)">Delete</button></td>   
                     </tr>`
        }
     tbody.innerHTML = data;
    }

}