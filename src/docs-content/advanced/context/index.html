<h1 id="context">Context</h1>
<h3 id="what-is-context-">What is Context?</h3>
<p>Context is a global object which can be used to store global variables, singleton objects etc. and bind them in your components as props. You can see it as a dependency inspector for Stencil.</p>
<h3 id="how-to-bind-a-context-item">How to Bind a Context Item</h3>
<pre><code><span class="hljs-meta">@Component</span>({
<span class="hljs-symbol">  tag:</span> <span class="hljs-string">'my-component'</span>
});
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> {</span>
  <span class="hljs-meta">@Prop</span>({ <span class="hljs-string">context:</span> <span class="hljs-string">'myObj'</span> }) <span class="hljs-keyword">private</span> <span class="hljs-string">myObj:</span> any;
}
</code></pre><h3 id="how-to-define-a-context-item">How to Define a Context Item</h3>
<p>Context items are defined by directly binding to the global <code>Context</code> object. As a best practice you can use <code>src/global</code> to store the definitions.</p>
<p>First you need to define the item:</p>
<pre><code><span class="hljs-comment">// src/global/myObj.ts </span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> privateInstance = ...

  return {
    <span class="hljs-attr">call</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      privateInstance.method();
    }
  };
})();
</code></pre><p>Then create a global script that will be used to reference all the context items:</p>
<pre><code><span class="hljs-comment">// src/global/index.ts</span>

<span class="hljs-keyword">import</span> myObj <span class="hljs-keyword">from</span> <span class="hljs-string">'./myObj'</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> Context: <span class="hljs-built_in">any</span>;

Context.globalVar = <span class="hljs-string">''</span>;
Context.myObj = myObj;
</code></pre><p>Finally just add the global script in config:</p>
<pre><code><span class="hljs-keyword">export</span>.<span class="hljs-built_in">config</span> = {
  <span class="hljs-comment">// ...</span>
  globalScript: <span class="hljs-string">'src/global/index.ts'</span>
};
</code></pre><p><stencil-route-link url="/docs/css-variables" router="#router" custom="true">
  <button class='backButton'>
    Back
  </button>
</stencil-route-link></p>
<p><stencil-route-link url="/docs/routing" custom="true">
  <button class='nextButton'>
    Next
  </button>
</stencil-route-link></p>
