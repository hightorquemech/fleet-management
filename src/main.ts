const TEN_PERCENT_DECREASED_FLEET_MANAGER_EFFICIENCY_PER_YEAR_IN_HOURS = 200;

const print = document.querySelector(".print");

// CALCULATIONS
const otherGuyInputs = Array.from(document.querySelectorAll("input")).filter(
  (input) => input.id.includes("og") && !input.id.includes("total")
);
const otherGuyTotal = document.querySelector(
  "#og-yearly-total"
) as HTMLInputElement;
const withUsInputs = Array.from(document.querySelectorAll("input")).filter(
  (input) => input.id.includes("wu") && !input.id.includes("total")
);
const withUsTotal = document.querySelector(
  "#wu-yearly-total"
) as HTMLInputElement;
const totalSavings = document.querySelector(
  "#total-savings"
) as HTMLInputElement;

// COMPARE
const compareA = document.querySelector("#compare-a") as HTMLInputElement;
const compareB = document.querySelector("#compare-b") as HTMLInputElement;
const compareC = document.querySelector("#compare-c") as HTMLInputElement;
const compareD = document.querySelector("#compare-d") as HTMLInputElement;
const compareE = document.querySelector("#compare-e") as HTMLInputElement;

const compareF = document.querySelector("#compare-f") as HTMLInputElement;
const compareG = document.querySelector("#compare-g") as HTMLInputElement;
const compareH = document.querySelector("#compare-h") as HTMLInputElement;
const compareI = document.querySelector("#compare-i") as HTMLInputElement;
const compareJ = document.querySelector("#compare-j") as HTMLInputElement;

const compareFOffering = document.querySelector("#gas-vehicle") as HTMLElement;
const compareHOffering = document.querySelector(
  "#diesel-vehicle"
) as HTMLElement;

const aToECompare = [compareA, compareB, compareC, compareD, compareE];
const fToICompare = [compareF, compareG, compareH, compareI];
const allCompareAToI = [...aToECompare, ...fToICompare];

function checkOtherGuyTotal() {
  const canCalcTotal = otherGuyInputs.every((input) => !!input.value);

  if (canCalcTotal) {
    const values = otherGuyInputs.map((input) =>
      Number(Number(input.value).toFixed(2))
    );
    const total = (values[0] + values[1] + values[2]) * values[3] * values[4];
    otherGuyTotal.value = `${total}`;
    compareA.value = otherGuyTotal.value;
    setDifference();
  }
}

function checkWithUsTotal() {
  const canCalcTotal = withUsInputs.every((input) => !!input.value);

  if (canCalcTotal) {
    const values = withUsInputs.map((input) =>
      Number(Number(input.value).toFixed(2))
    );
    const total = (values[0] + values[1] + values[2]) * values[3] * values[4];
    withUsTotal.value = `${total}`;
    setDifference();
  }
}

function setDifference() {
  if (otherGuyTotal.value && withUsTotal.value) {
    totalSavings.value = (
      Number(otherGuyTotal.value) - Number(withUsTotal.value)
    ).toFixed();
  }
}

function checkAToECompare() {
  const canCalcC = !!compareA.value && !!compareB.value;
  const canCalcValues =
    !!compareA.value && !!compareB.value && !!compareD.value;

  if (canCalcC) {
    compareC.value = (
      Number(compareB.value) *
      TEN_PERCENT_DECREASED_FLEET_MANAGER_EFFICIENCY_PER_YEAR_IN_HOURS
    ).toString();
  }

  if (canCalcValues) {
    const totalNonMemberFleetMgmtYearlyCost =
      Number(compareA.value) + Number(compareC.value) + Number(compareD.value);
    compareE.value = totalNonMemberFleetMgmtYearlyCost.toString();
  }
}

function checkFToICompare() {
  const canCalcValues = allCompareAToI.every((input) => !!input.value);

  if (canCalcValues) {
    compareJ.value = (
      (Number(compareF.value) * Number(compareG.value) +
        Number(compareH.value) * Number(compareI.value)) *
      12
    ).toString();
  }
}

function onGasPriceUpdate() {
  compareFOffering.textContent = compareF.value;
}

function onDieselPriceUpdate() {
  compareHOffering.textContent = compareH.value;
}

otherGuyInputs.forEach((input) =>
  input.addEventListener("input", checkOtherGuyTotal)
);
withUsInputs.forEach((input) =>
  input.addEventListener("input", checkWithUsTotal)
);
aToECompare.forEach((input) =>
  input.addEventListener("input", checkAToECompare)
);
fToICompare.forEach((input) =>
  input.addEventListener("input", checkFToICompare)
);

compareF.addEventListener("input", onGasPriceUpdate);
compareH.addEventListener("input", onDieselPriceUpdate);

print?.addEventListener("click", () => {
  window.print();
});
