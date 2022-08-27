/**
 * Classes ShortPost, DetailedPost
 */


class ShortPost {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;

        this.element = templateEngine(shortPostTemplate);
        this.element.dataset.id = data.id;

        this.title = this.element.querySelector(".post__title");
        this.title.textContent = this.data.title;

        this.parent.appendChild(this.element);
    }
}

class DetailedPost {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;

        this.element = templateEngine(detailedPostTemplate);

        this.title = this.element.querySelector(".post__title");
        this.title.textContent = this.data.title;

        this.body = this.element.querySelector(".post__body");
        this.body.textContent = data.body;

        this.parent.appendChild(this.element);
    }
}