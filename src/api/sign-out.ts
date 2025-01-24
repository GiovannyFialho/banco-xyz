import Cookies from "js-cookie";

export async function signOut() {
  Cookies.remove("bankXYZ@user-auth", { path: "/" });
  localStorage.removeItem("userData");
}
