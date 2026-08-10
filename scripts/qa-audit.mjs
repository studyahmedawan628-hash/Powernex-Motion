import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "vite";

const routes = ["/", "/about", "/services", "/products", "/projects", "/contact", "/get-quote"];
const fullViewports = [
    { width: 280, height: 653 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
];
const servicesViewports = [
    { width: 280, height: 653 }, { width: 320, height: 568 }, { width: 360, height: 800 },
    { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 412, height: 915 },
    { width: 430, height: 932 }, { width: 480, height: 800 }, { width: 600, height: 900 },
    { width: 768, height: 1024 }, { width: 820, height: 1180 }, { width: 900, height: 1200 },
    { width: 1024, height: 768 }, { width: 1180, height: 820 }, { width: 1280, height: 800 },
    { width: 1366, height: 768 }, { width: 1440, height: 900 }, { width: 1600, height: 900 },
    { width: 1920, height: 1080 }, { width: 2560, height: 1440 }, { width: 3440, height: 1440 },
    { width: 3840, height: 2160 }, { width: 844, height: 390 },
];
const projectsViewports = [
    { width: 280, height: 653 }, { width: 320, height: 568 }, { width: 360, height: 800 },
    { width: 390, height: 844 }, { width: 430, height: 932 }, { width: 480, height: 800 },
    { width: 600, height: 900 }, { width: 768, height: 1024 }, { width: 820, height: 1180 },
    { width: 1024, height: 768 }, { width: 1180, height: 820 }, { width: 1280, height: 800 },
    { width: 1366, height: 768 }, { width: 1440, height: 900 }, { width: 1600, height: 900 },
    { width: 1920, height: 1080 }, { width: 2560, height: 1440 }, { width: 3440, height: 1440 },
    { width: 844, height: 390 }, { width: 1180, height: 700 },
];
const contactViewports = [
    { width: 280, height: 653 }, { width: 320, height: 568 }, { width: 360, height: 640 },
    { width: 375, height: 667 }, { width: 390, height: 844 }, { width: 412, height: 915 },
    { width: 430, height: 932 }, { width: 480, height: 900 }, { width: 600, height: 960 },
    { width: 768, height: 1024 }, { width: 820, height: 1180 }, { width: 1024, height: 768 },
    { width: 1180, height: 820 }, { width: 1280, height: 800 }, { width: 1366, height: 768 },
    { width: 1440, height: 900 }, { width: 1600, height: 900 }, { width: 1920, height: 1080 },
    { width: 2560, height: 1440 }, { width: 3440, height: 1440 }, { width: 3840, height: 2160 },
];
const contactZoomViewports = [
    { width: 1152, height: 720 }, // 1440x900 at 125% browser zoom
    { width: 960, height: 600 },  // 1440x900 at 150% browser zoom
    { width: 720, height: 450 },  // 1440x900 at 200% browser zoom
];
const quoteViewports = [
    { width: 280, height: 653 }, { width: 320, height: 568 }, { width: 360, height: 640 },
    { width: 375, height: 667 }, { width: 390, height: 844 }, { width: 412, height: 915 },
    { width: 430, height: 932 }, { width: 480, height: 900 }, { width: 600, height: 960 },
    { width: 768, height: 1024 }, { width: 820, height: 1180 }, { width: 1024, height: 768 },
    { width: 1180, height: 820 }, { width: 1280, height: 800 }, { width: 1366, height: 768 },
    { width: 1440, height: 900 }, { width: 1600, height: 900 }, { width: 1920, height: 1080 },
    { width: 2560, height: 1440 }, { width: 3440, height: 1440 }, { width: 3840, height: 2160 },
    { width: 844, height: 390 }, { width: 1180, height: 700 },
];
const quoteZoomViewports = [
    { width: 1152, height: 720 }, { width: 960, height: 600 }, { width: 720, height: 450 },
];
const siteZoomViewports = [
    { width: 1152, height: 720 }, // 1440x900 at 125% browser zoom
    { width: 960, height: 600 },  // 1440x900 at 150% browser zoom
    { width: 720, height: 450 },  // 1440x900 at 200% browser zoom
];
const siteViewports = [
    { width: 280, height: 653 }, { width: 320, height: 568 }, { width: 344, height: 700 },
    { width: 360, height: 640 }, { width: 375, height: 667 }, { width: 390, height: 844 },
    { width: 412, height: 915 }, { width: 430, height: 932 }, { width: 480, height: 900 },
    { width: 540, height: 900 }, { width: 600, height: 960 }, { width: 640, height: 960 },
    { width: 720, height: 960 }, { width: 768, height: 1024 }, { width: 820, height: 1180 },
    { width: 900, height: 1000 }, { width: 960, height: 900 }, { width: 1024, height: 768 },
    { width: 1100, height: 800 }, { width: 1180, height: 820 }, { width: 1280, height: 800 },
    { width: 1366, height: 768 }, { width: 1440, height: 900 }, { width: 1536, height: 864 },
    { width: 1600, height: 900 }, { width: 1920, height: 1080 }, { width: 2048, height: 1152 },
    { width: 2560, height: 1440 }, { width: 3440, height: 1440 }, { width: 3840, height: 2160 },
    { width: 667, height: 375 }, { width: 844, height: 390 },
];
const servicesMatrix = Boolean(process.env.QA_SERVICES_MATRIX);
const projectsMatrix = Boolean(process.env.QA_PROJECTS_MATRIX);
const contactMatrix = Boolean(process.env.QA_CONTACT_MATRIX);
const contactZoomMatrix = Boolean(process.env.QA_CONTACT_ZOOM);
const quoteMatrix = Boolean(process.env.QA_QUOTE_MATRIX);
const quoteZoomMatrix = Boolean(process.env.QA_QUOTE_ZOOM);
const siteMatrix = Boolean(process.env.QA_SITE_MATRIX);
const siteZoomMatrix = Boolean(process.env.QA_SITE_ZOOM);
const siteAudit = siteMatrix || siteZoomMatrix;
const reducedMotion = Boolean(process.env.QA_REDUCED_MOTION);
const auditedRoutes = siteAudit ? routes : servicesMatrix ? ["/services"] : projectsMatrix ? ["/projects"] : contactMatrix || contactZoomMatrix ? ["/contact"] : quoteMatrix || quoteZoomMatrix ? ["/get-quote"] : routes;
const viewports = process.env.QA_QUICK ? [fullViewports[0]] : siteZoomMatrix ? siteZoomViewports : siteMatrix ? siteViewports : servicesMatrix ? servicesViewports : projectsMatrix ? projectsViewports : contactZoomMatrix ? contactZoomViewports : contactMatrix ? contactViewports : quoteZoomMatrix ? quoteZoomViewports : quoteMatrix ? quoteViewports : fullViewports;
const executablePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const debugPort = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), "powernex-edge-"));
const failures = [];
const requests = new Map();
let currentLabel = "startup";

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function getDebugTarget() {
    for (let attempt = 0; attempt < 150; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
            const targets = await response.json();
            const page = targets.find((target) => target.type === "page");
            if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
        } catch {
            // Edge is still starting.
        }
        await wait(100);
    }
    throw new Error("Could not connect to the Edge debugging endpoint.");
}

class CdpClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.counter = 0;
        this.pending = new Map();
        this.waiters = new Map();
    }

    async connect() {
        await new Promise((resolve, reject) => {
            this.socket.addEventListener("open", resolve, { once: true });
            this.socket.addEventListener("error", reject, { once: true });
        });
        this.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.id) {
                const pending = this.pending.get(message.id);
                if (!pending) return;
                this.pending.delete(message.id);
                if (message.error) pending.reject(new Error(message.error.message));
                else pending.resolve(message.result);
                return;
            }
            const eventWaiters = this.waiters.get(message.method) || [];
            eventWaiters.splice(0).forEach((resolve) => resolve(message.params));
            if (message.method === "Runtime.exceptionThrown") failures.push(`${currentLabel}: ${message.params.exceptionDetails.text}`);
            if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") failures.push(`${currentLabel}: console error`);
            if (message.method === "Network.requestWillBeSent") requests.set(message.params.requestId, message.params.request.url);
            if (message.method === "Network.loadingFailed") {
                const url = requests.get(message.params.requestId) || "unknown request";
                if (url.includes("127.0.0.1:5173") && !message.params.canceled && message.params.errorText !== "net::ERR_ABORTED") failures.push(`${currentLabel}: failed request ${url}`);
            }
        });
        this.socket.addEventListener("close", () => {
            const error = new Error("Edge debugging connection closed unexpectedly.");
            this.pending.forEach(({ reject }) => reject(error));
            this.pending.clear();
        });
    }

    send(method, params = {}) {
        const id = ++this.counter;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.socket.send(JSON.stringify({ id, method, params }));
        });
    }

    waitFor(method, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const waiters = this.waiters.get(method) || [];
            const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeout);
            waiters.push((params) => { clearTimeout(timer); resolve(params); });
            this.waiters.set(method, waiters);
        });
    }
}

const server = await createServer({ server: { host: "127.0.0.1", port: 5173, strictPort: true } });
let edge;

try {
    await server.listen();
    edge = spawn(executablePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--disable-features=msEdgeFirstRunExperience", "--remote-debugging-address=127.0.0.1", "--remote-allow-origins=*", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: process.env.QA_TRACE ? ["ignore", "inherit", "inherit"] : "ignore" });
    const client = new CdpClient(await getDebugTarget());
    await client.connect();
    await Promise.all([client.send("Page.enable"), client.send("Runtime.enable"), client.send("Network.enable")]);
    if (reducedMotion) await client.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

    for (const viewport of viewports) {
        await client.send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 768 });
        for (const route of auditedRoutes) {
            currentLabel = `${route} @ ${viewport.width}x${viewport.height}`;
            if (process.env.QA_TRACE) console.log(`Auditing ${currentLabel}`);
            requests.clear();
            const loaded = client.waitFor("Page.loadEventFired");
            const navigation = await client.send("Page.navigate", { url: `http://127.0.0.1:5173${route}` });
            if (navigation.errorText) failures.push(`${currentLabel}: ${navigation.errorText}`);
            await loaded;
            let routeMounted = false;
            for (let attempt = 0; attempt < 60; attempt += 1) {
                const mountCheck = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    expression: "Boolean(document.querySelector('.site-header'))",
                });
                if (mountCheck.result.value) {
                    routeMounted = true;
                    break;
                }
                await wait(50);
            }
            if (!routeMounted) failures.push(`${currentLabel}: route did not mount`);
            await wait(100);
            const evaluation = await client.send("Runtime.evaluate", {
                returnByValue: true,
                expression: `(() => {
                    const root = document.documentElement;
                    const brokenImages = [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src);
                    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
                    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
                    const gridOverlaps = [...document.querySelectorAll('body *')]
                        // Perspective/rotated decorative grids have intentionally
                        // intersecting axis-aligned bounding boxes after transform.
                        .filter((container) => {
                            const style = getComputedStyle(container);
                            return style.display === 'grid' && style.transform === 'none';
                        })
                        .flatMap((container) => {
                            const children = [...container.children].filter((child) => {
                                const style = getComputedStyle(child);
                                const rect = child.getBoundingClientRect();
                                return style.display !== 'none' && style.position !== 'absolute' && rect.width > 1 && rect.height > 1;
                            }).map((child) => ({ child, rect: child.getBoundingClientRect() }));
                            return children.flatMap((a, index) => children.slice(index + 1).filter((b) => a.rect.left < b.rect.right - 2 && a.rect.right > b.rect.left + 2 && a.rect.top < b.rect.bottom - 2 && a.rect.bottom > b.rect.top + 2).map((b) => ({ container: container.className?.baseVal || container.className || container.tagName, a: a.child.className?.baseVal || a.child.className || a.child.tagName, b: b.child.className?.baseVal || b.child.className || b.child.tagName })));
                        }).slice(0, 8);
                    const clippedHeadings = [...document.querySelectorAll('h1, h2, h3')]
                        .filter((element) => element.getClientRects().length && element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 2 && !['auto', 'scroll'].includes(getComputedStyle(element).overflowX))
                        .map((element) => ({ tag: element.tagName, className: element.className?.baseVal || element.className || '', client: element.clientWidth, scroll: element.scrollWidth, text: element.textContent?.trim().slice(0, 50) })).slice(0, 8);
                    const mediaErrors = [...document.querySelectorAll('video')].filter((video) => video.error || (video.readyState >= 1 && (!video.videoWidth || !video.videoHeight))).map((video) => video.currentSrc || video.src || 'video');
                    const stretchedImages = [...document.images].filter((image) => image.complete && image.naturalWidth && getComputedStyle(image).objectFit === 'fill').filter((image) => { const rect = image.getBoundingClientRect(); return rect.width > 0 && rect.height > 0 && Math.abs((rect.width / rect.height) - (image.naturalWidth / image.naturalHeight)) > .08; }).map((image) => image.src).slice(0, 8);
                    const offenders = [...document.querySelectorAll('body *')]
                        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
                        .filter(({ rect }) => rect.width > 0 && (rect.right > root.clientWidth + 1 || rect.left < -1))
                        .slice(0, 8)
                        .map(({ element, rect }) => ({ tag: element.tagName, className: element.className?.baseVal || element.className || '', left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) }));
                    return { overflow: root.scrollWidth - root.clientWidth, brokenImages, duplicateIds, offenders, gridOverlaps, clippedHeadings, mediaErrors, stretchedImages };
                })()`,
            });
            const result = evaluation.result.value;
            if (result.overflow > 1) failures.push(`${currentLabel}: horizontal overflow ${result.overflow}px ${JSON.stringify(result.offenders)}`);
            if (result.brokenImages.length) failures.push(`${currentLabel}: broken images ${result.brokenImages.join(", ")}`);
            if (result.duplicateIds.length) failures.push(`${currentLabel}: duplicate IDs ${result.duplicateIds.join(", ")}`);
            if (siteAudit && result.gridOverlaps.length) failures.push(`${currentLabel}: grid overlap ${JSON.stringify(result.gridOverlaps)}`);
            if (siteAudit && result.clippedHeadings.length) failures.push(`${currentLabel}: clipped heading ${JSON.stringify(result.clippedHeadings)}`);
            if (siteAudit && result.mediaErrors.length) failures.push(`${currentLabel}: video error ${result.mediaErrors.join(", ")}`);
            if (siteAudit && result.stretchedImages.length) failures.push(`${currentLabel}: stretched image ${result.stretchedImages.join(", ")}`);
            if (siteAudit && route === "/") {
                const navigationAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
                        const visible = (element) => Boolean(element && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
                        const toggle = document.querySelector('.navigation-toggle');
                        const desktopNav = document.querySelector('.site-header nav > ul');
                        if (innerWidth >= 1280) {
                            const navRects = [...desktopNav.querySelectorAll('a')].map((link) => link.getBoundingClientRect());
                            const overlap = navRects.some((a, index) => navRects.slice(index + 1).some((b) => a.right > b.left - 1 && a.left < b.right + 1));
                            const search = document.querySelector('.site-header button[aria-label="Open search"]');
                            search?.click();
                            await pause(340);
                            const input = document.querySelector('.site-header input[type="search"]');
                            const header = document.querySelector('.site-header').getBoundingClientRect();
                            const inputRect = input?.getBoundingClientRect();
                            return { correctMode: visible(desktopNav) && !visible(toggle), navOverlap: overlap, searchWorks: visible(input), searchClipped: inputRect ? inputRect.left < header.left || inputRect.right > header.right : true, drawerWorks: true, unlocks: true, restoresFocus: true };
                        }
                        toggle?.click();
                        await pause(460);
                        const drawer = document.querySelector('.mobile-navigation');
                        const drawerRect = drawer?.getBoundingClientRect();
                        const drawerBody = drawer?.querySelector('.mobile-navigation__body');
                        const drawerWorks = visible(drawer) && document.body.classList.contains('menu-open') && drawerRect.left >= -1 && drawerRect.right <= document.documentElement.clientWidth + 1 && drawerRect.top >= -1 && drawerRect.bottom <= innerHeight + 1;
                        const shortViewportScrollable = innerHeight >= 600 || (drawerBody && ['auto', 'scroll'].includes(getComputedStyle(drawerBody).overflowY));
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        await pause(460);
                        return { correctMode: visible(toggle) && !visible(desktopNav), navOverlap: false, searchWorks: true, searchClipped: false, drawerWorks: drawerWorks && shortViewportScrollable, unlocks: !document.body.classList.contains('menu-open') && !document.querySelector('.mobile-navigation'), restoresFocus: document.activeElement === toggle };
                    })()`,
                });
                const navigationResult = navigationAudit.result.value || {};
                if (!navigationResult.correctMode) failures.push(`${currentLabel}: navigation breakpoint mode failed`);
                if (navigationResult.navOverlap) failures.push(`${currentLabel}: desktop navigation links overlap`);
                if (!navigationResult.searchWorks || navigationResult.searchClipped) failures.push(`${currentLabel}: desktop search interaction/clipping failed`);
                if (!navigationResult.drawerWorks) failures.push(`${currentLabel}: mobile drawer layout/scroll failed`);
                if (!navigationResult.unlocks || !navigationResult.restoresFocus) failures.push(`${currentLabel}: mobile drawer close/focus restoration failed`);
            }
            if (route === "/services" && !siteAudit) {
                const serviceAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const overlap = (selector) => {
                            const rects = [...document.querySelectorAll(selector)].filter((element) => getComputedStyle(element).display !== 'none').map((element) => element.getBoundingClientRect());
                            return rects.some((a, index) => rects.slice(index + 1).some((b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1));
                        };
                        const desktop = innerWidth > 899;
                        const selector = desktop ? '.service-navigator__list button:nth-child(2)' : '.service-navigator__mobile article:nth-child(2) > button';
                        document.querySelector(selector)?.click();
                        await new Promise((resolve) => setTimeout(resolve, 460));
                        const navigatorText = desktop ? document.querySelector('.service-navigator__stage h3')?.textContent : document.querySelector('.service-navigator__mobile article:nth-child(2) h3')?.textContent;
                        document.querySelector('.needs-guide__choices button:nth-child(3)')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 360));
                        const needText = document.querySelector('.needs-guide__result')?.textContent;
                        const faq = document.querySelector('.service-faq details');
                        faq?.querySelector('summary')?.click();
                        return {
                            navigatorWorks: navigatorText?.includes('Commercial'),
                            needsGuideWorks: needText?.includes('Energy Storage'),
                            faqWorks: Boolean(faq?.open),
                            energyOverlap: overlap('.energy-ecosystem__node'),
                            processOverlap: overlap('.delivery-process__journey article'),
                            heroClipped: (() => { const heading = document.querySelector('.services-hero h1')?.getBoundingClientRect(); return heading ? heading.left < -1 || heading.right > document.documentElement.clientWidth + 1 : true; })(),
                        };
                    })()`,
                });
                const serviceResult = serviceAudit.result.value;
                if (!serviceResult.navigatorWorks) failures.push(`${currentLabel}: service navigator interaction failed`);
                if (!serviceResult.needsGuideWorks) failures.push(`${currentLabel}: need-based guidance interaction failed`);
                if (!serviceResult.faqWorks) failures.push(`${currentLabel}: FAQ interaction failed`);
                if (serviceResult.energyOverlap) failures.push(`${currentLabel}: energy nodes overlap`);
                if (serviceResult.processOverlap) failures.push(`${currentLabel}: process steps overlap`);
                if (serviceResult.heroClipped) failures.push(`${currentLabel}: hero heading clipped`);
            }
            if (route === "/projects" && !siteAudit) {
                const projectAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const buttons = [...document.querySelectorAll('.portfolio-filters button')];
                        const civilButton = buttons.find((button) => button.textContent.includes('Civil Work'));
                        civilButton?.click();
                        await new Promise((resolve) => setTimeout(resolve, 220));
                        const filteredCount = document.querySelectorAll('.portfolio-tile').length;
                        document.querySelector('.portfolio-tile button')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 360));
                        const dialog = document.querySelector('.portfolio-dialog');
                        const initialCount = document.querySelector('.portfolio-viewer__count')?.textContent;
                        document.querySelector('.portfolio-viewer__arrow--right')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 360));
                        const changedCount = document.querySelector('.portfolio-viewer__count')?.textContent;
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        await new Promise((resolve) => setTimeout(resolve, 120));
                        const heading = document.querySelector('.projects-hero h1')?.getBoundingClientRect();
                        const controls = [...document.querySelectorAll('.portfolio-viewer__arrow')].every((element) => {
                            const rect = element.getBoundingClientRect();
                            return rect.width >= 44 && rect.height >= 44;
                        });
                        return {
                            filterWorks: filteredCount === 1,
                            dialogOpened: Boolean(dialog),
                            galleryWorks: initialCount !== changedCount,
                            escapeWorks: !document.querySelector('.portfolio-dialog'),
                            heroClipped: heading ? heading.left < -1 || heading.right > document.documentElement.clientWidth + 1 : true,
                            controlsLargeEnough: controls,
                        };
                    })()`,
                });
                const projectResult = projectAudit.result.value;
                if (!projectResult.filterWorks) failures.push(`${currentLabel}: project filter interaction failed`);
                if (!projectResult.dialogOpened) failures.push(`${currentLabel}: project viewer did not open`);
                if (!projectResult.galleryWorks) failures.push(`${currentLabel}: project gallery navigation failed`);
                if (!projectResult.escapeWorks) failures.push(`${currentLabel}: Escape did not close project viewer`);
                if (projectResult.heroClipped) failures.push(`${currentLabel}: project hero heading clipped`);
                if (!projectResult.controlsLargeEnough) failures.push(`${currentLabel}: project viewer controls are below 44px`);
            }
            if (route === "/products" && !siteAudit) {
                const productAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const pause = (duration = 100) => new Promise((resolve) => setTimeout(resolve, duration));
                        const search = document.querySelector('.catalogue-search input');
                        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
                        setter.call(search, 'no-such-powernex-product');
                        search.dispatchEvent(new Event('input', { bubbles: true }));
                        await pause();
                        const emptyStateWorks = Boolean(document.querySelector('.empty-state'));
                        document.querySelector('.empty-state button')?.click();
                        await pause();
                        const restoredProducts = document.querySelectorAll('.product-card').length > 0;

                        const compareInputs = [...document.querySelectorAll('.compare-control input')];
                        compareInputs.slice(0, 3).forEach((input) => input.click());
                        await pause();
                        const comparisonWorks = document.querySelectorAll('.comparison-grid article').length === 3;
                        const fourthDisabled = Boolean(document.querySelectorAll('.compare-control input')[3]?.disabled);

                        const trigger = document.querySelector('.product-card .text-link');
                        trigger?.focus();
                        trigger?.click();
                        await pause(180);
                        const dialog = document.querySelector('.product-dialog');
                        const dialogRect = dialog?.getBoundingClientRect();
                        const dialogFits = Boolean(dialogRect && dialogRect.left >= -1 && dialogRect.right <= document.documentElement.clientWidth + 1 && dialogRect.top >= -1 && dialogRect.bottom <= innerHeight + 1);
                        const bodyLocked = document.body.classList.contains('dialog-open');
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        await pause();
                        return {
                            emptyStateWorks, restoredProducts, comparisonWorks, fourthDisabled,
                            dialogOpened: Boolean(dialog), dialogFits, bodyLocked,
                            escapeWorks: !document.querySelector('.product-dialog'),
                            bodyUnlocked: !document.body.classList.contains('dialog-open'),
                            focusRestored: document.activeElement === trigger,
                        };
                    })()`,
                });
                const productResult = productAudit.result.value;
                if (!productResult.emptyStateWorks || !productResult.restoredProducts) failures.push(`${currentLabel}: product search/reset interaction failed`);
                if (!productResult.comparisonWorks || !productResult.fourthDisabled) failures.push(`${currentLabel}: product comparison limit failed`);
                if (!productResult.dialogOpened || !productResult.dialogFits || !productResult.bodyLocked) failures.push(`${currentLabel}: product dialog layout/lock failed`);
                if (!productResult.escapeWorks || !productResult.bodyUnlocked || !productResult.focusRestored) failures.push(`${currentLabel}: product dialog close/focus restoration failed`);
            }
            if (route === "/contact" && !siteAudit) {
                const contactAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const setValue = (selector, value) => {
                            const element = document.querySelector(selector);
                            const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
                            Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
                            element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
                        };
                        document.querySelector('.contact-intent-grid .contact-intent:nth-child(2) button')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 180));
                        const selectedType = document.querySelector('#contact-type')?.value;
                        document.querySelector('.contact-form-panel form button[type="submit"]')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        const errorSummary = Boolean(document.querySelector('.contact-error-summary'));
                        const focusedInvalid = document.activeElement?.id === 'contact-fullName';
                        setValue('#contact-fullName', 'Test User');
                        setValue('#contact-email', 'test@example.com');
                        setValue('#contact-message', 'This is a sufficiently detailed frontend validation test enquiry.');
                        document.querySelector('.contact-form-panel form')?.requestSubmit();
                        await new Promise((resolve) => setTimeout(resolve, 140));
                        const readyState = Boolean(document.querySelector('.contact-ready'));
                        document.querySelector('.contact-feedback button')?.click();
                        await new Promise((resolve) => setTimeout(resolve, 60));
                        const feedbackAcknowledged = Boolean(document.querySelector('.contact-feedback__thanks'));
                        const faq = document.querySelector('.contact-faqs details');
                        faq?.querySelector('summary')?.click();
                        const smallControls = [...document.querySelectorAll('button, .button')].filter((element) => element.getClientRects().length).map((element) => ({ element, rect: element.getBoundingClientRect() })).filter(({ rect }) => rect.height < 40).map(({ element, rect }) => ({ className: element.className?.baseVal || element.className || '', text: element.textContent?.trim().slice(0, 30), height: Math.round(rect.height) }));
                        const labels = [...document.querySelectorAll('.contact-form-panel input:not([type="hidden"]), .contact-form-panel select, .contact-form-panel textarea')].every((control) => control.labels?.length > 0);
                        const emptyDirectLinks = [...document.querySelectorAll('a[href="tel:"], a[href="mailto:"]')].length;
                        const heading = document.querySelector('.contact-hero h1')?.getBoundingClientRect();
                        return {
                            intentWorks: selectedType === 'Product Enquiry', errorSummary, focusedInvalid, readyState,
                            feedbackAcknowledged, faqWorks: Boolean(faq?.open), controls: smallControls.length === 0, smallControls, labels,
                            noEmptyDirectLinks: emptyDirectLinks === 0,
                            heroClipped: heading ? heading.left < -1 || heading.right > document.documentElement.clientWidth + 1 : true,
                        };
                    })()`,
                });
                const contactResult = contactAudit.result.value;
                if (!contactResult.intentWorks) failures.push(`${currentLabel}: contact intent routing failed`);
                if (!contactResult.errorSummary || !contactResult.focusedInvalid) failures.push(`${currentLabel}: contact validation summary/focus failed`);
                if (!contactResult.readyState) failures.push(`${currentLabel}: contact validated state failed`);
                if (!contactResult.feedbackAcknowledged) failures.push(`${currentLabel}: contact feedback failed`);
                if (!contactResult.faqWorks) failures.push(`${currentLabel}: contact FAQ failed`);
                if (!contactResult.controls) failures.push(`${currentLabel}: a contact control is below 40px ${JSON.stringify(contactResult.smallControls)}`);
                if (!contactResult.labels) failures.push(`${currentLabel}: contact form control missing a label`);
                if (!contactResult.noEmptyDirectLinks) failures.push(`${currentLabel}: empty direct-contact link rendered`);
                if (contactResult.heroClipped) failures.push(`${currentLabel}: contact hero heading clipped`);
            }
            if (route === "/get-quote" && !siteAudit) {
                const quoteAudit = await client.send("Runtime.evaluate", {
                    returnByValue: true,
                    awaitPromise: true,
                    expression: `(async () => {
                        const pause = (duration = 50) => new Promise((resolve) => setTimeout(resolve, duration));
                        const waitFor = async (test) => {
                            for (let attempt = 0; attempt < 24; attempt += 1) {
                                if (test()) return true;
                                await pause(50);
                            }
                            return false;
                        };
                        const setValue = (selector, value) => {
                            const element = document.querySelector(selector);
                            if (!element) return false;
                            const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
                            Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
                            element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
                            return true;
                        };
                        const choose = (container, text) => [...document.querySelectorAll(container + ' label')].find((label) => label.textContent.includes(text))?.click();
                        const chooseGroup = (legend, text) => {
                            const group = [...document.querySelectorAll('.quote-choice-group')].find((item) => item.querySelector('legend')?.textContent.includes(legend));
                            [...(group?.querySelectorAll('label') || [])].find((label) => label.querySelector('strong')?.textContent === text)?.click();
                        };
                        choose('.quote-intent-list', 'Residential Solar');
                        await pause(100);
                        setValue('#quote-city', 'Test City');
                        setValue('#quote-propertyType', 'Home');
                        setValue('#quote-installationType', 'Rooftop');
                        await pause();
                        document.querySelector('.quote-wizard__actions .button--primary')?.click();
                        const reachedEnergy = await waitFor(() => document.querySelector('#quote-step-title')?.textContent.includes('energy needs'));
                        chooseGroup('monthly electricity bill', 'PKR 15,000 - 30,000');
                        chooseGroup('use most', 'Mostly Daytime');
                        chooseGroup('backup power', 'No');
                        chooseGroup('already have solar', 'No');
                        await pause();
                        document.querySelector('.quote-wizard__actions .button--primary')?.click();
                        const reachedPreferences = await waitFor(() => document.querySelector('#quote-step-title')?.textContent.includes('matters'));
                        chooseGroup('Project priorities', 'Lower Electricity Cost');
                        chooseGroup('Solution interests', 'Recommend for Me');
                        chooseGroup('considering the project', 'Researching Options');
                        await pause();
                        document.querySelector('.quote-wizard__actions .button--primary')?.click();
                        const reachedReview = await waitFor(() => document.querySelector('#quote-step-title')?.textContent.includes('Review your'));
                        document.querySelector('.quote-review-row:nth-child(3) button')?.click();
                        const editWorks = await waitFor(() => document.querySelector('#quote-step-title')?.textContent.includes('matters'));
                        document.querySelector('.quote-wizard__actions .button--primary')?.click();
                        await waitFor(() => document.querySelector('#quote-step-title')?.textContent.includes('Review your'));
                        setValue('#quote-fullName', 'Test User');
                        setValue('#quote-email', 'test@example.com');
                        const labels = [...document.querySelectorAll('.quote-wizard input, .quote-wizard select')].every((control) => control.labels?.length > 0);
                        document.querySelector('.quote-request-button')?.click();
                        const readyState = await waitFor(() => Boolean(document.querySelector('.quote-complete')));
                        document.querySelector('.quote-feedback button')?.click();
                        await pause();
                        const feedbackWorks = Boolean(document.querySelector('.quote-feedback__thanks'));
                        const faq = document.querySelector('.quote-faqs details');
                        faq?.querySelector('summary')?.click();
                        const smallControls = [...document.querySelectorAll('button, .button')].filter((element) => element.getClientRects().length).map((element) => ({ element, rect: element.getBoundingClientRect() })).filter(({ rect }) => rect.height < 40).map(({ element, rect }) => ({ className: element.className?.baseVal || element.className || '', height: Math.round(rect.height) }));
                        const emptyDirectLinks = document.querySelectorAll('a[href="tel:"], a[href="mailto:"]').length;
                        const heading = document.querySelector('.quote-hero h1')?.getBoundingClientRect();
                        return { reachedEnergy, reachedPreferences, reachedReview, editWorks, readyState, feedbackWorks, faqWorks: Boolean(faq?.open), labels, controls: smallControls.length === 0, smallControls, noEmptyDirectLinks: emptyDirectLinks === 0, heroClipped: heading ? heading.left < -1 || heading.right > document.documentElement.clientWidth + 1 : true };
                    })()`,
                });
                const quoteResult = quoteAudit.result.value || {};
                if (quoteAudit.exceptionDetails) failures.push(`${currentLabel}: quote audit exception ${quoteAudit.exceptionDetails.exception?.description || quoteAudit.exceptionDetails.text}`);
                if (!quoteResult.reachedEnergy || !quoteResult.reachedPreferences || !quoteResult.reachedReview) failures.push(`${currentLabel}: quote step progression failed`);
                if (!quoteResult.editWorks) failures.push(`${currentLabel}: quote review edit failed`);
                if (!quoteResult.readyState) failures.push(`${currentLabel}: quote ready state failed`);
                if (!quoteResult.feedbackWorks) failures.push(`${currentLabel}: quote feedback failed`);
                if (!quoteResult.faqWorks) failures.push(`${currentLabel}: quote FAQ failed`);
                if (!quoteResult.labels) failures.push(`${currentLabel}: quote control missing label`);
                if (!quoteResult.controls) failures.push(`${currentLabel}: quote control below 40px ${JSON.stringify(quoteResult.smallControls)}`);
                if (!quoteResult.noEmptyDirectLinks) failures.push(`${currentLabel}: empty quote direct-contact link rendered`);
                if (quoteResult.heroClipped) failures.push(`${currentLabel}: quote hero heading clipped`);
            }
        }
    }
    await client.send("Browser.close").catch(() => undefined);
} finally {
    if (edge && edge.exitCode === null) {
        edge.kill();
        await Promise.race([once(edge, "exit"), wait(1500)]);
    }
    await server.close();
    try {
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 });
    } catch {
        // Edge can briefly retain a profile lock on Windows; the OS temp folder can safely clean it later.
    }
}

if (failures.length) {
    console.error([...new Set(failures)].join("\n"));
    process.exitCode = 1;
} else {
    console.log(`QA passed: ${auditedRoutes.length * viewports.length} route/viewport combinations.`);
}
