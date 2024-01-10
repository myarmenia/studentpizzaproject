import allowedOrigins from "./AllowedOrigins.js";

const corsOptions = {
    origin: allowedOrigins,
    allowedHeaders: true,
    credentials: true
};

export default corsOptions