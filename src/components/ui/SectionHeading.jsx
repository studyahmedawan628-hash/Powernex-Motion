export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
    return (
        <div className={`section-heading section-heading--${align} ${light ? "section-heading--light" : ""}`}>
            <p className="section-eyebrow"><span />{eyebrow}</p>
            <h2>{title}</h2>
            {description && <p className="section-heading__copy">{description}</p>}
        </div>
    );
}
