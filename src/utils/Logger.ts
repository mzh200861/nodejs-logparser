import { createLogger, stdSerializers } from "bunyan";

let logger = createLogger({
    name: "parserApp",
    streams: [
        {
            level: "info",
            stream: process.stdout,
        },
        {
            level: "error",
            stream: process.stderr,
        },
    ],
    serializers: stdSerializers,
});

export { logger };
