import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import SiteLayout from "../components/layout/SiteLayout";
import Reveal from "../components/ui/Reveal";
import AccessibleDialog from "../components/ui/AccessibleDialog";
import { serviceProcess } from "../data/services";
import { constructionStory, projectCategories, projects } from "../data/projects";
import "../projects-page.css";

const processDescriptions = [
    "Requirements and site context are reviewed.",
    "The system approach is developed around the brief.",
    "Scope and commercial details are prepared.",
    "Civil, mechanical, and electrical work is coordinated.",
    "The delivered system moves into support.",
];

function ProjectFacts({ project }) {
    const facts = [
        project.capacity && ["Capacity", project.capacity],
        project.stage && ["Stage", project.stage],
        ["Category", project.category],
    ].filter(Boolean);

    return (
        <dl className="portfolio-facts">
            {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
    );
}

function ProjectViewer({ project, onClose, onProjectChange }) {
    const [imageIndex, setImageIndex] = useState(0);
    const touchStart = useRef(null);
    const currentProjectIndex = projects.findIndex((item) => item.id === project?.id);

    const changeImage = useCallback((direction) => {
        if (!project || project.images.length < 2) return;
        setImageIndex((current) => (current + direction + project.images.length) % project.images.length);
    }, [project]);

    const changeProject = useCallback((direction) => {
        if (!project) return;
        const nextProject = projects[(currentProjectIndex + direction + projects.length) % projects.length];
        setImageIndex(0);
        onProjectChange(nextProject);
    }, [currentProjectIndex, onProjectChange, project]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "ArrowLeft") changeImage(-1);
        if (event.key === "ArrowRight") changeImage(1);
    }, [changeImage]);

    const handleTouchStart = (event) => { touchStart.current = event.changedTouches[0].clientX; };
    const handleTouchEnd = (event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) changeImage(distance > 0 ? -1 : 1);
        touchStart.current = null;
    };

    if (!project) return null;
    const projectNumber = String(currentProjectIndex + 1).padStart(2, "0");

    return (
        <AccessibleDialog open onClose={onClose} onKeyDown={handleKeyDown} title={`Project ${projectNumber}`} label={`${project.title} project viewer`} className="portfolio-dialog">
            <div className="portfolio-viewer">
                <div className="portfolio-viewer__stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <motion.img
                        key={project.images[imageIndex]}
                        initial={{ opacity: 0, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={project.images[imageIndex]}
                        alt={`${project.title}, supplied project view ${imageIndex + 1} of ${project.images.length}`}
                    />
                    {project.images.length > 1 && (
                        <>
                            <button type="button" className="portfolio-viewer__arrow portfolio-viewer__arrow--left" onClick={() => changeImage(-1)} aria-label="Previous image"><ChevronLeft /></button>
                            <button type="button" className="portfolio-viewer__arrow portfolio-viewer__arrow--right" onClick={() => changeImage(1)} aria-label="Next image"><ChevronRight /></button>
                        </>
                    )}
                    <span className="portfolio-viewer__count" aria-live="polite">{String(imageIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
                </div>

                <aside className="portfolio-viewer__details">
                    <div className="portfolio-viewer__heading">
                        <span>{projectNumber}</span>
                        <p>{project.category}</p>
                    </div>
                    <h2>{project.title}</h2>
                    <p className="portfolio-viewer__copy">{project.shortDescription}</p>
                    <ProjectFacts project={project} />

                    {project.images.length > 1 && (
                        <div className="portfolio-thumbnails" aria-label="Project gallery thumbnails">
                            {project.images.map((image, index) => (
                                <button type="button" key={image} className={imageIndex === index ? "active" : ""} onClick={() => setImageIndex(index)} aria-label={`View image ${index + 1}`} aria-current={imageIndex === index ? "true" : undefined}>
                                    <img loading="lazy" src={image} alt="" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="portfolio-project-switcher">
                        <button type="button" onClick={() => changeProject(-1)} aria-label="Previous project"><ArrowLeft /> Previous</button>
                        <button type="button" onClick={() => changeProject(1)} aria-label="Next project">Next <ArrowRight /></button>
                    </div>
                </aside>
            </div>
        </AccessibleDialog>
    );
}

function ConstructionStory() {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <section className="construction-story section-pad" aria-labelledby="construction-title">
            <div className="site-container construction-story__grid">
                <div className="construction-story__intro">
                    <p className="section-eyebrow"><span />Field documentation</p>
                    <h2 id="construction-title">How the work<br />takes shape.</h2>
                    <p>Selected records from separate supplied media groups show the progression of field execution. They are presented as an archive sequence, not as stages of one unverified project.</p>
                    <ol className="construction-story__index">
                        {constructionStory.map((stage, index) => (
                            <li key={stage.number} className={activeStage === index ? "active" : ""}><span>{stage.number}</span>{stage.title}</li>
                        ))}
                    </ol>
                </div>
                <div className="construction-story__frames">
                    {constructionStory.map((stage, index) => (
                        <motion.article key={stage.number} className="construction-frame" onViewportEnter={() => setActiveStage(index)} viewport={{ amount: 0.58 }}>
                            <figure>
                                <img loading="lazy" src={stage.image} alt={stage.alt} />
                                <figcaption><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div></figcaption>
                            </figure>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Projects() {
    const [category, setCategory] = useState("All Projects");
    const [selected, setSelected] = useState(null);
    const heroRef = useRef(null);
    const spotlightRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const featured = projects.find((project) => project.featured) || projects[0];
    const filtered = useMemo(() => category === "All Projects" ? projects : projects.filter((project) => project.category === category), [category]);
    const categoryCounts = useMemo(() => Object.fromEntries(projectCategories.map((item) => [item, item === "All Projects" ? projects.length : projects.filter((project) => project.category === item).length])), []);
    const updateSelected = useCallback((project) => setSelected(project), []);

    const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroImageY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 28]);
    const heroContentY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -34]);
    const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0.3]);
    const { scrollYProgress: spotlightProgress } = useScroll({ target: spotlightRef, offset: ["start end", "end start"] });
    const spotlightY = useTransform(spotlightProgress, [0, 1], [reduceMotion ? 0 : -10, reduceMotion ? 0 : 10]);

    return (
        <SiteLayout>
            <section ref={heroRef} className="projects-hero" aria-labelledby="projects-title">
                <motion.img style={{ y: heroImageY }} className="projects-hero__image" src={featured.coverImage} alt="PowerNex field work showing solar installation and mechanical structure" fetchPriority="high" />
                <div className="projects-hero__wash" />
                <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="site-container projects-hero__content">
                    <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="section-eyebrow"><span />Our projects</motion.p>
                    <div className="projects-hero__title-mask"><motion.h1 id="projects-title" initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>Built in<br /><em>the real world.</em></motion.h1></div>
                    <motion.p initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="projects-hero__copy">Explore PowerNex structural, civil, installation, and field work through authentic supplied photography.</motion.p>
                    <motion.a initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.35 }} href="#portfolio" className="projects-hero__explore">Explore the portfolio <ArrowDown /></motion.a>
                </motion.div>
                <div className="projects-hero__index"><span>01 / Portfolio</span><span>{String(projects.length).padStart(2, "0")} documented groups</span></div>
            </section>

            <section className="portfolio-intro section-pad">
                <div className="site-container portfolio-intro__grid">
                    <Reveal><p className="section-eyebrow"><span />Built by PowerNex</p><h2>Real sites.<br />Real engineering.<br />Real progress.</h2></Reveal>
                    <Reveal delay={0.08} className="portfolio-intro__copy">
                        <p>This portfolio preserves the structure of the supplied archive: multiple photographs from the same named folder remain together as one project group.</p>
                        <div className="portfolio-summary" aria-label="Portfolio summary">
                            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>Project groups</span></div>
                            <div><strong>{String(projectCategories.length - 1).padStart(2, "0")}</strong><span>Active categories</span></div>
                            <div><strong>{String(projects.reduce((total, project) => total + project.images.length, 0)).padStart(2, "0")}</strong><span>Photographs</span></div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="portfolio-feature section-pad" aria-labelledby="featured-title">
                <div className="site-container portfolio-feature__grid">
                    <Reveal className="portfolio-feature__media">
                        <button type="button" onClick={() => setSelected(featured)} aria-label={`Open ${featured.title} gallery`}>
                            <img src="/projects/field-work-and-system-integration/image-02.jpeg" alt="Solar-panel installation in the supplied PowerNex field-work collection" />
                            <span className="portfolio-feature__mask" />
                            <span className="portfolio-feature__image-count"><Images /> {String(featured.images.length).padStart(2, "0")} images</span>
                        </button>
                    </Reveal>
                    <Reveal direction="right" className="portfolio-feature__content">
                        <p className="section-eyebrow"><span />01 / Featured documentation</p>
                        <p className="portfolio-kicker">{featured.category}</p>
                        <h2 id="featured-title">{featured.title}</h2>
                        <p>{featured.shortDescription}</p>
                        <ProjectFacts project={featured} />
                        <button type="button" className="portfolio-text-link" onClick={() => setSelected(featured)}>View project gallery <ArrowRight /></button>
                    </Reveal>
                </div>
            </section>

            <section id="portfolio" className="portfolio-index section-pad" aria-labelledby="portfolio-title">
                <div className="site-container">
                    <Reveal className="portfolio-index__heading"><div><p className="section-eyebrow"><span />Project portfolio</p><h2 id="portfolio-title">Work documented<br />as it happened.</h2></div><p>Every tile represents one supplied folder group. Gallery counts are calculated from the centralized project data.</p></Reveal>
                    <div className="portfolio-filters" role="group" aria-label="Filter projects by category">
                        {projectCategories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}><span>{item}</span><small>{String(categoryCounts[item]).padStart(2, "0")}</small></button>)}
                    </div>
                    <div className="portfolio-grid">
                        {filtered.map((project, index) => (
                            <Reveal as="article" key={project.id} delay={(index % 3) * 0.07} className={`portfolio-tile portfolio-tile--${project.layout}`}>
                                <button type="button" onClick={() => setSelected(project)} aria-label={`Open ${project.title} gallery`}>
                                    <figure>
                                        <img loading="lazy" src={project.coverImage} alt={`${project.title} - supplied PowerNex project documentation`} />
                                        <span className="portfolio-tile__shade" />
                                        <span className="portfolio-tile__number">{String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span>
                                        {project.images.length > 1 && <span className="portfolio-tile__count"><Images /> {String(project.images.length).padStart(2, "0")}</span>}
                                        <figcaption><small>{project.category}</small><strong>{project.title}</strong><span>{[project.capacity, project.stage].filter(Boolean).join(" / ") || "View documentation"}</span><ArrowRight /></figcaption>
                                    </figure>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <ConstructionStory />

            <section className="project-process section-pad" aria-labelledby="process-title">
                <div className="site-container">
                    <Reveal className="project-process__heading"><p className="section-eyebrow"><span />Project delivery</p><h2 id="process-title">A clear path<br />from brief to support.</h2></Reveal>
                    <Reveal className="project-process__track">
                        <span className="project-process__line"><i /></span>
                        {serviceProcess.map((step, index) => <article key={step}><b>{String(index + 1).padStart(2, "0")}</b><span /><h3>{step}</h3><p>{processDescriptions[index]}</p></article>)}
                    </Reveal>
                </div>
            </section>

            <section ref={spotlightRef} className="portfolio-spotlight">
                <motion.img style={{ y: spotlightY }} loading="lazy" src="/projects/ps-05-building-2-10kw/image-02.jpeg" alt="Mechanical structure work at PS-05 Building 2 during the red oxide stage" />
                <div className="portfolio-spotlight__wash" />
                <div className="site-container portfolio-spotlight__content"><Reveal><p className="section-eyebrow"><span />Field detail</p><h2>Engineering<br />in progress.</h2><p>Real construction documentation from PS-05, Building 2.</p></Reveal></div>
            </section>

            <section className="portfolio-cta section-pad">
                <div className="portfolio-cta__grid" />
                <div className="site-container portfolio-cta__content">
                    <Reveal><p className="section-eyebrow"><span />Start a project</p><h2>Let's build<br />your energy<br /><em>solution.</em></h2></Reveal>
                    <Reveal delay={0.08} className="portfolio-cta__actions"><p>Talk to PowerNex Solutions about your solar-energy requirements.</p><div><Link to="/get-quote" className="button button--primary">Get free quote <ArrowRight /></Link><Link to="/services" className="button button--outline">Explore services</Link></div></Reveal>
                </div>
            </section>

            <ProjectViewer project={selected} onClose={() => setSelected(null)} onProjectChange={updateSelected} />
        </SiteLayout>
    );
}
