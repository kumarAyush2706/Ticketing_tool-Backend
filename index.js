const express = require("express");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
app.use(cors({origin:["http://localhost:5173"],
    credentials: true,
}))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectDB = require("./Config/dbConnection");
connectDB();

const query_routes = require("./routes/query_routes");
app.use("/api", query_routes);
