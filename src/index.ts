import { createApp } from "./app";
import { AppDataSource } from "./entities/datasource";
import { createRepos } from "./repositories";

const start = async () => {
  await AppDataSource.initialize();
  console.log("Connected to DB");
  const repos = createRepos(AppDataSource);
  const app = createApp({ repos });
  app.listen(4000, () => {
    console.log("Server starting on port 4000");
  });
};

start();
