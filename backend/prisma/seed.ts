import { base, faker } from "@faker-js/faker";
import { PrismaClient, Role } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function main() {
    // Create random users
    for (let i = 0; i < 10; i++) {
        let user = await prisma.user.create({
            data: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                password: faker.internet.password(),
                city: faker.location.city(),
                zipCode: faker.location.zipCode(),
                role: faker.helpers.arrayElement(Object.values(Role)),
            },
        });

        // Create ratings for each user
        for (let j = 0; j < 2; j++) {
            await prisma.rating.create({
                data: {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    comment: faker.lorem.sentence(),
                    images: [faker.image.url()],
                    userId: user.id,
                },
            });
        }

        // Create dishes for each user
        for (let j = 0; j < 3; j++) {
            const meal = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/random.php"
            );
            const price = parseFloat(faker.commerce.price()) % 100;
            const imageBuffer = await axios.get(
                meal.data.meals[0].strMealThumb,
                { responseType: "arraybuffer" }
            );
            const raw = Buffer.from(imageBuffer.data).toString("base64");
            const base64Image = `data:${imageBuffer.headers["content-type"]};base64,${raw}`;

            let dish = await prisma.dish.create({
                data: {
                    name: meal.data.meals[0].strMeal,
                    r_price: price,
                    s_price: price * 0.8,
                    description: faker.lorem.sentence(),
                    images: [base64Image],
                    tags: meal.data.meals[0].strTags?.split(",") || [],
                    userId: user.id,
                },
            });

            // Create orders associated with each dish
            await prisma.order.create({
                data: {
                    dishes: {
                        connect: { dishId: dish.dishId },
                    },
                    userId: user.id,
                },
            });
        }

        // Create sessions for each user
        for (let j = 0; j < 1; j++) {
            await prisma.session.create({
                data: {
                    userId: user.id,
                    isValid: faker.datatype.boolean(),
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
