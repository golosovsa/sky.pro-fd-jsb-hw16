class Confirm {
    constructor(neighbor) {
        this.parent = neighbor.parentElement;
        this.neighbor = neighbor;

        this.element = templateEngine(confirmTemplate);

        const neighborPos = this.neighbor.getBoundingClientRect();
        const elementPos = this.element.getBoundingClientRect();

        const inlineStyle = `right: 60px; top: ${neighborPos.y + (neighborPos.height - 40) / 2}px;`;
        this.element.style = inlineStyle;

        this.parent.appendChild(this.element);
    }
}