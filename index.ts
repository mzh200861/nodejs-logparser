import { ParserApp } from "./src/main";
import { LogParser } from "./src/services/logParser/LogParser";
import { OutputGenerator } from "./src/utils/OutputGenerator";
import { CommandLineParser } from "./src/utils/CommandLineParser";
import { logger } from "./src/utils/Logger";
import Constants from "./src/utils/Constants";

try {
    const parserApp = new ParserApp(
        new LogParser(),
        new OutputGenerator(),
        new CommandLineParser()
    );
    parserApp.main();
} catch (error) {
    logger.error(Constants.INIT_APP_ERROR, error);
}
