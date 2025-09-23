import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("❌ Redis Client Error:", err));

async function testRedis() {
  try {
    await client.connect();
    console.log("✅ Connected to Redis Cloud!");

    // Set a value
    await client.set("testKey", "Hello Redis!");

    // Get the value back
    const value = await client.get("testKey");
    console.log("📦 Value from Redis:", value);

    // Close connection
    await client.disconnect();
    console.log("🔌 Disconnected");
  } catch (err) {
    console.error("❌ Error testing Redis:", err);
  }
}

testRedis();
