async function test() {
  const Redis = require("ioredis");

  const redis = new Redis();
  //异步操作
  redis.keys("*").then(keys => console.log(keys));

  await redis.set("a", 12345);
  console.log(await redis.get("a"));
}

test();
