import { html, render } from "lit-html";
import Swiper from "swiper";

export class BannerElement extends HTMLElement {

    protected imagePath: string = "/media/banner/";

    protected swiper;
    public delay: number;

    constructor() {
        super();
        this.delay = 2.5;

        render(this.template, this);        
        
    }

    connectedCallback() {
        this.firstRun();

        let options = {      
            autoplay: { delay: this.delay * 1000, disableOnInteraction: false },
            effect: "fade"
        };

        this.swiper = new Swiper(this, options);
    }

    async firstRun() {
        let jsonFetch: Response = await fetch("../media/banner.json");
        let bannerJSON: string[] = await jsonFetch.json();
        
        bannerJSON.forEach(imageSrc => {
            let newSlide = document.createElement("div");
	        newSlide.classList.add("swiper-slide");
	        newSlide.style.backgroundImage = `url(${this.imagePath + imageSrc})`;
	
            let c = this.querySelector(".swiper-wrapper");
            c.appendChild(newSlide);
        });        
    }

    get template() {
        return html`
            <style>
                :host {
                    width: inherit;
                    height: inherit;
                }

                .swiper-slide {
                    background-size: cover;
                    background-position-y: center;
                }
            </style>

            <div class="swiper-wrapper"></div>
        `;
    }
}

customElements.define("chameleon-banner", BannerElement);