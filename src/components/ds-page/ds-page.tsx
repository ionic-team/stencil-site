import { Component, Element, h } from '@stencil/core';

declare var hbspt: any;

@Component({
  tag: 'ds-page',
  styleUrl: 'ds-page.css'
})
export class DSPage {
  @Element() el: Element;

  constructor() {
    document.title = `Stencil DS - Stencil for Production Design Systems`;
  }

  componentDidLoad() {
    console.log('Injecting script');
    let existingScript = document.querySelector('#hbs-script');
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.id = 'hbs-script';
    script.onload = () => {
      this.injectForm();
    }
    document.body.appendChild(script);
    /*
    */
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
    return (
      <div class="ds-container measure-lg">
        <div class="ds-cta">
          <h1 class="ds-title">Stencil DS</h1>
          <h2>Production-ready Design Systems at Scale</h2>
        </div>
        <p>
          Is your company struggling to build shared components across teams using a diverse set of frontend frameworks
          and technologies, all while enforcing brand guidelines and exceeding accessibility standards?
        </p>
        <p>
          The Stencil team is helping many large teams and enterprises build Design Systems at scale. Let us
          help make your Design System initiative successful.
        </p>
        <div class="ds-plans">
          <div class="ds-plan">
            <h2>Stencil OSS</h2>
            <h4>Free and Open Source Forever</h4>
            <ul>
              <li>The Stencil you know and love</li>
              <li>Web Component compiler</li>
              <li>Lazy-loading for Components</li>
              <li>Intelligent polyfill loading</li>
              <li>High-performance PWAs</li>
              <li>Community support</li>
            </ul>
          </div>
          <div class="ds-plan">
            <h2>Stencil DS</h2>
            <h4>Custom pricing</h4>
            <ul>
              <li><i>Everything in Stencil OSS +</i></li>
              <li><a href="#libraries">Generate libraries for Angular, React, and Vue</a></li>
              <li><a href="#cms">Content Management System (CMS) Integrations</a></li>
              <li><a href="#documentation">Automated Documentation generation</a></li>
              <li><a href="#testing">Visual Regression testing tools</a></li>
              <li><a href="#accessibility">Accessibility verification tools</a></li>
              <li><a href="#support">Premium support</a></li>
              <li><a href="#advisory">Expert advisory for your next Design System project</a></li>
              <li>Training opportunities</li>
            </ul>
            <a href="#h-form" class="btn btn--primary">Get in touch</a>
          </div>
        </div>
        <hr />
        <h4>FAQ for Stencil DS</h4>
        <ul>
          <li>
            <b>Is Stencil free?</b>
            <p>
              Yes, the official Stencil project is 100% free and open source (MIT licensed), and
              always will be. We offer Stencil DS for teams undertaking large Design System initiatives which offers
              additional features and tools that
              are not free. This keeps the lights on and lets us keep making the Stencil you know and love better and better, all while
              helping teams be successful with their Design System initiatives.
            </p>
          </li>
          <li id="libraries">
            <b>What are Angular, React, and Vue libraries for Stencil?</b>
            <p>
              Stencil builds standard Web Components that run in all modern browsers, with intelligent loading of any
              necessary polyfills for clients with missing APIs.
            </p>
            <p>
              However, developers often prefer a framework's conventions for naming and usage that deviates from typical Web Component usage.
              In addition, building a library that can be consumed natively in each framework is tricky and is a moving target.
            </p>
            <p>
              To help with this, Stencil DS automatically generates up-to-date libraries for all major frameworks and smooths
              out any rough edges in their Web Component support. This also makes using Stencil-built components feel
              native to each framework and work like other component libraries for that framework.
            </p>
          </li>
          <li id="cms">
            <b>How do Content Management System (CMS) Integrations work?</b>
            <p>
              Teams building Design Systems are looking to bring consistent, well-supported components
              to all corners of their app and web properties. For most teams, that means enabling
              web and marketing teams to drop in components from your Design System directly in their CMS
              workflow is key.
            </p>
            <p>
              Stencil integrates with many popular CMS solutions to bring your Design System directly to content
              creators in a way that works naturally with their existing tools, all while preserving the performance
              and accessibility benefits of a Stencil-built component system.
            </p>
          </li>
          <li id="documentation">
            <b>What is Automated Documentation Generation?</b>
            <p>
              One of the greatest challenges for Design Systems is adoption. Developers will take the
              path of least resistance to get their work done, and that means the best documentation wins.
            </p>
            <p>
              To ensure your Design System achieves mass adoption, Stencil DS generates top-quality
              documentation automatically from your components, with rich metadata about properties and
              events gathered directly from your component code.
            </p>
            <p>
              Stencil DS generates live examples, code snippets, and an index
              of all your components in a beautiful but easily customizable fashion, to make it
              incredibly fast and easy for developers to find and use the components they need.
            </p>
            <p>
              The team behind Stencil DS's documentation generation built <a href="http://ionicframework.com/docs">Ionic Framework's
              documentation</a>, regarded by many as some of the best developer documentation for an open source project. We
              can bring that level of developer regard directly to your Design System's official documentation.
            </p>
          </li>
          <li id="accessibility">
            <b>How do you verify components meet Accessibility standards?</b>
            <p>
              Building a Design System with Web Component APIs that exceeds accessibility standards
              is not straightforward. Stencil DS comes with a number of features and tools that help
              verify and <i>enforce</i> accessibility support for your components in a continuous way that can
              be easily integrated into your Continuous Integration workflow.
            </p>
            <p>
              This goes above and beyond
              existing Accessibility testing tools and ensures your Design System initiative meets and exceeds
              all legal requirements for Accessibility.
            </p>
          </li>
          <li id="testing">
            <b>How do I ensure components don't have visual UI regressions or issues in specific browsers?</b>
            <p>
              One of the biggest challenges to building any sophisticated component kit or Design System is
              ensuring components don't have visual regressions due to changes in styles or issues with
              specific browsers.
            </p>
            <p>
              Unfortunately, traditional unit testing or snapshot testing is not sufficient to test visual style and layout changes.
              The Ionic team built out a set of powerful visual regression testing tools to ensure consistency between releases.
            </p>
            <p>
              Stencil DS brings these powerful visual regression tools to teams building Design Systems,
              and helps them integrate with your existing
              Continuous Integration workflow to provide UI verification on every single commit.
            </p>
          </li>
          <li id="support">
            <b>What do I get with Premium Support?</b>
            <p>
              While Stencil has an active community and is being actively maintained, there are cases
              where certain bugs or features are not a priority due to misalignment with our open source
              roadmap or time constraints.
            </p>
            <p>
              For teams deploying major Design System initiatives, relying on open source and community support is
              not sufficient. You'll need
              assurance that key issues or features are identified and communicated quickly, with potential fixes or workarounds
              made available in a timely fashion.
            </p>
            <p>
              With Stencil DS, Premium Support is provided and teams will have a dedicated account manager to
              communicate with if anything goes wrong.
            </p>
          </li>
          <li id="advisory">
            <b>My team is new to Design Systems and we need help making our initiative successful. Do you offer Advisory Services?</b>
            <p>
              Yes! The Stencil team is the same team that built and deployed one of the most successful open
              source Design Systems ever: Ionic Framework. Today, Ionic is used by millions of developers
              for over five million applications.
            </p>
            <p>
              Not only that, but the team behind Stencil is a leader in modern Web APIs and Progressive Web Apps,
              and has unique expertise that is difficult to find anywhere else.
            </p>
            <p>
              We work with major enterprise companies and high growth startups undertaking major Design System
              initiatives that can't afford to fail, and we're ready to help your team, too!
            </p>
          </li>
        </ul>
        <div class="ds-bottom-callout" id="h-form">
          <h2>Want to learn more about Stencil DS?</h2>
          <p>
            Our team will reach out to see how we can
            help make your Design System initiative successful.
          </p>
        </div>
        <div id="ds-form-target" class="hbspt-form">
        </div>
      </div>
    );
  }
}
