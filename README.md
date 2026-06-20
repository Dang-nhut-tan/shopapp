# shopapp

## Setup database

Copy `.env.example` to `.env`, then update `DB_PASSWORD` with your MySQL password.

```bash
yarn install
yarn db:setup
```

If you use npm:

```bash
npm install
npm run db:setup
```

`db:setup` will:

1. Create the database if it does not exist.
2. Run all Sequelize migrations.
3. Run all seeders to create sample data.

## Useful database commands

```bash
yarn db:migrate
yarn db:seed
yarn db:seed:undo
```

## Newman test

Run the app first:

```bash
yarn start
```

Then open another terminal and run:

```bash
yarn test:newman
```

## Luồng chạy

1. `.env` chứa thông tin kết nối MySQL của từng máy.
2. `config/config.js` đọc `.env` và trả cấu hình cho Sequelize.
3. `.sequelizerc` nói cho `sequelize-cli` dùng `config/config.js`.
4. `yarn db:setup` chạy `scripts/create-database.js` để tạo database nếu chưa có.
5. Sau đó `sequelize-cli db:migrate` chạy file trong `migrations/` để tạo bảng.
6. Cuối cùng `sequelize-cli db:seed:all` chạy file trong `seeders/` để thêm dữ liệu mẫu.
