const sheetId = "1jFfkT25Usv6qhWXaoEo5FXRNk4fTIsft_pqItNXAuus";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

console.log(sheetURL);

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
  //console.log(csvText)
  //document.getElementById("display").innerHTML = csvText
  let sheetObjects = csvToObject(csvText);
  show(sheetObjects)
  console.log(sheetObjects);
}

function csvToObject(csv) {
  const csvRows = csv.split("\n");
  const aa = csvRows[0].split(",");
  let propertyNames = [];
  for (let i = 0; i < aa.length; i++) {
    propertyNames.push(aa[i]);
  }
  //console.log(propertyNames)
  let object = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    // console.log(csvRows[i])
    let row = csvRows[i].split(",");
    let thisObject = [];
    for (let j = 0, max = row.length; j < max; j++) {
        let x =row[j].replaceAll('"',"")
        thisObject.push(x)
    }
    //console.log("\n")
    object.unshift(thisObject)
    // object.push(thisObject);
  }
  return object;
}

function show(data) {
  let table = `
    <thead>
    <tr class="table-dark">
            <th scope="col">#</th>
            <th scope="col">วันที่</th>
            <th scope="col">เวลา</th>
            <th scope="col">สถานี</th>
            <th scope="col">PM1</th>
            <th scope="col">PM2.5</th>
            <th scope="col">PM10</th>
          </tr>
        </thead>
        <tbody>`
        //console.log(data)
        for(let r=0; r<data.length;r++){
           
            let d = data[r][0].split("/")
            //console.log(d)
            const ddate = new Date(d[2],d[1],d[0])
            
            const fdate = ddate.toLocaleDateString('th-TH',{
                year:'numeric',
                month: 'long',
                day:'numeric'
            })


            table += `<tr>
            <th scope="row">${r+1}</th>
            <td>${fdate}</td>
            <td>${data[r][2]}</td>
            <td>${data[r][3]}</td>
            <td>${data[r][4]}</td>
            <td>${data[r][5]}</td>
            <td>${data[r][6]}</td>
          </tr>`
        }
        
        table += `</tbody>`
        
  document.getElementById("table-id").innerHTML = table
}
