import server from "./app";

const PORT: number = 5000;

server.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
});
