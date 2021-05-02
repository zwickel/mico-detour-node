"use strict"
const redis = require("redis");

module.exports = async (context, callback) => {
    const client = redis.createClient(6379, process.env.redis);
    client.get("detour:status", function (err, reply) {
        if (reply === "on") {
            context.routingslip = [["detour-channel"]]
        }
        client.quit();
    });

    // return {status: "done"}
    return context;
}
