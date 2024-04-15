// script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const taxResult = document.getElementById("taxResult");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user inputs
    const grossIncome = parseFloat(
      document.getElementById("grossIncome").value
    );
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    const deductions = parseFloat(document.getElementById("deductions").value);
    const age = document.getElementById("age").value;

    // Validate inputs
    const isValid = validateInputs(grossIncome, extraIncome, deductions, age);

    if (isValid) {
      // Calculate tax
      const tax = calculateTax(grossIncome, extraIncome, deductions, age);

      // Format tax amount
      const formattedTax = formatTax(tax);

      // Display result in modal
      taxResult.textContent = `${formattedTax}`;
      modal.style.display = "block";
    } else {
      document.getElementById("error-required").style.display = "block";
      document.getElementById("error-required").style.visibility = "visible";
      document.getElementById("error-required").style.right = "30px";
      return;
    }
  });

  // Close modal when the close button is clicked
  document.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function validateInputs(grossIncome, extraIncome, deductions, age) {
  // Check if any input field is empty or not a number
  if (
    isNaN(grossIncome) &&
    isNaN(extraIncome) &&
    isNaN(deductions) &&
    age === "select"
  ) {
    return false;
  }
  return true;
}

function calculateTax(grossIncome, extraIncome, deductions, age) {
  const taxableIncome = grossIncome + extraIncome - deductions;
  let tax = 0;

  if (taxableIncome > 800000) {
    if (age === "lessThan40") {
      tax = 0.3 * (taxableIncome - 800000);
    } else if (age === "40to60") {
      tax = 0.4 * (taxableIncome - 800000);
    } else if (age === "greaterThan60") {
      tax = 0.1 * (taxableIncome - 800000);
    }
  }

  return tax;
}

function formatTax(tax) {
  // Format tax amount to "9,60,000" format
  return tax.toLocaleString("en-IN");
}

function numbersOnlyforGrossIncome(event) {
  if (!+event.target.value) {
    document.getElementById("error-gross").style.display = "block";
    document.getElementById("error-gross").style.visibility = "visible";
  } else {
    document.getElementById("error-gross").style.display = "none";
    document.getElementById("error-gross").style.visibility = "hidden";
  }
}

function numbersOnlyforExtraIncome(event) {
  if (!+event.target.value) {
    document.getElementById("error-extra").style.display = "block";
    document.getElementById("error-extra").style.visibility = "visible";
  } else {
    document.getElementById("error-extra").style.display = "none";
    document.getElementById("error-extra").style.visibility = "hidden";
  }
}

function numbersOnlyforDeductions(event) {
  if (!+event.target.value) {
    document.getElementById("error-deductions").style.display = "block";
    document.getElementById("error-deductions").style.visibility = "visible";
  } else {
    document.getElementById("error-deductions").style.display = "none";
    document.getElementById("error-deductions").style.visibility = "hidden";
  }
}

function requiredField(event) {
  if (event.target.value === "select") {
    document.getElementById("error-required").style.display = "block";
    document.getElementById("error-required").style.visibility = "visible";
    document.getElementById("error-required").style.right = "30px";
  } else {
    document.getElementById("error-required").style.display = "none";
    document.getElementById("error-required").style.visibility = "hidden";
  }
}
