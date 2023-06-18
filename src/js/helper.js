import { TIMEOUT_SECONDS } from "./config";
import recipeView from "./views/recipeView";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // console.log(url);

    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    // console.log(url);
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
