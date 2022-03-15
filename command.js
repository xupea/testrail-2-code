var steps = [...document.querySelectorAll("table.steps tbody tr")]
  .map((stepElement) =>
    [...stepElement.querySelectorAll("td")].map((td) => td.innerText)
  )
  .filter((stepElement) => stepElement.length !== 0);
var caseId =
  document.querySelector(".content-header-id") &&
  document.querySelector(".content-header-id").innerText;
var caseTitle =
  document.querySelector(".content-header-title") &&
  document.querySelector(".content-header-title").innerText;
var caseSection =
  document.querySelector(".content-breadcrumb") &&
  document.querySelector(".content-breadcrumb").innerText;
var caseLink = document.location.href;
var a = {
  steps,
  caseId,
  caseTitle,
  caseSection,
  caseLink,
};
a;
