import {
  Component,
  Prop,
  Element,
  State,
  Watch,
  h,
  Build
} from '@stencil/core';

const DEFAULT_VERT = `attribute vec2 a_position;
void main() {gl_Position = vec4(a_position, 0, 1);}`;

const DEFAULT_FRAG = `void main() {gl_FragColor = vec4(0, 0, 0, 1);}`;

@Component({
  tag: 'pro-glshader',
  styleUrl: 'glshader.css',
  shadow: true
})
export class GLShader {

  private glPosBuffer: WebGLBuffer | null = null;
  private glProgram: WebGLProgram | null = null;
  private gl: WebGLRenderingContext | null = null;
  private canvas?: HTMLCanvasElement;

  @Element() el!: HTMLElement;

  @State() enabled = true;

  @Prop() ready = true;
  @Prop() vert: string = DEFAULT_VERT;
  @Prop() retina = false;
  @Prop() media?: string;
  @Prop() frag: string = DEFAULT_FRAG;
  @Prop() uniforms: any = {};

  @Watch('vert')
  @Watch('frag')
  shaderChanged() {
    this.compileShader();
    this.resolveUniforms();
    this.renderGL();
  }

  @Watch('uniforms')
  uniformsChanged() {
    this.resolveUniforms();
    this.renderGL();
  }

  componentDidLoad() {
    if (Build.isBrowser && this.canvas) {
      this.resize();
      const gl = this.gl = this.canvas.getContext('webgl') as any;
      gl.getExtension('OES_standard_derivatives');
      gl.getExtension('EXT_shader_texture_lod');

      if (!gl) {
        console.warn('webgl is not available');
        this.canvas = undefined;
        this.enabled = false;
        return;
      }
      this.initGL();
      this.compileShader();
      this.resolveUniforms();
      this.renderGL();
    }
  }

  private resize() {
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    const f = (this.retina) ? window.devicePixelRatio : 1;

    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvas.clientWidth * f;
    const displayHeight = canvas.clientHeight * f;

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {

      // Make the canvas the same size
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      if (this.gl) {
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
      }
    }
  }

  private resolveUniforms() {
    const gl = this.gl;
    if (!gl) {
      return;
    }
    const uniforms = this.uniforms;
    const keys = Object.keys(uniforms);
    gl.useProgram(this.glProgram);
    for (let key of keys) {
      const [prefix, uniform] = key.split(':', 2);
      const loc = gl.getUniformLocation(this.glProgram!, uniform);
      const value = uniforms[key];
      (gl as any)['uniform' + prefix](loc, value);
    }
  }

  private initGL() {
    const gl = this.gl;
    if (!gl) {
      return;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const positionBuffer = this.glPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      1.0, 1.0, -1.0, 1.0,
      1.0, -1.0, -1.0, -1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  }

  private compileShader() {
    const gl = this.gl;
    if (!gl) {
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, this.vert);
    gl.compileShader(vertexShader);
    const log = gl.getShaderInfoLog(vertexShader);
    if (log) {
      console.debug(log);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, this.frag);
    gl.compileShader(fragmentShader);
    const log2 = gl.getShaderInfoLog(fragmentShader);
    if (log2) {
      console.debug(log2);
    }

    const program = this.glProgram = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  }

  private renderGL() {
    const gl = this.gl;
    if (!gl) {
      return;
    }
    if (!this.ready) {
      gl.clearColor(0.03, 0.05, 0.07, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.flush();
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.glPosBuffer);

    const positionLocation = gl.getAttribLocation(this.glProgram!, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(this.glProgram);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  render() {
    if (this.enabled) {
      this.resize();
      return <canvas ref={el => this.canvas = el}></canvas>;
    } else {
      return null;
    }
  }
}
