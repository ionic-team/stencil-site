"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("@stencil/utils");
const markdown_renderer_1 = __importDefault(require("./markdown-renderer"));
const front_matter_1 = __importDefault(require("front-matter"));
const readFile = util_1.promisify(fs_1.default.readFile);
const writeFile = util_1.promisify(fs_1.default.writeFile);
const globAsync = util_1.promisify(glob_1.default);
const DESTINATION_DIR = './src/docs-content';
const SOURCE_DIR = './src/docs-md';
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
        const files = yield globAsync(`${SOURCE_DIR}/**/*.md`, {});
        yield utils_1.rimraf(DESTINATION_DIR);
        const filePromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
            const jsonFileName = path_1.default.relative(SOURCE_DIR, file);
            const destinationFileName = path_1.default.join(DESTINATION_DIR, path_1.default.dirname(jsonFileName), path_1.default.basename(jsonFileName, '.md') + '.json');
            const markdownContents = yield readFile(file, { encoding: 'utf8' });
            const metadata = front_matter_1.default(markdownContents);
            console.log(metadata.attributes);
            const htmlContents = marked_1.default(markdownContents, { renderer: markdown_renderer_1.default });
            yield utils_1.mkdirp(path_1.default.join(DESTINATION_DIR, path_1.default.dirname(jsonFileName)));
            yield writeFile(destinationFileName, JSON.stringify({
                srcPath: file,
                content: htmlContents
            }), {
                encoding: 'utf8'
            });
            console.log(`converted: ${file} => ${destinationFileName}`);
        }));
        yield Promise.all(filePromises);
        console.log(`successfully converted ${filePromises.length} files`);
    });
})();
