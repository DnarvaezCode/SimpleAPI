const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { routerProduct } = require("./routes/product");
const { routerCategorie } = require("./routes/categorie");
const { routerUser } = require("./routes/user");
const authJwt = require("./helpers/validate-jwt");
const errorHandler = require("./helpers/error-handler");

require("dotenv").config();
const app = express();

/**Middleware */
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
/**Validar la autenticación basada en jwt.*/
app.use(authJwt());
/**Mandar error personalizado */
app.use(errorHandler);
/**Router */
app.use("/api/product", routerProduct);
app.use("/api/categorie", routerCategorie);
app.use("/api/user", routerUser);

/**Connection */
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database is conected!");
  })
  .catch(console.log);

app.listen(process.env.PORT, () => {
  console.log("Server running on port:", process.env.PORT);
});
