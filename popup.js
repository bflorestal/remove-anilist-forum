const toggleCheckbox = document.getElementById("toggleCheckbox");
const statusText = document.getElementById("statusText");

chrome.storage.local.get({ hideAniListSections: true }, function (data) {
  const shouldHide = data.hideAniListSections;
  toggleCheckbox.checked = shouldHide;
  updateStatusText(shouldHide);
});

function updateStatusText(isHidden) {
  if (isHidden) {
    statusText.textContent = "Sections masquées ✅";
  } else {
    statusText.textContent = "Sections affichées ✅";
  }
}

toggleCheckbox.addEventListener("change", function () {
  const hideEnabled = toggleCheckbox.checked;
  updateStatusText(hideEnabled);
  chrome.storage.local.set({ hideAniListSections: hideEnabled });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleSections",
        hide: hideEnabled,
      });
    }
  });
});
