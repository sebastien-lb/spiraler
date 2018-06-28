import { Component, Prop, Element, State, Listen } from '@stencil/core';

import { ISpiralerOptions, defaultOptions } from '../../interfaces';

import anime from "animejs";

@Component({
  tag: 'my-spiraler',
  styleUrl: 'spiraler.scss',
  shadow: true
})
export class Spiraler {

  @Prop({ mutable: true }) current: number = 0;
  @Prop() options: ISpiralerOptions = defaultOptions;
  @Prop() wheelSensitivity: number = 10;

  @Element() host;

  @State() nbElem: number;
  @State() t0: number = 0;
  @State() slides: Array<HTMLStencilElement>;

  private positions: Array<{ pos: number, x: number, y: number, z: number, opacity: number, scale: number, display: string }>;
  private currentDelta: number = 0;
  private isScrolling;

  componentWillLoad() {
    this.nbElem = 15;
    //this.computePositions();
  }

  async componentDidLoad() {
    await this.initSlides();
  }


  @Listen('wheel', { passive: true })
  onScroll(ev: WheelEvent) {
    //console.log('wheel', ev.deltaY);
    window.clearTimeout(this.isScrolling);
    if (ev.deltaY) {
      this.currentDelta += ev.deltaY;
      if (this.currentDelta > this.wheelSensitivity) {
        // change focused element
        //this.current = Math.min(this.current + 1, this.nbElem - 1);
        this.currentDelta = 0;
      } else if (this.currentDelta < -this.wheelSensitivity) {
        //this.current = Math.max(0, this.current - 1);
        this.currentDelta = 0;
      }
      // this.t0 = this.t0 + this.currentDelta / (Math.PI * this.wheelSensitivity);
      // console.log("delta", this.currentDelta, "current", this.current, "t0", this.t0);
      this.t0 = Math.max(0, this.t0 - ev.deltaY / this.wheelSensitivity);
      this.current = Math.round(this.t0);
      this.isScrolling = setTimeout(() => this.goToClosest(), 150);
    }
  }

  goToClosest() {
    //this.t0 = this.current;
    let obj = { t0: this.t0 };
    //console.log('begin', this.t0, obj.t0, this.current);
    anime({
      targets: obj,
      t0: this.current,
      //round: 1,
      easing: 'linear',
      duration: 300,
      update: () => {
        this.t0 = obj.t0;
        //console.log('update', this.t0, obj.t0, this.current);
      },
      complete: () => {
        //console.log('complete', this.t0, obj.t0, this.current);
      }
    });
  }

  isAfter(index: number): boolean {
    return index > this.current;
  }

  isBefore(index: number): boolean {
    return index < this.current;
  }

  private initSlides() {
    this.slides = Array.from(this.host.querySelectorAll('my-spirale-el'));
    const slidePromises = this.slides.map(slide => {
      //const id = `t-${this.slidesId}-${++this.ids}`;
      //slide.btnId = 'slide-' + id;
      //slide.id = 'slidepanel-' + id;
      return slide.componentOnReady();
    });

    return Promise.all(slidePromises);
  }

  computePositions(): void {
    const it = new Array(this.nbElem).fill(0).map((_v, i) => i);
    this.positions = it.map(v => {
      //const t0 = 0;
      const n = this.options.interval(v);
      const t = n - this.t0;
      const z = this.options.curve.z(t);
      return {
        pos: t,
        x: this.options.curve.x(t),
        y: this.options.curve.y(t),
        z: z,
        //opacity: this.options.opacityN(n - this.current),
        opacity: this.options.opacityZ(z),
        scale: this.options.scaleZ(z),
        display: this.options.displayZ(z)
      };
    });
  }

  getMatrix2D(index: number): string {
    const scaleX = this.positions[index].scale;
    const scaleY = this.positions[index].scale;
    const skewY = 0;
    const skewX = 0;
    const translateX = "0";
    const translateY = "0";
    return "translate(-50%,-50%) matrix(" + scaleX + "," + skewY + "," + skewX + "," + scaleY + "," + translateX + "," + translateY + ")";
  }

  render() {
    this.computePositions();
    console.log("render", this.positions, "current", this.current);
    return (
      <div class="outer-container">
        {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"].map((value, index) =>
          <div class={'slide ' + (this.isAfter(index) ? ('after_' + Math.abs(index - this.current)) :
            this.isBefore(index) ? 'before' : 'current')}
            style={{
              "top": 400 - this.positions[index].y + 'px', "right": 400 - this.positions[index].x + 'px',
              "opacity": this.positions[index].opacity + '',
              "transform": this.getMatrix2D(index),
              "display": this.positions[index].display
            }}>
            <span>{value}</span>
            <br />
            <span>{index}</span>
            <br />
            <span>{this.positions[index].pos}</span>
          </div>
        )}
      </div>
    );
  }
}
