FROM rust:1.78 as builder

# Install build tools and clone RedisJSON
RUN apt-get update && apt-get install -y git clang cmake pkg-config libssl-dev && \
    git clone https://github.com/RedisJSON/RedisJSON.git /build

WORKDIR /build

# Build the RedisJSON module
RUN cargo build --release

# Final image
FROM valkey/valkey:latest

# Create module folder and copy compiled .so
RUN mkdir -p /valkey/modules
COPY --from=builder /build/target/release/librejson.so /valkey/modules/rejson.so

# Start Valkey with module
CMD ["valkey-server", "--loadmodule", "/valkey/modules/rejson.so"]
