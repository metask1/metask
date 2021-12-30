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
    firebase.database().ref('order-dispatch').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var date = CurrentRecord.val().date;
                var orderno = CurrentRecord.val().orderno;
                // var order_date = CurrentRecord.val().offer;
                var dispatch_date = CurrentRecord.val().dispatch_date;
                var dispatch_value = CurrentRecord.val().dispatch_value;
                var status = CurrentRecord.val().status;
                var POvalue = CurrentRecord.val().po_value
                // var sales_person = CurrentRecord.val().sales_person;
                var company = CurrentRecord.val().company;
                AddItemsToTable(date, orderno,POvalue, dispatch_date, dispatch_value, status, company);
                console.log(POvalue)
            }
        );
    });
}
window.onload = SelectAllData();

var dataList =[];


function home(){
    window.location = window.location = "index.html"
}

function AddItemsToTable(date, orderno,POvalue, dispatch_date, dispatch_value, status, company){
    var tbody1 = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td8 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td9 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    // var td9 = document.createElement('td');
    var td7 = document.createElement('td');
    
    td1.classList +="dateFeild"
    td2.classList +="ordernoFeild"
    td3.classList +="order_dateFeild"
    td4.classList +="dispatch_dateFeild"
    td5.classList +="dispatch_valueFeild"
    td7.classList +="statusFeild"
    td6.classList +="companyFeild"
    // td9.classList +="salesFeild"




    dataList.push([date, orderno,POvalue, company, dispatch_date,dispatch_value,status])
    td1.innerHTML = date;
    td2.innerHTML = orderno;
    td9.innerHTML = POvalue;
    td3.innerHTML = company;
    td4.innerHTML = dispatch_date;
    // td5.innerHTML = order_date;
    td5.innerHTML = dispatch_value;
    td6.innerHTML = status;
    td8.innerHTML = ++srno;
    // td9.innerHTML = sales_person;

    trow.appendChild(td8)
    trow.appendChild(td1); 
    trow.appendChild(td2); 
    trow.appendChild(td9);
    trow.appendChild(td3); 
    trow.appendChild(td4); 
    trow.appendChild(td5); 
    trow.appendChild(td6); 
    
    // trow.appendChild(td7);


    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter" onclick = "FillTboxes(null)">New Data</button>'
    ControlDiv.innerHTML += '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick = "FillTboxes('+srno+')">Edit Data</button>'

    trow.appendChild(ControlDiv);
    tbody1.appendChild(trow);




}
// var loader  = document.getElementsByClassName('loader').innerHTML
var ModDate = document.getElementById('DateMod')
var ModOrderNo = document.getElementById('OrderMod')
var ModDispatchDate = document.getElementById('DDMod')
var ModDispatchValue = document.getElementById('DVMod')
var ModStatus = document.getElementById('StatusMod')
var ModCompany = document.getElementById('CompMod')
var ModPOValue = document.getElementById('POvalueMod')

var BTNModAdd = document.getElementById('AddModBtn')
var BTNModUpd = document.getElementById('UpdModBtn')
var BTNModDel = document.getElementById('DelModBtn')



function FillTboxes(index){

    if (index !=null){
        --index
        // console.log(dataList[index][0])
        ModDate.value = dataList[index][0];
        ModOrderNo.value = dataList[index][1];
        ModPOValue.value = dataList[index][2];
        ModCompany.value = dataList[index][3];
        ModDispatchDate.value = dataList[index][4];
        ModDispatchValue.value = dataList[index][5];
        
        // ModOfferValue.value= dataList[index][5];
        // ModSalesPerson.value = dataList[index][6];
        ModStatus.value = dataList[index][6];
        BTNModAdd.style.display = 'none';
        BTNModUpd.style.display = 'inline-block';
        BTNModDel.style.display = 'inline-block';
    }
    else{
        BTNModAdd.style.display = 'inline-block';
        BTNModUpd.style.display = 'none';
        BTNModDel.style.display = 'none';

    }


}


function AddStd(){
    console.log(ModDate.value)
    firebase.database().ref("order-dispatch/"+ModDate.value).set(
    {
        date : ModDate.value,
        company : ModCompany.value,
        orderno : ModOrderNo.value,
        po_value : ModPOValue.value,
        dispatch_date : ModDispatchDate.value,
        dispatch_value: ModDispatchValue.value,
        // sales_person:ModSalesPerson.value,
        status : ModStatus.value
    },
    (error) =>{
        if(error){
            alert("record Was not added, there was a problem")
        }
        else{
            $("#exampleModalCenter").modal('hide');
            alert("Record Was Added")
            alert('Please Wait for 5 Seconds')
            document.getElementById('loader').style.display = "block"
            document.getElementById('main').style.display = "none"
            setTimeout(function() {
                //your code here
                reload()
               }, 5000);
            
            
            
        }
    }
    )
    // window.location.reload()
}



function UpdStd(){
    console.log(ModDate.value)
    firebase.database().ref("order-dispatch/"+ModDate.value).update(
    {
        date : ModDate.value,
        company : ModCompany.value,
        orderno : ModOrderNo.value,
        po_value : ModPOValue.value,
        dispatch_date : ModDispatchDate.value,
        dispatch_value: ModDispatchValue.value,
        // sales_person:ModSalesPerson.value,
        status : ModStatus.value
    },
    (error) =>{
        if(error){
            alert("record Was not Updated, there was a problem")
        }
        else{
            alert("Record Was Updated")
            $("#exampleModalCenter").modal('hide');
            alert('Please Wait for 5 Seconds')
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
    ModOrderNo = "";
    ModDispatchDate = "";
    ModDispatchValue = "";
    ModPOValue = "";
    // ModOfferNo = "";
    // ModOfferValue = "";
    // ModSalesPerson = "";
    ModStatus = "";
    ModCompany = "";
    // window.location.reload()
}





function DelStd(){
    console.log(ModDate.value)
    firebase.database().ref("order-dispatch/"+ModDate.value).remove().then(
        function(){
            alert("Record Was Removed")
            $("#exampleModalCenter").modal('hide');
            alert('Please Wait for 5 Seconds')
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



function SumValue(Category){
    // console.log('called')
    var filter = 'Neeraj'
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
    table = document.getElementById('table')
    var sumVal = 0;
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[6].innerHTML);
        // console.log('This : '+table.rows[i].cells[6].innerHTML)
        console.log(sumVal)
    }
    return sumVal

    
    

}   
    


searchBtn.onclick = function(){
    if(searchbar.value == "");
    else if(category.value==1)
    SearchTable('dateFeild');
    else if(category.value==2)
    SearchTable('dispatch_dateFeild');
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


// SearchTable('salesFeild');

