export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.data.accessToken) {
    //return { Authorizationdd: "Bearer " + user.accessToken };
    return { "x-access-token": user.data.accessToken };
  } else {
    return {};
  }
}

export const findUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.data.id) {
    //return { Authorization: "Bearer " + user.accessToken };
    return user.data.id;
  } else {
    return {};
  }
};
