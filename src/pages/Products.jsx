import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BatteryCharging,
    BatteryFull,
    Cable,
    Check,
    CircuitBoard,
    Construction,
    Cpu,
    Gauge,
    PanelTop,
    PanelsTopLeft,
    PlugZap,
    RadioTower,
    Search,
    ShieldCheck,
    SlidersHorizontal,
} from "lucide-react";
import SiteLayout from "../components/layout/SiteLayout";
import InnerHero from "../components/ui/InnerHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import AccessibleDialog from "../components/ui/AccessibleDialog";
import { productCategories, products } from "../data/products";

const iconMap = { PanelsTopLeft, PanelTop, Cpu, Cable, BatteryCharging, BatteryFull, PlugZap, Construction, ShieldCheck, CircuitBoard, RadioTower, Gauge };

function ProductStage({ product, compact = false }) {
    const Icon = iconMap[product.icon] || CircuitBoard;
    return (
        <div className={`product-stage ${compact ? "product-stage--compact" : ""}`}>
            <div className="product-stage__grid" aria-hidden="true" />
            <span className="product-stage__corner">PN / CATALOGUE</span>
            <Icon aria-hidden="true" />
            <p>Product image<small>Add image later</small></p>
        </div>
    );
}

function ProductDialog({ product, onClose }) {
    return (
        <AccessibleDialog open={Boolean(product)} onClose={onClose} title="Product detail" label={product?.name} className="product-dialog">
            {product && (
                <div className="product-detail">
                    <ProductStage product={product} />
                    <div className="product-detail__content">
                        <p className="product-category">{product.category}</p>
                        <h2>{product.name}</h2>
                        {(product.brand || product.model) && <p className="product-meta">{[product.brand, product.model].filter(Boolean).join(" · ")}</p>}
                        <p>{product.description || product.shortDescription}</p>
                        {product.features?.length > 0 && <div><h3>Features</h3><ul>{product.features.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>}
                        {product.specifications && <div><h3>Specifications</h3><dl>{Object.entries(product.specifications).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></div>}
                        {product.applications?.length > 0 && <div><h3>Applications</h3><div className="tag-row">{product.applications.map((item) => <span key={item}>{item}</span>)}</div></div>}
                        {product.availability && <p className="availability"><span />{product.availability}</p>}
                        <Link to="/contact" className="button button--primary">Enquire about product <ArrowRight size={16} /></Link>
                    </div>
                </div>
            )}
        </AccessibleDialog>
    );
}

export default function Products() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All Products");
    const [sort, setSort] = useState("featured");
    const [selected, setSelected] = useState(null);
    const [compare, setCompare] = useState([]);

    const filteredProducts = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        const result = products.filter((product) => {
            const categoryMatch = category === "All Products" || product.category === category;
            const searchText = [product.name, product.category, product.brand, product.model].filter(Boolean).join(" ").toLowerCase();
            return categoryMatch && (!normalized || searchText.includes(normalized));
        });
        return [...result].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "category" ? a.category.localeCompare(b.category) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }, [category, query, sort]);

    const toggleCompare = (product) => {
        setCompare((current) => current.some((item) => item.id === product.id)
            ? current.filter((item) => item.id !== product.id)
            : current.length < 3 ? [...current, product] : current);
    };

    const featured = products.find((product) => product.featured) || products[0];

    return (
        <SiteLayout>
            <InnerHero eyebrow="Energy Technology Catalogue" title="Specified for the system." accent="Selected for the need." description="Explore a flexible equipment architecture prepared for real product imagery, verified specifications, and project-specific selection." variant="products">
                <a href="#catalogue" className="button button--outline">Browse catalogue <ArrowRight size={17} /></a>
            </InnerHero>

            <section className="featured-product section-pad">
                <div className="site-container featured-product__grid">
                    <Reveal direction="left"><ProductStage product={featured} /></Reveal>
                    <Reveal direction="right" className="featured-product__content">
                        <p className="section-eyebrow"><span />Featured category</p>
                        <p className="product-category">{featured.category}</p>
                        <h2>{featured.name}</h2>
                        <p>{featured.description}</p>
                        <div className="featured-product__actions">
                            <button type="button" className="button button--primary" onClick={() => setSelected(featured)}>View product <ArrowRight size={16} /></button>
                            <Link to="/contact" className="text-link">Ask for options <ArrowRight size={15} /></Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="catalogue" className="catalogue-section section-pad">
                <div className="site-container">
                    <Reveal><SectionHeading eyebrow="Product Architecture" title="A catalogue built for informed selection." light description="Generic product records are intentionally ready for verified brands, models, imagery, datasheets, and specifications when supplied." /></Reveal>
                    <div className="catalogue-controls">
                        <label className="catalogue-search"><Search size={18} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search name, category, brand or model" /></label>
                        <label className="catalogue-sort"><SlidersHorizontal size={17} /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="name">Name A–Z</option><option value="category">Category</option></select></label>
                    </div>
                    <div className="filter-row" aria-label="Product categories">
                        {productCategories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
                    </div>
                    <div className="catalogue-result-bar"><p><strong>{filteredProducts.length}</strong> product{filteredProducts.length === 1 ? "" : "s"}</p>{compare.length > 0 && <p>{compare.length}/3 selected to compare</p>}</div>

                    {filteredProducts.length > 0 ? (
                        <div className="product-grid">
                            {filteredProducts.map((product, index) => {
                                const checked = compare.some((item) => item.id === product.id);
                                return (
                                    <Reveal key={product.id} delay={(index % 3) * 0.06} className="product-card">
                                        <ProductStage product={product} compact />
                                        <div className="product-card__body">
                                            <p className="product-category">{product.category}</p>
                                            <h3>{product.name}</h3>
                                            <p>{product.shortDescription}</p>
                                            <div className="product-card__actions">
                                                <button type="button" className="text-link" onClick={() => setSelected(product)}>View detail <ArrowRight size={15} /></button>
                                                <label className={`compare-control ${checked ? "checked" : ""}`}><input type="checkbox" checked={checked} disabled={!checked && compare.length >= 3} onChange={() => toggleCompare(product)} /><span>{checked && <Check size={12} />}</span>Compare</label>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    ) : <div className="empty-state"><Search size={28} /><h3>No matching products</h3><p>Try a different search term or category.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory("All Products"); }}>Reset catalogue</button></div>}

                    {compare.length > 0 && (
                        <Reveal className="comparison-panel">
                            <div className="comparison-panel__header"><div><p className="section-eyebrow"><span />Comparison</p><h3>Actual available fields only.</h3></div><button type="button" className="text-link" onClick={() => setCompare([])}>Clear</button></div>
                            <div className="comparison-grid">
                                {compare.map((product) => <article key={product.id}><p className="product-category">{product.category}</p><h4>{product.name}</h4><p>{product.shortDescription}</p>{product.applications && <div><strong>Applications</strong><p>{product.applications.join(", ")}</p></div>}<button type="button" className="text-link" onClick={() => setSelected(product)}>View detail</button></article>)}
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>
            <ProductDialog product={selected} onClose={() => setSelected(null)} />
        </SiteLayout>
    );
}
