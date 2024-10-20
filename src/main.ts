const print = document.querySelector("button");
const otherGuyInputs = Array.from(document.querySelectorAll('input')).filter((input) => input.id.includes('og') && !input.id.includes('total'));
const otherGuyTotal = document.querySelector('#og-yearly-total') as HTMLInputElement;
const withUsInputs = Array.from(document.querySelectorAll('input')).filter((input) => input.id.includes('wu') && !input.id.includes('total'));
const withUsTotal = document.querySelector('#wu-yearly-total') as HTMLInputElement;
const totalSavings = document.querySelector('#total-savings') as HTMLInputElement;



function checkOtherGuyTotal() {
  const canCalcTotal = otherGuyInputs.every(input => {
    return !!input.value
  })

  if (canCalcTotal) {
    const values = otherGuyInputs.map(input => Number(Number(input.value).toFixed(2)));
    const total = (values[0] + values[1] + values[2]) * values[3] * values[4];
    otherGuyTotal.value = `${total}`;
  }

  if(otherGuyTotal.value && withUsTotal.value) {
    totalSavings.value = (Number(otherGuyTotal.value) - Number(withUsTotal.value)).toFixed()
  }
}

function checkWithUsTotal() {
  const canCalcTotal = withUsInputs.every(input => {
    return !!input.value
  })

  if (canCalcTotal) {
    const values = withUsInputs.map(input => Number(Number(input.value).toFixed(2)));
    const total = (values[0] + values[1] + values[2]) * values[3] * values[4];
    withUsTotal.value = `${total}`;
  }

  if(otherGuyTotal.value && withUsTotal.value) {
    totalSavings.value = (Number(otherGuyTotal.value) - Number(withUsTotal.value)).toFixed()
  }
}


console.log(otherGuyInputs);










otherGuyInputs.forEach(input => input.addEventListener('input', checkOtherGuyTotal));
withUsInputs.forEach(input => input.addEventListener('input', checkWithUsTotal));

print?.addEventListener('click', () => {
  window.print();
})