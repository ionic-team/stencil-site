"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const prismjs_1 = __importDefault(require("prismjs"));
const components_1 = __importDefault(require("prismjs/components/"));
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
exports.default = renderer;
