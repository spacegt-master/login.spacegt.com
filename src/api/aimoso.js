import axios from "../axios/index.js";

export function smsCodes({ phone, org, headerOptions }) {
  return axios({
    url: import.meta.env.VITE_APP_AIMOSO_PORTAL_API + "/sms-codes",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-afs-session-id": headerOptions.sessionId,
      "x-afs-sig": headerOptions.sig,
      "x-afs-token": headerOptions.token,
      "x-org": org,
    },
    data: { type: "LGN", phoneNumber: phone },
  });
}

export function login({ phoneNumber, smsCode, type, org }) {
  return axios({
    url: import.meta.env.VITE_APP_AIMOSO_PORTAL_API + "/passports/login",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-org": org,
    },
    data: { type, phoneNumber, smsCode },
  });
}

export function profile({ org, token }) {
  return axios({
    url: import.meta.env.VITE_APP_AIMOSO_PORTAL_API + "/profile",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-org": org,
      "x-token": token,
    },
    data: { org, token },
  });
}
