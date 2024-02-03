// JOB ARRAY TO RENDER
let companyList = []

// IDs from HTML
const inputForm = document.getElementById("input-form")
const addSiteBtn = document.getElementById("btn-site")
const addTabBtn = document.getElementById("btn-tab")
const deleteBtn = document.getElementById("btn-delete")
const logSites = document.getElementById("log")

// Accessing localStorage
const companiesFromLocalStorage = JSON.parse( localStorage.getItem("myCompanies") )


if (companiesFromLocalStorage) {
    companyList = companiesFromLocalStorage
    render(companyList)
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


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    companyList = []
    render(companyList)
})


addSiteBtn.addEventListener("click", function() {
    if(inputForm.value === "" || inputForm.value === "undefined") {
        console.error("Please input a valid URL.")
    } else {
        companyList.push(inputForm.value)
        inputForm.value = ""
        localStorage.setItem("myCompanies", JSON.stringify(companyList) )
        render(companyList)
    }
})