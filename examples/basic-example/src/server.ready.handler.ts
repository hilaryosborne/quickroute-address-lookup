const ServerReadyHandler = async (err: Error | null) => {
  try {
    if (err) throw err;
    process.on("SIGINT", () => process.exit(1));
  } catch (e) {
    console.log("oh no", e);
  }
};

export default ServerReadyHandler;
