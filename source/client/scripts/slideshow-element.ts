import { render, html } from "lit-html";
import { repeat } from "lit-html/lib/repeat";

class SlideshowElement extends HTMLElement {

    protected _images;
    public currentSlide: HTMLElement;
    public delay: number;
    protected timer: number;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.images = [];

        try { this.delay = (parseFloat(this.getAttribute("delay"))) || 2.5; }
        catch { this.delay = 2.5; }
    }

    async connectedCallback() {
        await this.loadImages();
        this.currentSlide = this.shadowRoot.querySelector("div.slide");
        if(this.currentSlide)
            this.currentSlide.classList.add("current");

        this.start();
    }

    get nextSlide(): HTMLElement {
        let curr = this.currentSlide;
        let end = curr.nextElementSibling == null;

        if(end)
            return this.shadowRoot.querySelector("div.slide") as HTMLElement;

        return curr.nextElementSibling as HTMLElement;
    }

    get images() {
        return this._images;
    }

    set images(val) {
        this._images = val;
        this.render();
    }

    render() {
        let dom = repeat(this.images, (item: any) => html`<div class="slide" style="background-image: url('${item.src}');" /></div>`);
        let styles = html`
            <style>
                :host {
                    display: block;
                    overflow: hidden;
                    position: relative;
                }

                .slide {
                    position: absolute;
                    background-size: cover;
                    background-position-y: center;
                    width: 100%;
                    height: 100%;
                    z-index: 5;
                    opacity: 0;
                    transition: opacity 1s;
                }

                .slide.current {
                    z-index: 10;
                    opacity: 1;
                }
            </style>
        `;

        render(html`${styles}${dom}`, this.shadowRoot);
    }

    async loadImages() { }

    changeImage() {
        let curr = this.currentSlide;
        let next = this.nextSlide;

        curr.classList.remove("current");
        next.classList.add("current");
        this.currentSlide = next;
    }

    start() {
        this.timer = setInterval(this.changeImage.bind(this), this.delay * 1000);
    }

    stop() {
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

export default SlideshowElement;