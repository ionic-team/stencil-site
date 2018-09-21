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
const prismjs_1 = __importDefault(require("prismjs"));
const util_1 = require("util");
const components_1 = __importDefault(require("prismjs/components/"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("@stencil/utils");
const readFile = util_1.promisify(fs_1.default.readFile);
const writeFile = util_1.promisify(fs_1.default.writeFile);
const globAsync = util_1.promisify(glob_1.default);
const DESTINATION_DIR = './src/docs-content';
const SOURCE_DIR = './src/docs-md';
const languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
components_1.default(languages);
const renderer = new marked_1.default.Renderer();
function highlight(code, lang) {
    if (lang != null && languages.indexOf(lang) !== -1) {
        return prismjs_1.default.highlight(code, prismjs_1.default.languages[lang]);
    }
    return code;
}
renderer.code = function (code, language, escaped) {
    const [lang, hcl] = language ? language.split(':') : [undefined, undefined];
    const out = highlight(code, lang);
    if (out != null && out !== code) {
        escaped = true;
        code = out;
    }
    if (!lang) {
        return `<pre><code>${(escaped ? code : escape(code))}</code></pre>`;
    }
    return `
<highlight-code-line ${hcl ? `lines="${hcl}"` : ``}>
  <pre class="language-${escape(lang)}"><code class="language-${escape(lang)}">${(escaped ? code : escape(code))}</code></pre>
</highlight-code-line>
`;
};
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
        const files = yield globAsync(`${SOURCE_DIR}/**/*.md`, {});
        yield utils_1.rimraf(DESTINATION_DIR);
        const filePromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
            const jsonFileName = path_1.default.relative(SOURCE_DIR, file);
            const destinationFileName = path_1.default.join(DESTINATION_DIR, path_1.default.dirname(jsonFileName), path_1.default.basename(jsonFileName, '.md') + '.json');
            const markdownContents = yield readFile(file, { encoding: 'utf8' });
            const htmlContents = marked_1.default(markdownContents, {
                renderer: renderer,
            });
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
