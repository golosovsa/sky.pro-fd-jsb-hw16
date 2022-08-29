class Confirm {
    constructor(neighbor) {
        this.parent = neighbor.parentElement;
        this.neighbor = neighbor;
        this.onClickYesCallback = undefined;
        this.hidden = true;

        this.element = templateEngine(confirmTemplate);
        this.butYes = this.element.querySelector(".confirm__button_yes");
        this.butNo = this.element.querySelector(".confirm__button_no");

        const neighborPos = this.neighbor.getBoundingClientRect();
        const elementPos = this.element.getBoundingClientRect();

        this.hide = this.hide.bind(this);
        this.confirm = this.confirm.bind(this);

        this.butNo.addEventListener("click", this.hide);
        this.butYes.addEventListener("click", this.confirm)
    }

    hide(event=undefined) {
        if (this.hidden) return;
        this.hidden = true;
        this.parent.removeChild(this.element);
    }

    confirm(event) {
        this.hide();
        if (this.onClickYesCallback !== undefined) {
            this.onClickYesCallback();
        }
    }

    show(onClickYesCallback) {
        this.onClickYesCallback = onClickYesCallback;
        this.hide();
        this.hidden = false;

        const neighborPos = this.neighbor.getBoundingClientRect();
        const inlineStyle = `right: 60px; top: ${neighborPos.y + window.pageYOffset + (neighborPos.height - 40) / 2}px;`;
        this.element.style = inlineStyle;

        this.parent.appendChild(this.element);
    }
}