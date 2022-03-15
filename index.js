"use strict";

const lineStart = 144;
const lineHeight = 18;
let currentLine = 1;

const numberMapping = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
};

function sendMessage() {
  chrome.runtime.sendMessage({ from: "iframe" });
}

function sendTabsMessage() {
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: "iframe" });
  });
}

document.getElementById("btn-close").addEventListener("click", () => {
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "close-iframe" });
  });
});

document.getElementById("copy-code").addEventListener("click", () => {
  let text = document.querySelector(".lines-content").innerText;
  text = text.replace(/\u00A0/g, " ");
  navigator.clipboard.writeText(text);

  document.getElementById("copied").style.display = "inline";

  setTimeout(() => {
    document.getElementById("copied").style.display = "none";
  }, 1000);
});

/**
 * 更新注释中的测试用例名称
 */
function updateCaseNameInComment(text) {
  document.getElementById("test-case-name").innerText = text;
}

/**
 * 更新注释中的测试用例地址
 */
function updateCaseLinkInComment(text) {
  document.getElementById("test-case-link").innerText = text;
}

/**
 * 更新 describe
 */
function updateDescribe(text) {
  document.getElementById("describe").innerText = `"${text}"`;
}

/**
 * 更新 it
 */
function updateIt(caseId, caseTitle) {
  document.getElementById("it").innerText = `"${caseId} ${caseTitle}"`;
}

function createStep(index, text, type) {
  const container = document.createElement("div");
  const stepType = type === "step" ? `Step ${index}` : "Expected Result";
  container.innerHTML = `
  <span
    ><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="mtk3 mtki"
      >// ${stepType} : ${text}</span
    >
  </span>`;

  container.className = "view-line";
  container.style.cssText = `
    top: ${lineStart + currentLine * lineHeight}px; 
    height: 18px
  `;

  document.querySelector(".view-lines").appendChild(container);

  currentLine++;
}

function createEmpty() {
  const container = document.createElement("div");

  container.className = "view-line";

  container.style.cssText = `
    top: ${lineStart + currentLine * lineHeight}px; 
    height: 18px
  `;
  container.innerHTML = "<span><span></span></span>";

  document.querySelector(".view-lines").appendChild(container);
  currentLine++;
}

function upadteItClose() {
  document.getElementById("it-close").style.top = `${
    lineStart + currentLine * lineHeight
  }px`;
  currentLine++;
}

function updateDescribeClose() {
  document.getElementById("describe-close").style.top = `${
    lineStart + currentLine * lineHeight
  }px`;
  currentLine++;
}

function getDataFromURL() {
  const url = new URL(document.location.href);
  const steps = JSON.parse(decodeURIComponent(url.searchParams.get("steps")));
  const caseTitle = url.searchParams.get("caseTitle");
  const caseId = url.searchParams.get("caseId");
  const caseSection = url.searchParams.get("caseSection");
  const caseLink = decodeURIComponent(url.searchParams.get("caseLink"));

  return {
    steps,
    caseId,
    caseTitle,
    caseSection,
    caseLink,
  };
}

function createLines() {
  const lines = 9 + currentLine;
  const linesContainer = document.querySelector(".margin-view-overlays");

  for (let i = 1; i < lines; i++) {
    const line = document.createElement("div");
    line.style.cssText = `position: absolute; top: ${
      (i - 1) * 18
    }px; width: 100%; height: 18px`;
    line.innerHTML = `
    <div
      class="cldr codicon codicon-folding-expanded"
      style="left: 40px; width: 26px"></div>
    <div class="line-numbers" style="left: 18px; width: 22px">
      ${i}
    </div>`;

    linesContainer.appendChild(line);
  }
}

function createItClose() {
  const container = document.createElement("div");

  container.className = "view-line";

  container.style.cssText = `
    top: ${lineStart + currentLine * lineHeight}px; 
    height: 18px
  `;
  container.innerHTML =
    "<span><span class='mtk1'>&nbsp;&nbsp;});</span></span>";

  document.querySelector(".view-lines").appendChild(container);
  currentLine++;
}

function createDescribeClose() {
  const container = document.createElement("div");

  container.className = "view-line";

  container.style.cssText = `
    top: ${lineStart + currentLine * lineHeight}px; 
    height: 18px
  `;
  container.innerHTML = "<span><span class='mtk1'>});</span></span>";

  document.querySelector(".view-lines").appendChild(container);
  currentLine++;
}

function fetchAllSteps() {
  const { steps, caseId, caseTitle, caseSection, caseLink } = getDataFromURL();
  console.log(steps, caseId, caseTitle);

  updateCaseNameInComment(caseTitle);

  updateCaseLinkInComment(caseLink);

  updateDescribe(caseSection);

  updateIt(caseId, caseTitle);

  steps.map((data) => {
    createStep(data[0], data[1], "step");
    createEmpty();
    createStep(data[0], data[2], "expect");
    createEmpty();
  });

  createItClose();
  createDescribeClose();

  createLines();
}

fetchAllSteps();
