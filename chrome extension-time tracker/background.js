// Productive sites list
const productiveSites = ["stackoverflow.com", "github.com", "leetcode.com"];

// Classify site
function classifySite(url) {
    return productiveSites.includes(url) ? "Productive" : "Unproductive";
}

let activeTabId = null;
let activeStartTime = null;
let siteTimes = {};

// When tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await updateTime();
    activeTabId = activeInfo.tabId;
    activeStartTime = Date.now();
});

// When page reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (tabId === activeTabId && changeInfo.status === "complete") {
        updateTime();
        activeStartTime = Date.now();
    }
});

// MAIN TIMER (this was missing earlier)
setInterval(updateTime, 1000);

// Update time spent
async function updateTime() {
    if (!activeTabId || !activeStartTime) return;

    const tab = await chrome.tabs.get(activeTabId);
    if (!tab || !tab.url.startsWith("http")) return;

    const url = new URL(tab.url).hostname;
    const category = classifySite(url);
    const timeSpent = Math.floor((Date.now() - activeStartTime) / 1000);

    if (!siteTimes[url]) {
        siteTimes[url] = { time: 0, category };
    }

    siteTimes[url].time += timeSpent;
    activeStartTime = Date.now();

    // Save for popup
    chrome.storage.local.set({ siteTimes });

    // Send to backend (optional)
    fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, timeSpent, category })
    }).catch(() => {});
}



