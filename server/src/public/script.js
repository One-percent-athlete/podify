const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const form = document.getElementById("form");
const container = document.getElementById("container");
const loader = document.getElementById("loader");
const button = document.getElementById("submit");
const error = document.getElementById("error");
const success = document.getElementById("success");

error.style.display = "none";
success.style.display = "none";
container.style.display = "none";

let userId, token;

const passwordRegx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

window.addEventListener("DOMContentLoaded", async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
      return searchParams.get(prop);
    },
  });

  userId = params.userId;
  token = params.token;

  const res = await fetch("/auth/verify-password-reset-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
      userId,
    }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    loader.innerText = error;
    return;
  }

  loader.style.display = "none";
  container.style.display = "block";
});

const displayError = (errorMessage) => {
  success.style.display = "none";
  error.innerText = errorMessage;
  error.style.display = "block";
};

const displaySuccess = (successMessage) => {
  error.style.display = "none";
  success.innerText = successMessage;
  success.style.display = "block";
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!password.value.trim()) {
    return displayError("Password is missing!");
  }
  if (!passwordRegx.test(password.value)) {
    return displayError(
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!"
    );
  }
  if (password.value !== confirmPassword.value) {
    return displayError("Passwords do not match!");
  }

  button.disabled = true;
  button.innerText = "Please wait...";

  const res = await fetch("/auth/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
      userId,
      password: password.value,
    }),
  });

  button.disabled = false;
  button.innerText = "Reset Password";

  if (!res.ok) {
    const { error } = await res.json();
    return displayError(error);
  }

  displaySuccess("Your password had changed successfully!");
  password.value = "";
  // button.innerText = "";
  confirmPassword.value ="";
};

form.addEventListener("submit", handleSubmit);
