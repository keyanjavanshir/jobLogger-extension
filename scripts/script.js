// IDs from HTML
const inputForm = document.getElementById("input-form")
const addSiteBtn = document.getElementById("btn-site")
const addTabBtn = document.getElementById("btn-tab")
const deleteBtn = document.getElementById("btn-delete")
const logSites = document.getElementById("log")

// Accessing localStorage
const jobsFromLocalStorage = JSON.parse( localStorage.getItem("jobList") )

// JOB ARRAY TO RENDER
let jobList = []


// TAB TEST VARIABLE
let tab = 
    { 
        url: "www.facebook.com"
    }
