import localtunnel from "localtunnel";

const startTunnel = async () => {
  try {
    const tunnel = await localtunnel({ port: 8000 });

    console.log("Public URL:", tunnel.url);

    tunnel.on("close", () => {
      console.log("Tunnel closed");
    });
  } catch (err) {
    console.error("Tunnel error:", err);
  }
};

startTunnel();
