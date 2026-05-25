
import express from 'express';
// import { Constants } from "./src/constants.mjs";
const app = express();

const port = 3000;

// const limiter:rateLimitRequestHandler = rateLimit(passedOptions: {
//     windowMs: Constants.millisPerSecond * Constants.secondsPerMinute,
//     limit: Constants.requestsLimit,
//     standardHeaders: 'draft-8',
//     legacyHeaders: false,
//     ipv6Subnet: 56
// });

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('hello world');
// });

// app.post("/mail", (req, res) => {
//     console.log(`mail button clicked`);
// });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
