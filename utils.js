import fetch from "node-fetch";
const config = require("./config.json");

export async function APIWordPress(endpoint) {
  const res = await fetch(config.urlAPI + endpoint);
  const data = await res.json();
  return await data;
}
