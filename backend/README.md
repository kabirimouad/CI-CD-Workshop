- create .env file in backend folder and add the following to create the database
``` DATABASE_URL="postgresql://postgres:postgres@localhost:5432/testdb" ```

## USING YARN (Recommend)

- yarn install
- npx prisma db push
- yarn dev

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npx prisma db push
- npm run dev
