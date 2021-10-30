import fetch from "node-fetch";
const qs = require("qs");
const config = require("./config.json");

export async function APIWordPress(endpoint, opzioni) {
  let query;
  if (opzioni) {
    query = "?" + qs.stringify(opzioni, { encode: false });
  }

  const res = await fetch(config.urlAPI + endpoint + query);
  const data = await res.json();
  return await data;
}
