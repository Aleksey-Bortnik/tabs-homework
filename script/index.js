const tabBtnIdPrefix = "tab-btn-";
const tabContentIdPrefix = "tab-content-";
const activeClass = "active";

function hideActiveTab() {
  let $activeElements = document.querySelectorAll("." + activeClass);
  for (let $activeElement of $activeElements) {
    $activeElement.classList.remove(activeClass);
  }
}

function tabOpeningByHash() {
  hideActiveTab();
  let hash = window.location.hash || tabContentIdPrefix + 1;
  let hashNumber = hash.split("-")[2];

  let tabIdInHash = tabContentIdPrefix + hashNumber;
  let $content = document.getElementById(tabIdInHash);
  $content.classList.add(activeClass);
  
  let activeBtnId = tabBtnIdPrefix + hashNumber;
  let $activeBtn = document.getElementById(activeBtnId);
  $activeBtn.classList.add(activeClass);
}

function onTabClicked(event) {
  hideActiveTab();

  let target = event.target;

  target.classList.add(activeClass);

  let targetNumber = target.id.split("-")[2];
  let activeTabId = tabContentIdPrefix + targetNumber;

  let $activeTab = document.getElementById(activeTabId);
  $activeTab.classList.add("active");

  window.location.hash = activeTabId;
}

function onTabKeyPressed(event) {
  if (event.keyCode !== 9) {
    return;
  }

  const $activeTabBtn = document.querySelector(".tab-button.active");

  const currentActiveTabNumber = +$activeTabBtn.id.split("-")[2];

  const numberOfTabs = document.querySelectorAll(".tab-button").length;

  const isActiveTabLast = currentActiveTabNumber == numberOfTabs;

  let newActiveTabNumber;
  if (isActiveTabLast) {
    newActiveTabNumber = 1;
  } else {
    newActiveTabNumber = currentActiveTabNumber + 1;
  }

  const tabBtnId = tabBtnIdPrefix + newActiveTabNumber;
  const tabContentId = tabContentIdPrefix + newActiveTabNumber;

  hideActiveTab();

  document.getElementById(tabBtnId).classList.add(activeClass);
  document.getElementById(tabContentId).classList.add(activeClass);

  event.preventDefault();
}

tabOpeningByHash();

let $allTabButtons = document.querySelectorAll(".tab-button");

for (let $tabButton of $allTabButtons) {
  $tabButton.addEventListener("click", onTabClicked);
}

document.addEventListener("keydown", onTabKeyPressed);
