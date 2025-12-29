document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("siteTimes", (data) => {
        let siteTimes = data.siteTimes || {};
        let table = document.getElementById("siteTable");

        for (let site in siteTimes) {
            let row = table.insertRow();
            row.insertCell(0).innerText = site;
            row.insertCell(1).innerText = siteTimes[site].time + " s";
            row.insertCell(2).innerText = siteTimes[site].category;
        }
    });
});

