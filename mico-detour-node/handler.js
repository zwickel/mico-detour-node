"use strict"
const redis = require("async-redis");

module.exports = async (context, callback) => {
    const cloudEvent = JSON.parse(context)
    let result = [];
    const client = redis.createClient(6379, "redis.mico-system");

    const detour = await client.get("detour:status");
    client.quit();

    if (detour === "on") {
        cloudEvent["routingslip"] = [["detour"]];
    } else {
        cloudEvent["routingslip"] = [["destination"]];
    }

    result.push(cloudEvent);
    return result;
}
