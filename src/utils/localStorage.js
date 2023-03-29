export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
export function clearStorage() {
  localStorage.clear();
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return null;
  }
}
