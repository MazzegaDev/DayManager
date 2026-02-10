import app from "./app";

const PORT: number = 5000;

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}/docs`);
});
