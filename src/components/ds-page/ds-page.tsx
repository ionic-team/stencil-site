import { Component, Element, h, Listen } from '@stencil/core';

declare var hbspt: any;

@Component({
  tag: 'ds-page',
  styleUrl: 'ds-page.css'
})
export class DSPage {

  private pageX = 0;
  private pageY = 0;
  private raf: any;
  private glShader: HTMLProGlshaderElement;

  @Element() el: Element;

  constructor() {
    document.title = `Stencil DS - Stencil for Production Design Systems`;
  }

  componentWillLoad() {
    document.body.classList.add('dark');
  }

  componentDidUnload() {
    document.body.classList.remove('dark');
    cancelAnimationFrame(this.raf);
  }

  componentDidLoad() {
    let existingScript = document.querySelector('#hbs-script');
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.id = 'hbs-script';
    script.onload = () => {
      this.injectForm();
    }
    document.body.appendChild(script);
    this.startRendering();
  }

  startRendering() {
    let time = Math.random();
    const glshader = this.glShader;
    const timeStep = () => {
      const width = glshader.offsetWidth;
      const height = glshader.offsetHeight;
      const x = this.pageX - glshader.offsetLeft;
      const y = height - this.pageY;

      glshader.uniforms = {
        '1f:iTime': time/600,
        '2fv:iResolution': [width, height],
        '2fv:iMouse': [x, y]
      };
      time++;
      this.raf = requestAnimationFrame(timeStep);
    };
    this.raf = requestAnimationFrame(timeStep);
  }

  @Listen('mousemove', {target: 'document'})
  onMouseMove(ev: MouseEvent) {
    this.pageX = ev.pageX;
    this.pageY = ev.pageY;
  }

  injectForm() {
    hbspt.forms.create({
      portalId: "3776657",
      formId: 'fe81d3de-e3ee-43c7-8636-e664bf53bc91',
      css: "",
      target: '#ds-form-target'
    });
  }

  render() {
    return [
      <section class="hero">
        <pro-glshader class="shader" frag={FLAG} ref={el => this.glShader = el}></pro-glshader>
        <div class="container">
          <div class="measure-lg">
            <hgroup>
              <svg class="ds-logo" width="208" height="208" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="104" cy="104" r="48" fill="#001AFF" opacity=".3" filter="url(#filter0_f)"/><path d="M155.84 122c11.62 0 17.95-7.15 17.95-17.04 0-9.89-6.33-17.04-17.95-17.04H143.6V122h12.24zm10.56-17.04c0 6.38-3.31 10.6-10.75 10.6h-5.04v-21.2h5.04c7.44 0 10.75 4.22 10.75 10.6z" fill="url(#paint0_linear)"/><path d="M189.59 116.43c-4.42 0-6.43-2.45-6.63-5.23h-6.9c.19 5.62 3.69 11.47 13.15 11.47 8.1 0 13.48-4.32 13.48-10.41 0-13.54-18.43-8.16-18.43-14.98 0-2.2 2.11-3.84 5.43-3.84 3.64 0 5.75 2.16 5.9 5.14h6.86c-.19-6.15-4.7-11.38-12.67-11.38-7.87 0-12.43 4.75-12.43 10.51 0 13.35 18.24 8.07 18.24 14.79 0 2.5-2.26 3.93-6 3.93z" fill="url(#paint1_linear)"/><g filter="url(#filter1_dddi)" fill="#fff"><path d="M95.6 113.76h24.67L106.93 128H82.4l13.2-14.24z"/><path opacity=".3" d="M95.6 113.76h24.67L89 120.88l6.6-7.12z"/><path d="M136 96.88H85.33L72 111.12h50.67L136 96.88zM101.03 80h24.57l-13.27 14.24h-24.6L101.03 80z"/></g><defs><filter id="filter0_f" x="0" y="0" width="208" height="208" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="28" result="effect1_foregroundBlur"/></filter><filter id="filter1_dddi" x="32" y="40" width="144" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="4"/><feColorMatrix values="0 0 0 0 0.439216 0 0 0 0 0.498039 0 0 0 0 1 0 0 0 0.75 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="20"/><feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.564706 0 0 0 0 1 0 0 0 1 0"/><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="8"/><feColorMatrix values="0 0 0 0 0.14902 0 0 0 0 0.215686 0 0 0 0 1 0 0 0 1 0"/><feBlend in2="effect2_dropShadow" result="effect3_dropShadow"/><feBlend in="SourceGraphic" in2="effect3_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="3"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.752941 0 0 0 0 0.988235 0 0 0 0 1 0 0 0 1 0"/><feBlend in2="shape" result="effect4_innerShadow"/></filter><linearGradient id="paint0_linear" x1="144" y1="105" x2="203" y2="105" gradientUnits="userSpaceOnUse"><stop stop-color="#F9F9FD"/><stop offset="1" stop-color="#DAD9E9" stop-opacity=".9"/></linearGradient><linearGradient id="paint1_linear" x1="144" y1="105" x2="203" y2="105" gradientUnits="userSpaceOnUse"><stop stop-color="#F9F9FD"/><stop offset="1" stop-color="#DAD9E9" stop-opacity=".9"/></linearGradient></defs></svg>
              <h1>Bring your  company’s design system to life.</h1>
              <p>Reduce design debt, connect disparate tech teams, and enforce brand consistency at scale with code-based, world-class design systems that work everywhere.</p>
              <a href="#learn-more">
                Learn more <app-icon name="arrow-down"/>
              </a>
            </hgroup>
          </div>
        </div>
      </section>,
      <section class="content content--gradient-bg" id="learn-more">
        <div class="container">
          <hgroup>
            <h2>Production-ready Design Systems at Scale.</h2>
            <p>Build shared components across teams using a diverse set of frontend frameworks and technologies, all while enforcing brand guidelines and exceeding accessibility standards.</p>
          </hgroup>
          <div class="features">
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>Stencil OSS</h3>
                    <p>Always free & open source</p>
                  </th>
                  <th>
                    <h3>Stencil DS</h3>
                    <p>Custom pricing</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Web Component compiler</div></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Web Component compiler</div></td>
                </tr>
                <tr>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Lazy-loading for Components</div></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Lazy-loading for Components</div></td>
                </tr>
                <tr>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Intelligent polyfill loading</div></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Intelligent polyfill loading</div></td>
                </tr>
                <tr>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Community support</div></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Premium Support SLA</div></td>
                </tr>
                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Generate bindings for Angular, React, and Vue</div></td>
                </tr>
                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Automated Documentation generation</div></td>
                </tr>

                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Visual Regression testing tools</div></td>
                </tr>
                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Accessibility verification tools</div></td>
                </tr>
                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Expert advisory on your Design System project</div></td>
                </tr>
                <tr>
                  <td class="empty"></td>
                  <td><div class="icon-cell"><app-icon name="checkmark"/> Training opportunities</div></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td><stencil-route-link anchorClass="btn btn--secondary" url="/docs/getting-started">Install Stencil</stencil-route-link></td>
                  <td><a href="#cta-form" class="btn btn--primary">Get in touch</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>,
      <section class="content">
        <div class="container">
          <hgroup>
            <h2>FAQ for Stencil DS</h2>
          </hgroup>
          <div class="faq-grid">
            <div>
              <h4>What parts of Stencil are free? What parts are commerically licensed?</h4>
              <p>Yes, the official Stencil project is 100% free and open source (MIT licensed), and always will be. We offer Stencil DS for teams undertaking large Design System initiatives which offers additional features and tools that are not free. This keeps the lights on and lets us keep making the Stencil you know and love better and better, all while helping teams be successful with their Design System initiatives.</p>
            </div>
            <div>
              <h4>Why do Angular, React, and Vue need bindings?</h4>
              <p>Stencil builds standard Web Components that run in all modern browsers, with intelligent loading of any necessary polyfills for clients with missing APIs.</p>
              <p>However, certain frameworks, such as React, don't play as well with Web Components out of the box. Additionally, developers often prefer a framework's conventions for naming and usage that deviates from typical Web Component usage.</p>
              <p>To bring the best of both worlds, Stencil DS automatically generates up-to-date bindings for all major frameworks and smooths out any rough edges in their Web Component support. This also makes using Stencil-built components feel native to each framework.</p>
            </div>
            <div>
              <h4>What is Automated Documentation Generation?</h4>
              <p>One of the greatest challenges for Design Systems is adoption. Developers will take the path of least resistance to get their work done, and that means the best documentation wins.</p>
              <p>To ensure your Design System achieves mass adoption, Stencil DS generates top-quality documentation automatically from your components, with rich metadata about properties and events gathered directly from your component code.</p>
              <p>Stencil DS generates live examples, code snippets, and an index of all your components in a beautiful but easily customizable fashion, to make it incredibly fast and easy for developers to find and use the components they need.</p>
              <p>The team behind Stencil DS's documentation generation built Ionic Framework's documentation, regarded by many as some of the best developer documentation for an open source project. We can bring that level of developer regard directly to your Design System's official documentation.</p>
            </div>
            <div>
              <h4>How do you verify components meet Accessibility standards?</h4>
              <p>Building a Design System with Web Component APIs that exceeds accessibility standards is not straightforward. Stencil DS comes with a number of features and tools that help verify and enforce accessibility support for your components in a continuous way that can be easily integrated into your Continuous Integration workflow.</p>
              <p>This goes above and beyond existing Accessibility testing tools and ensures your Design System initiative meets and exceeds all legal requirements for Accessibility.</p>
            </div>
            <div>
              <h4>How do I ensure components don't have visual UI regressions or issues in specific browsers?</h4>
              <p>One of the biggest challenges to building any sophisticated component kit or Design System is ensuring components don't have visual regressions due to changes in styles or issues with specific browsers.</p>
              <p>Unfortunately, traditional unit testing or snapshot testing is not sufficient to test visual style and layout changes. The Ionic team built out a set of powerful visual regression testing tools to ensure consistency between releases.</p>
              <p>Stencil DS brings these powerful visual regression tools to teams building Design Systems, and helps them integrate with your existing Continuous Integration workflow to provide UI verification on every single commit.</p>
            </div>
            <div>
              <h4>What do I get with Premium Support?</h4>
              <p>While Stencil has an active community and is being actively maintained, there are cases where certain bugs or features are not a priority due to misalignment with our open source roadmap or time constraints.</p>
              <p>For teams deploying major Design System initiatives, relying on open source and community support is not sufficient. You'll need assurance that key issues or features are identified and communicated quickly, with potential fixes or workarounds made available in a timely fashion.</p>
              <p>With Stencil DS, Premium Support is provided and teams will have a dedicated account manager to communicate with if anything goes wrong.</p>
            </div>
            <div>
              <h4>My team needs help making our initiative successful. Do you offer Advisory Services?</h4>
              <p>Yes! The Stencil team is the same team that build and deployed one of the most successful open source Design Systems ever: Ionic Framework. Today, Ionic is used by millions of developers for over five million applications.</p>
              <p>Not only that, but the team behind Stencil is a leader in modern Web APIs and Progressive Web Apps, and has unique expertise that is difficult to find anywhere else.</p>
              <p>We work with major enterprise companies and high growth startups undertaking major Design System initiatives that can't afford to fail, and we're ready to help your team, too!</p>
            </div>
          </div>
        </div>
      </section>,
      <section class="content content--border-top" id="cta-form">
        <div class="container">
          <hgroup>
            <h2>Want to learn more about Stencil DS?</h2>
            <p>Our team will reach out to see how we can help make your Design System initiative successful.</p>
          </hgroup>
          <div id="ds-form-target" class="hubspot-override">
          </div>
        </div>
      </section>
    ];
  }
}

const FLAG = `
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

#define ALTERNATE_VERSION
#define PI 3.14159265359

vec3 hash33(vec3 p) {
  float n = sin(dot(p, vec3(7, 157, 113)));
  return fract(vec3(2097152, 262144, 32768)*n)*2. - 1.;
}

float tetraNoise(in vec3 p) {
  vec3 i = floor(p + dot(p, vec3(0.333333)) );  p -= i - dot(i, vec3(0.166666)) ;
  vec3 i1 = step(p.yzx, p), i2 = max(i1, 1.0-i1.zxy); i1 = min(i1, 1.0-i1.zxy);
  vec3 p1 = p - i1 + 0.166666, p2 = p - i2 + 0.333333, p3 = p - 0.5;
  vec4 v = max(0.5 - vec4(dot(p,p), dot(p1,p1), dot(p2,p2), dot(p3,p3)), 0.0);
  vec4 d = vec4(dot(p, hash33(i)), dot(p1, hash33(i + i1)), dot(p2, hash33(i + i2)), dot(p3, hash33(i + 1.)));
  return clamp(dot(d, v*v*v*8.)*1.732 + .5, 0., 1.); // Not sure if clamping is necessary. Might be overkill.
}

vec2 smoothRepeatStart(float x, float size) {
  return vec2(
      mod(x - size / 2., size),
      mod(x, size)
  );
}

float smoothRepeatEnd(float a, float b, float x, float size) {
  return mix(a, b,
    smoothstep(
        0., 1.,
        sin((x / size) * PI * 2. - PI * .5) * .5 + .5
    )
  );
}

void main() {
  vec2 uv = (-iResolution.xy + 2. * gl_FragCoord.xy) / iResolution.y;
  float dist = distance(gl_FragCoord.xy, iMouse) / length(iResolution);

  // Zoom in a bit
  uv /= 2.;
  uv *= 1.8;

  float repeatSize = 10.;
  float x = uv.x - mod(iTime, repeatSize / 2.);
  float y = uv.y;

  vec2 ab; // two sample points on one axis

  float noise;
  float noiseA, noiseB;

  ab = smoothRepeatStart(x, repeatSize) * dist;
  noiseA = tetraNoise(16.+vec3(vec2(ab.x, uv.y) * 1.2, 0)) * .5;
  noiseB = tetraNoise(16.+vec3(vec2(ab.y, uv.y) * 1.2, 0)) * .5;
  noise = smoothRepeatEnd(noiseA, noiseB, x, repeatSize);

  ab = smoothRepeatStart(y, repeatSize / 2.);
  noiseA = tetraNoise(vec3(vec2(uv.x, ab.x) * .5, 0)) * 2.;
  noiseB = tetraNoise(vec3(vec2(uv.x, ab.y) * .5, 0)) * 2.;
  noise *= smoothRepeatEnd(noiseA, noiseB, y, repeatSize / 2.);

  ab = smoothRepeatStart(x, repeatSize);
  noiseA = tetraNoise(9.+vec3(vec2(ab.x, uv.y) * .05, 0)) * 5.;
  noiseB = tetraNoise(9.+vec3(vec2(ab.y, uv.y) * .05, 0)) * 5.;
  noise *= smoothRepeatEnd(noiseA, noiseB, x, repeatSize);

  noise *= 0.8;
  noise = mix(noise, dot(uv, vec2(-.66,1.)*.4), .6);

  float spacing = 1./90.;
  float lines = mod(noise, spacing) / spacing;
  lines = min(lines * 2., 1.) - max(lines * 2. - 1., 0.);
  lines /= fwidth(noise / spacing);

  // Double to occupy two pixels and appear smoother
  lines /= 2.;
  lines = 1. - lines;

  float iconRate = clamp(1., 240./distance(gl_FragCoord.xy, vec2(iResolution.x / 2. - 30.0, iResolution.y - 265.)), 300.);
gl_FragColor = vec4(
  vec3(0.04, 0.04, 0.078) +
  (vec3(lines) * clamp(.0, abs(noise), 1.) * 0.4 * iconRate)
,1.0);
}
`;
