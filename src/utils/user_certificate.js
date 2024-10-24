import CryptoJS from "crypto-js";

// 此处key为16进制
const key = CryptoJS.enc.Utf8.parse("359866a57ed21eb0d780abba95cd08c3");
// 偏移量长度为16位, 注：偏移量需要与后端定义好，保证一致
const iv = CryptoJS.enc.Utf8.parse("7ed21eb0d780abba");

function encrypt(plaintext) {
  const encryptedContent = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encryptedContent.ciphertext.toString();
}

function decrypt(ciphertext) {
  const decryptedContent = CryptoJS.AES.decrypt(
    CryptoJS.format.Hex.parse(ciphertext),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return CryptoJS.enc.Utf8.stringify(decryptedContent);
}

function create(message, time) {
  const plaintext = message + "." + time;
  return encrypt(plaintext);
}

function verify(ciphertext) {
  if (!ciphertext) return false;
  try {
    const data = analyze(ciphertext);
    return Date.now() < data.validity;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function value(ciphertext) {
  if (verify(ciphertext)) {
    const data = analyze(ciphertext);
    return data.message;
  }
  return;
}

function analyze(ciphertext) {
  const plaintext = decrypt(ciphertext);
  const data = plaintext.split(".");
  return {
    message: data[0],
    validity: data[1],
  };
}

export default {
  create,
  verify,
  value,
};
