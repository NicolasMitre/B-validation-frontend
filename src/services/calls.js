export const getUsers = async username => {
  const users = await fetch("http://localhost:5000/api/user/" + username);

  return users;
};

export const sendMail = async email => {
  const response = await fetch("http://localhost:5000/api/recovery", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  });
  if (response.status === 401) {
    console.log("No estás autorizado");
  }
  return response;
};

export const passwordRecovered = async (email, password, token) => {
  const response = await fetch("http://localhost:5000/api/recovered", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      resetCode: token
    })
  });

  return response;
};

export const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  return response;
};

export const registerUser = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: email,
      password: password
    })
  });

  return response;
};
