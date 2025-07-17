import redis
import json
import random
import string

# Connect to local Valkey
r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# Helper to generate random string
def rand_str(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Upload string keys
for i in range(20):
    key = f"str:{i}"
    r.set(key, rand_str(12))

# Upload lists
for i in range(20):
    key = f"list:{i}"
    r.delete(key)
    r.rpush(key, *[rand_str(5) for _ in range(5)])

# Upload sets
for i in range(20):
    key = f"set:{i}"
    r.delete(key)
    r.sadd(key, *[rand_str(5) for _ in range(5)])

# Upload hashes
for i in range(20):
    key = f"hash:{i}"
    r.delete(key)
    r.hset(key, mapping={f"field{j}": rand_str(6) for j in range(5)})

# Upload JSON objects using RedisJSON
for i in range(20):
    key = f"json:{i}"
    obj = {
        "id": i,
        "name": rand_str(8),
        "tags": [rand_str(4) for _ in range(3)],
        "nested": {"a": i, "b": i * 2}
    }
    # JSON.SET key . value (as JSON string)
    r.execute_command("JSON.SET", key, ".", json.dumps(obj))

print("✅ Uploaded ~100 keys of different types.")
