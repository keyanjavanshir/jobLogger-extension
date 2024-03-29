// JOB ARRAY TO RENDER
let companyList = [];

// IDs from HTML
const inputForm = document.getElementById("input-form")
const addSiteBtn = document.getElementById("btn-site")
const addTabBtn = document.getElementById("btn-tab")
const deleteLast = document.getElementById("btn-deleteLast")
const deleteBtn = document.getElementById("btn-delete")
const logSites = document.getElementById("log")
const printBtn = document.getElementById("btn-print")

// Accessing localStorage
const companiesFromLocalStorage = JSON.parse( localStorage.getItem("myCompanies") )


let blobCounter = 0;


if (companiesFromLocalStorage) {
    companyList = companiesFromLocalStorage
    render(companyList)
    console.table(companyList)
}


function render(companies) {
    let listItems = ""
    for (let i = 0; i < companies.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${companies[i]}'>
                    ${companies[i]}
                </a>
            </li>
        `
    }
    logSites.innerHTML = listItems;
}

addTabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        companyList.push(tabs[0].url)
        localStorage.setItem("myCompanies", JSON.stringify(companyList) )
        render(companyList)
    })
})


deleteLast.addEventListener("dblclick", () => {
    companyList.pop()
    localStorage.setItem("myCompanies", JSON.stringify(companyList) )
    render(companyList)
})


deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    companyList = []
    render(companyList)
})


addSiteBtn.addEventListener("click", () => {
    if(inputForm.value === "" || inputForm.value === "undefined") {
        console.error("Please input a valid URL.")
    } else {
        companyList.push(inputForm.value)
        inputForm.value = ""
        localStorage.setItem("myCompanies", JSON.stringify(companyList) )
        render(companyList)
    }
})

printBtn.addEventListener("click", (e) => {

    if(companyList === null || companyList.length === 0) {
        console.log("No list available");
    } else if(blobCounter > 0) {
        printBtn.removeEventListener("click", (e) => {false});
    } else {
        addBlob()
        blobCounter++;
    }

})


function addBlob() {
    const refinedData = []

    companyList.forEach(item => {
        refinedData.push(Object.values(item))
        console.log(Object.values(companyList))
    })

    let csvContent = "";

    refinedData.forEach(row => {
        csvContent += row.join('') +'\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,'})
    const objUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', objUrl)
    link.setAttribute('download', 'File.csv')
    link.textContent = "Click to download"

    document.querySelector('body').append(link)
}