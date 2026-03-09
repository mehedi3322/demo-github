let allIssues = [];

function loadIssues(type){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res => res.json())
.then(data => {

allIssues = data.data;

showIssues(type);

})

}

function showIssues(type){

let issues = allIssues;

if(type === "open"){
issues = allIssues.filter(issue => issue.status === "open");
}

if(type === "closed"){
issues = allIssues.filter(issue => issue.status === "closed");
}

document.getElementById("count").innerText =
"Issues: " + issues.length;

const container = document.getElementById("issue-container");

container.innerHTML = "";

issues.forEach(issue => {

const div = document.createElement("div");

div.className =
"bg-white p-4 rounded shadow border-t-4 cursor-pointer";

if(issue.status === "open"){
div.classList.add("border-green-500");
}else{
div.classList.add("border-purple-500");
}

div.innerHTML = `
<h3 class="font-bold">${issue.title}</h3>
<p class="text-sm text-gray-600">${issue.description}</p>
<p class="text-sm mt-2">Status: ${issue.status}</p>
<p class="text-sm">Author: ${issue.author}</p>
`;

div.onclick = function(){
openModal(issue);
}

container.appendChild(div);

})

}

function openModal(issue){

document.getElementById("modal").classList.remove("hidden");

document.getElementById("modal-title").innerText = issue.title;

document.getElementById("modal-desc").innerText = issue.description;

document.getElementById("modal-author").innerText =
"Author: " + issue.author;

}

function closeModal(){

document.getElementById("modal").classList.add("hidden");

}

function searchIssue(){

const text = document.getElementById("searchText").value;

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
.then(res => res.json())
.then(data => {

const container = document.getElementById("issue-container");

container.innerHTML = "";

data.data.forEach(issue => {

const div = document.createElement("div");

div.className =
"bg-white p-4 rounded shadow border-t-4 border-green-500";

div.innerHTML = `
<h3 class="font-bold">${issue.title}</h3>
<p>${issue.description}</p>
`;

container.appendChild(div);

})

})

}

loadIssues("all");