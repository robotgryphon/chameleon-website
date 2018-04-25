import SlideshowElement from "./slideshow-element";

export class BannerElement extends SlideshowElement {

    protected imagePath: string = "/media/banner/";

    async loadImages() {
        let jsonFetch: Response = await fetch("../media/banner.json");
        let bannerJSON: string[] = await jsonFetch.json();
        
        let i = [];
        bannerJSON.forEach(imageSrc => {
            i.push({
                src: this.imagePath + imageSrc,
                alt: ""
            });
        });

        this.images = i;
    }
}

customElements.define("chameleon-banner", BannerElement);