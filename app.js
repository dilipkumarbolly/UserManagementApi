const express = require("express");
const app = express();
const userRoutes = require("./routes/User");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

app.listen((port = 3000), () => {
  console.log(`Server is running on port ${port}`);
});
