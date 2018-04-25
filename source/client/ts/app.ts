import "./chameleon-banner";

//@ts-ignore
import * as Navigo from "navigo";

let router = new Navigo(null, true, "#");

router.on(() => loadPage("home"));
router.notFound((q: any) => loadPage("not-found", q));

router.resolve();

async function loadPage(page: string, query?: any): Promise<void> {
    try {
        let pageFetch: Response = await fetch(`../pages/${page}.html`);
        let pageData = await pageFetch.text();
        let pageContainer = document.querySelector("main");
        pageContainer.innerHTML = pageData;
    }

    catch {
        return Promise.reject("Could not load page.");
    }
}