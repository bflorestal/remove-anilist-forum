function hideSections() {
  const forumLink = document.querySelector('a[href="/forum/overview"]');
  const forumActivity = document.querySelector("div.recent-threads");
  const recentReviews = document.querySelector("div.recent-reviews");

  if (forumLink) forumLink.style.display = "none";
  if (forumActivity) forumActivity.style.display = "none";
  if (recentReviews) recentReviews.style.display = "none";
}

function showSections() {
  const forumLink = document.querySelector('a[href="/forum/overview"]');
  const forumActivity = document.querySelector("div.recent-threads");
  const recentReviews = document.querySelector("div.recent-reviews");

  if (forumLink) forumLink.style.display = "";
  if (forumActivity) forumActivity.style.display = "";
  if (recentReviews) recentReviews.style.display = "";
}

chrome.storage.local.get({ hideAniListSections: true }, function (data) {
  const shouldHide = data.hideAniListSections;
  if (shouldHide) {
    hideSections();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSections") {
    if (message.hide === true) {
      hideSections();
    } else if (message.hide === false) {
      showSections();
    }
    sendResponse({ status: "ok" });
  }
  return true;
});
