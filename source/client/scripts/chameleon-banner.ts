import { html, render } from "lit-html";

export class BannerElement extends HTMLElement {

    private images: Array<HTMLImageElement>;
    protected imagePath: string = "/media/banner/";

    public currentImage: HTMLImageElement;
    public currentImageIndex: number;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.rerender();
        this.currentImageIndex = 0;
        this.firstRun();
    }

    async firstRun() {
        let jsonFetch: Response = await fetch("../media/banner.json");
        let bannerJSON: string[] = await jsonFetch.json();
        
        this.images = new Array<HTMLImageElement>();
        bannerJSON.forEach(imageSrc => {
            let i = new Image();
            i.src = this.imagePath + imageSrc;

            this.images.push(i);
        });

        this.currentImage = this.images.shift();
        this.setBackground(this.currentImage);
    }

    rerender() {
        render(this.template, this.shadowRoot);
    }
    
    setBackground(image: HTMLImageElement) {
        let backgroundElement: HTMLDivElement | undefined = this.shadowRoot.querySelector("#banner-background");
        if(backgroundElement) {
            backgroundElement.style.backgroundImage = `url("${image.src}")`;
        }
    }

    get template() {
        return html`
            <style>
                :host {
                    width: inherit;
                    height: inherit;
                }

                #banner-background {
                    width: inherit;
                    height: inherit;
                    background-position-y: center;
                    background-size: cover;
                }
            </style>

            <div id="banner-background"></div>
            <div id="banner-preload"></div>
        `;
    }
}

customElements.define("chameleon-banner", BannerElement);

/*

        <style>
            :host {
                display: block;
                height: 100%;
                width: inherit;
                background-color: antiquewhite;
                position: relative;
                box-shadow: 0px 4px 5px 0 #333;
                z-index: -1;
            }

            #banner-background {
                display: block;
                position: absolute;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding-top: 3em;

                background: antiquewhite no-repeat center center fixed;
                background-image: none;
                background-size: cover;
                transition: 3s;
            }

            #banner-preload {
                background: antiquewhite no-repeat center center fixed;
                background-image: none;
                background-size: cover;
                display: none;
            }
        </style>

        <iron-ajax auto
            url="[[imageListPath]]"
            handle-as="json"
            on-response="parseBannerImages"
            debounce-duration="300"></iron-ajax>

         
    </template>

    <script>
        class ChameleonBanner extends Polymer.Element {
            static get is() { return 'chameleon-banner'; }

            static get properties() {
                return {
                    imageListPath: {
                        type: String,
                        value: "banner.json"
                    },

                    basePath: {
                        type: String,
                        value: "/media/banner/"
                    },

                    transitionTime: {
                        type: Number,
                        value: 10
                    },

                    currentImage: {
                        type: Number,
                        value: 0
                    }
                }
            }

            constructor() {
                super();
                this.images = [];
                this.cached = 0;
                this.imagesAllLoaded = false;
                this.currentImage = 0;
            }

            parseBannerImages(data) {
                this.images = [];

                let bannerImages = data.detail.response;
                if(!bannerImages) return;

                bannerImages.forEach(path => this.images.push(this.basePath + path));
                
                // Preload images.
                // If more than one image, try to load the first and second.
                // Otherwise, just load the first.
                switch(this.images.length) {
                    case 0:
                        this.imagesAllLoaded = true;
                        break;

                    case 1:
                        this.preloadImage(0);
                        this.imagesAllLoaded = true;

                    case 2:
                        this.preloadImage(0);
                        this.preloadImage(1);
                        this.imagesAllLoaded = true;

                    default:
                        this.preloadImage(0);
                        this.preloadImage(1);
                        break;
                }
                
                // If we have an image, set up the background
                if(this.images.length > 0) {
                    this.maxImage = bannerImages.length - 1;
                    let banner = this.shadowRoot.querySelector("#banner-background");
                    banner.style.backgroundImage = "url('" + this.images[0] + "')";
                }

                if(this.images.length > 1) 
                    setInterval(this.changeImage.bind(this), this.transitionTime * 1000);
            }

            preloadImage(index) {
                if(this.cached < index + 1) {
                    let preload = this.shadowRoot.querySelector("#banner-preload");
                    preload.style.backgroundImage = `url("${this.images[index]}")`;
                    this.cached++;
                }
            }
            
            changeImage() {
                this.currentImage++;
                if(this.currentImage > this.maxImage) {
                    this.currentImage = 0;
                    this.imagesAllLoaded = true;
                }

                if(!this.imagesAllLoaded) {
                    // Preload next image in the series
                    this.preloadImage(this.currentImage + 1);
                }

                let banner = this.shadowRoot.querySelector("#banner-background");
                banner.style.backgroundImage = "url('" + this.images[this.currentImage] + "')";
            }
        }

        customElements.define(ChameleonBanner.is, ChameleonBanner);
    </script>
</dom-module> */