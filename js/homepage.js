let tbody = document.querySelector('tbody');

let url = 'https://simple-rest-api-production-6482.up.railway.app/class';

let myClasses = [];

let data = {};

function getClasses(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Classes = data.data;
        updateTable();
        
    })

    
}

getClasses();

function updateTable(){
    let data = "";

    if(Classes.length > 0){
        for(i= 0;i < Classes.length;i++){

            data +=  `<tr id="${Classes[i]['ID']}">
                        <td>${Classes[i]['name']}</td>
                        <td>${Classes[i]['level']}</td>
                        <td>${Classes[i]['instructor']}</td>
                        <td><button class="btn btn-danger" onclick="deleteMobile(event)">Join</button></td>
                        <td><button class="btn btn-danger" onclick="deleteMobile(event)">Detail</button></td>   
                     </tr>`
        }
     tbody.innerHTML = data;
    }

}