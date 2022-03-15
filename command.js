var steps = [...document.querySelectorAll("table.steps tbody tr")].map(
  (stepElement) =>
    [...stepElement.querySelectorAll("td")].map((td) => td.innerText)
);
var caseId =
  document.querySelector(".content-header-id") &&
  document.querySelector(".content-header-id").innerText;
var caseTitle =
  document.querySelector(".content-header-title") &&
  document.querySelector(".content-header-title").innerText;
var caseSection =
  document.querySelector(".content-breadcrumb") &&
  document.querySelector(".content-breadcrumb").innerText;
var a = {
  steps,
  caseId,
  caseTitle,
  caseSection,
};
a;
