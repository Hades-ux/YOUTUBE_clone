import client from "./clinet.js";

// save cache data with expiry
export const setCache = async (key, value, ttl =  60) => {
    await client.setEx(key, ttl, JSON.stringify(value))
};

// get cache data
export const getCache = async (key) => {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
};