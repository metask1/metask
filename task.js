var firebaseConfig = {
    apiKey: "AIzaSyDS5jkd3xKYbe29URtj6uD0hdVGU969mdY",
    authDomain: "center-3fd92.firebaseapp.com",
    projectId: "center-3fd92",
    storageBucket: "center-3fd92.appspot.com",
    messagingSenderId: "352464652127",
    appId: "1:352464652127:web:caa9bc9f112de23aa858ea",
    measurementId: "G-14NTWQ1NQ0"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
var srno = 0;
function SelectAllData(){
    document.getElementById('tbody1').innerHTML = "";
    srno = 0;
    firebase.database().ref('task').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var name = CurrentRecord.val().name;
                var date = CurrentRecord.val().date;
                var task_given = CurrentRecord.val().task_given;
                var task_taken = CurrentRecord.val().task_taken;
                var status = CurrentRecord.val().status;
                AddItemsToTable(name, date, task_given,task_taken, status);

            }
        );
    });
}
window.onload = SelectAllData();

var dataList =[];
function AddItemsToTable(name, date, task_given, task_taken, status){
    var tbody1 = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td8 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    // var td5 = document.createElement('td');
    // var td6 = document.createElement('td');
    // var td9 = document.createElement('td');
    // var td7 = document.createElement('td');
    
    td1.classList +="nameFeild"
    td2.classList +="dateFeild"
    // td3.classList +="taskFeild"
    td5.classList +="statusFeild"
    // td5.classList +="offer_valueFeild"
    // td7.classList +="statusFeild"
    // td6.classList +="companyFeild"
    // td9.classList +="salesFeild"




    dataList.push([name, date, task_given, task_taken, status])
    td1.innerHTML = name;
    td2.innerHTML = date;
    td3.innerHTML = task_given;
    td4.innerHTML = task_taken
    td5.innerHTML = status;
    td8.innerHTML = ++srno;
    // td9.innerHTML = sales_person;

    trow.appendChild(td8)
    trow.appendChild(td1); 
    trow.appendChild(td2); 
    trow.appendChild(td3); 
    trow.appendChild(td4); 
    trow.appendChild(td5); 
    // trow.appendChild(td6); 
    // // trow.appendChild(td9);
    // trow.appendChild(td7);


    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter" onclick = "FillTboxes(null)">New Data</button>'
    ControlDiv.innerHTML += '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick = "FillTboxes('+srno+')">Edit Data</button>'

    trow.appendChild(ControlDiv);
    tbody1.appendChild(trow);




}

var ModName = document.getElementById('nameMod')
var ModDate = document.getElementById('dateMod')
var ModTask_given = document.getElementById('task_giveMod')
var ModTask_taken = document.getElementById('task_takeMod')
var ModStatus = document.getElementById('StatusMod')

// var ModSalesPerson = document.getElementById('SPMod')

var BTNModAdd = document.getElementById('AddModBtn')
var BTNModUpd = document.getElementById('UpdModBtn')
var BTNModDel = document.getElementById('DelModBtn')



function FillTboxes(index){

    if (index !=null){
        --index
        // console.log(dataList[index][0])
        ModName.value = dataList[index][0];
        ModDate.value = dataList[index][1];
        ModTask_given.value = dataList[index][2];
        ModTask_taken.value = dataList[index[3]];
        ModStatus.value = dataList[index][4];
       
        BTNModAdd.style.display = 'none';
        BTNModUpd.style.display = 'inline-block';
        BTNModDel.style.display = 'winline-block';
    }
    else{
        BTNModAdd.style.display = 'inline-block';
        BTNModUpd.style.display = 'none';
        BTNModDel.style.display = 'none';

    }


}


function AddStd(){
    if(ModDate.value == ""){
        alert("Please Enter The Date")
        throw new console.error("Chup");
    }
    // if(ModTask_taken.value == null){
    //     ModTask_taken.value = "Not Given"
    // }
    // if(ModTask_given.value == null){
    //     ModTask_given.value = "Not Given"
    // }
    console.log(ModDate.value)
    firebase.database().ref("task/"+ModDate.value).set(
    {
        name : ModName.value,
        date : ModDate.value,
        task_given : ModTask_given.value,
        task_taken : ModTask_taken.value,
        status : ModStatus.value
    },
    (error) =>{
        if(error){
            alert("record Was not Added, there was a problem")
        }
        else{
            alert("Record Was Added")
            $("#exampleModalCenter").modal('hide');
            document.getElementById('loader').style.display = "block"
            document.getElementById('main').style.display = "none"
            setTimeout(function() {
                //your code here
                reload()
               }, 5000);
            // SelectAllData()
            
        }
    }
    )
    ModDate = "";
    ModName = "";
    ModTask_given = "";
    ModTask_taken = "";
    ModStatus = "";
    // window.location.reload()
}



function UpdStd(){
    // if(ModTask_taken.value == null){
    //     ModTask_taken.value = "Not Given"
    // }
    // if(ModTask_given.value == null){
    //     ModTask_given.value = "Not Given"
    // }
    console.log(ModDate.value)
    firebase.database().ref("task/"+ModDate.value).update(
    {
        status : ModStatus.value
    },
    (error) =>{
        if(error){
            alert("record Was not Updated, there was a problem")
        }
        else{
            alert("Record Was Updated")
            $("#exampleModalCenter").modal('hide');
            document.getElementById('loader').style.display = "block"
            document.getElementById('main').style.display = "none"
            setTimeout(function() {
                //your code here
                reload()
               }, 5000);
            // SelectAllData()
            
        }
    }
    )
    ModDate = "";
    ModName = "";
    ModTask_given = "";
    ModTask_taken = "";
    ModStatus = "";
    // window.location.reload()
}

function DelStd(){
    // if(ModTask_taken.value == null){
    //     ModTask_taken.value = "Not Given"
    // }
    // if(ModTask_given.value == null){
    //     ModTask_given.value = "Not Given"
    // }
    console.log(ModDate.value)
    firebase.database().ref("task/"+ModDate.value).remove().then(
        function(){
            alert("Record Was Removed")
            $("#exampleModalCenter").modal('hide');
            document.getElementById('loader').style.display = "block"
            document.getElementById('main').style.display = "none"
            setTimeout(function() {
                //your code here
                reload()
               }, 5000);
            // SelectAllData()
            
        }
    )
    // window.location.reload()
}

var searchbar = document.getElementById('SearchBar')
var searchBtn = document.getElementById('SearchBtn')
var category = document.getElementById('CategorySelected')
var tbody = document.getElementById('tbody1')




function SearchTable(Category){
    // console.log('called')
    var filter = searchbar.value.toUpperCase();
    // console.log(filter)
    var tr = tbody.getElementsByTagName("tr")
    // console.log(tr.length)
    var found;
    for (let i = 0; i < tr.length; i++) {
        // console.log('called')
        var td = tr[i].getElementsByClassName(Category)
        console.log(td.length)
        
        for (let j = 0; j < td.length; j++){
            console.log('called')
            console.log(td[j].innerHTML.toUpperCase())
            console.log(td[j].innerHTML.toUpperCase().indexOf(filter))
            if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){
                console.log('true')
                found = true;
                
            }
            
        }
        if(found){
            console.log('true')
            tr[i].style.display=""
            found=false
        }
        else{
            console.log('false')

            tr[i].style.display="none"
        }
        
    }
}
// SearchTable('dateField')




searchBtn.onclick = function(){
    if(searchbar.value == "");
    else if(category.value==1)
    SearchTable('dateFeild');
    else if(category.value==2)
    SearchTable('nameFeild');
    else if(category.value==3)
    SearchTable('statusFeild');
    


}
// SumValue('salesFeild')








function exportdata(){
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("table");
 
    /* Declaring array variable */
    var rows =[];
 
      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;
        column3 = row.cells[2].innerText;
        column4 = row.cells[3].innerText;
        column5 = row.cells[4].innerText;
        column6 = row.cells[5].innerText;
        column7 = row.cells[6].innerText;
        column8 = row.cells[7].innerText;

 
    /* add a new records in the array */
        rows.push(
            [
                column1,
                column2,
                column3,
                column4,
                column5,
                column6,
                column7,
                column8
            ]
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Office_Data.csv");
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
}

function reload(){
    console.log("wait ")
    document.getElementById('main').style.display = "block"

    document.getElementById('loader').style.display = "none";
    window.location.reload()
}

document.getElementById("close").addEventListener("click", function() {
    clear()
  });
function clear(){
    // window.location.reload()
    // $('#exampleModalCenter').modal('hide');
    console.log('called')
    ModDate.value = "";
    console.log('cleared')
    ModOfferDate.value = "";
    ModInquiry.value = "";
    ModOfferValue.value = "";
    ModOfferNo.value = "";
    // ModOfferNo = "";
    // ModOfferValue = "";
    // ModSalesPerson = "";
    ModStatus.value = "";
    ModCompany.value = "";
}
// SearchTable('salesFeild');

function home(){
    window.location = "index.html"
}

