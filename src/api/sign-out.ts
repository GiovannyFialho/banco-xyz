import Cookies from "js-cookie";

export async function signOut() {
  Cookies.remove("bankXYZ@user-token", { path: "/" });
  Cookies.remove("bankXYZ@user-id", { path: "/" });
}
