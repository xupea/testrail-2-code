chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "jj_flash_note_action_create") {
    createIframe(request.data);
  } else if (request.action === "close-iframe") {
    closeIframe();
  }
});

// 透過下面的程式碼可以注入 iframe
function createIframe(data) {
  const dataString = JSON.stringify(data["steps"]);
  const dataEncode = encodeURIComponent(dataString);
  const caseTitle = encodeURIComponent(data["caseTitle"]);
  const caseSection = encodeURIComponent(data["caseSection"]);

  const iframe = document.createElement("iframe");
  iframe.id = "iframe-in-root";
  iframe.allow = "microphone;camera;clipboard-write";
  iframe.sandbox = "allow-scripts allow-same-origin allow-forms";
  iframe.setAttribute("allowFullScreen", "");
  iframe.scrolling = "no";
  iframe.style.cssText = `
    width: 50%;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    z-index: 9999;
    height: 100%;
  `;
  iframe.src =
    chrome.runtime.getURL("main.html") +
    `?steps=${dataEncode}&caseId=${data["caseId"]}&caseTitle=${caseTitle}&caseSection=${caseSection}`;

  const container = document.createElement("div");
  const app = document.createElement("div");
  app.id = "iframe-container";
  app.style.cssText = `
    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
  `;

  const mask = document.createElement("div");
  mask.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9000;
    background-color: rgba(0,0,0,.4);
    opacity: 1;
  `;
  mask.addEventListener("click", () => closeIframe());

  app.appendChild(mask);
  app.appendChild(iframe);
  container.appendChild(app);

  document.body.appendChild(container);
}

function closeIframe() {
  const iframe = document.getElementById("iframe-container");
  if (iframe) {
    iframe.parentNode.removeChild(iframe);
  }
}
