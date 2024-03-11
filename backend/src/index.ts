import "dotenv/config";
import app from "./server";
import prisma from "./utils/db";
import env from "./utils/env";

async function main() {
	try {
		await prisma.$connect();
		console.log("Database connected");

		app.listen(env.PORT, () => console.log(`Server started at port ${env.PORT}`));
	} catch (error) {
		console.error(error);
	}
}

void main();