const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

window.onload = function(){

if(!localStorage.getItem("login")){

window.location.href = "index.html"

}

loadIssues()

}


// Load All Issues

function loadIssues(){

fetch(API)
.then(res => res.json())
.then(data => showIssues(data.data))

}


// Show Issues

function showIssues(issues){

let container = document.getElementById("issuesContainer")

container.innerHTML = ""

issues.forEach(issue => {

let border = issue.status === "open" ? "border-green-500" : "border-purple-500"

let card = `

<div onclick="loadSingle(${issue.id})"
class="bg-white p-4 shadow cursor-pointer border-t-4 ${border}">

<h3 class="font-bold mb-2">${issue.title}</h3>

<p class="text-sm text-gray-600 mb-3">
${issue.description}
</p>

<p>Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p class="text-sm text-gray-400">
${issue.createdAt}
</p>

</div>
`

container.innerHTML += card

})

}


// Open Tab

function loadOpen(){

fetch(API)
.then(res => res.json())
.then(data => {

let openIssues = data.data.filter(i => i.status === "open")

showIssues(openIssues)

})

}


// Closed Tab

function loadClosed(){

fetch(API)
.then(res => res.json())
.then(data => {

let closedIssues = data.data.filter(i => i.status === "closed")

showIssues(closedIssues)

})

}


// Search

function searchIssue(){

let text = document.getElementById("searchInput").value

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
.then(res => res.json())
.then(data => showIssues(data.data))

}


// Load Single Issue

function loadSingle(id){

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res => res.json())
.then(data => {

let issue = data.data

document.getElementById("modal-title").innerText = issue.title
document.getElementById("modal-desc").innerText = issue.description
document.getElementById("modal-status").innerText = "Status: " + issue.status
document.getElementById("modal-author").innerText = "Author: " + issue.author
document.getElementById("modal-priority").innerText = "Priority: " + issue.priority
document.getElementById("modal-label").innerText = "Label: " + issue.label
document.getElementById("modal-date").innerText = "Created: " + issue.createdAt

document.getElementById("modal").classList.remove("hidden")

})

}


// Close Modal

function closeModal(){

document.getElementById("modal").classList.add("hidden")

}