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

  const select = form.querySelector("select[name='quests']");
  removeError(select);
  if (select.value === "default") {
    createError(select, "Будь ласка, виберіть тип оплати!");
    result = false;
  }

  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("delivery-form");
  const resetButton = document.querySelector(".reset-button");
  let localStoragePermission = false;

  document.getElementById("accept-btn").addEventListener("click", function () {
    document.getElementById("ask-window").style.display = "none";
    localStoragePermission = true;
    loadLastOrder();
  });
  document.getElementById("cansel-btn").addEventListener("click", function () {
    document.getElementById("ask-window").style.display = "none";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validation(this)) {
      const orderData = {
        name: this.name.value,
        surname: this.surname.value,
        phone: this.phone.value,
        address: this.adress.value,
        paymentType: this.quests.value,
      };
      if (localStoragePermission) {
        saveLastOrder(orderData);
      }
      document.getElementById("new-alert2").style.display = "block";
    }
  });

  resetButton.addEventListener("click", function () {
    if (localStoragePermission) {
      localStorage.removeItem("lastOrder");
    }
    form.reset();
    clearErrors(form);
  });

  function saveLastOrder(data) {
    localStorage.setItem("lastOrder", JSON.stringify(data));
  }

  function loadLastOrder() {
    if (localStoragePermission) {
      const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
      if (lastOrder) {
        form.name.value = lastOrder.name;
        form.surname.value = lastOrder.surname;
        form.phone.value = lastOrder.phone;
        form.adress.value = lastOrder.address;
        form.quests.value = lastOrder.paymentType;
      }
    }
  }
});

document.getElementById("phone-num").addEventListener("input", function () {
  let inputValue = this.value;
  let numericValue = inputValue.replace(/\D/g, "");
  this.value = numericValue.slice(0, 10);
});

document
  .getElementById("delivery-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validation(this) == true) {
      document.getElementById("new-alert2").style.display = "block";
    }
  });

document.getElementById("new-alert2").addEventListener("click", function () {
  document.getElementById("new-alert2").style.display = "none";
});
