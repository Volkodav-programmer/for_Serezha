function validation(form) {
  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;
    parent.classList.add("error");

    parent.append(errorLabel);
  }

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function clearErrors(form) {
    const allInputs = form.querySelectorAll("input");

    for (const input of allInputs) {
      removeError(input);
    }
  }

  let result = true;

  const specificDate = new Date(2024, 0, 8);

  const bookingDateInput = document.getElementById("booking-date");
  const bookingDate = new Date(bookingDateInput.value);

  if (bookingDate < specificDate) {
    removeError(bookingDateInput);
    createError(
      bookingDateInput,
      "Обрана дата повинна бути більшою за 8 січня 2024 року!"
    );
    return false;
  } else {
    removeError(bookingDateInput);
  }

  const allInputs = form.querySelectorAll("input");

  for (const input of allInputs) {
    removeError(input);
    if (input.dataset.required == "true") {
      if (input.value == "") {
        createError(input, "Поле повинне бути обов'язково заповнено!");
        result = false;
      }
    }
  }

  return result;
}

document.getElementById("phone").addEventListener("input", function () {
  let inputValue = this.value;
  let numericValue = inputValue.replace(/\D/g, "");
  this.value = numericValue.slice(0, 10);
});

document
  .getElementById("reserv-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validation(this) == true) {
      document.getElementById("new-alert").style.display = "block";
    }
  });

document.getElementById("hide-block").addEventListener("click", function () {
  document.getElementById("new-alert").style.display = "none";
});
