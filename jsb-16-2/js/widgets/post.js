/**
 * Classes ShortPost, DetailedPost
 */


class ShortPost {
    constructor(parent, data, onShowDetailedPost, onShowShortPosts) {
        this.parent = parent;
        this.data = data;
        this.onShowDetailedPost = onShowDetailedPost;
        this.onShowShortPosts = onShowShortPosts;

        this.element = templateEngine(shortPostTemplate);
        this.element.dataset.id = data.id;

        this.postData = this.element.querySelector(".post__data");
        this.title = this.postData.querySelector(".post__title");
        this.buttonDelete = this.element.querySelector(".post__button_delete");

        this.title.textContent = this.data.title;

        this.onClick = this.onClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);

        this.postData.addEventListener("click", this.onClick);
        this.buttonDelete.addEventListener("click", this.onDeleteClick);

        this.confirm = new Confirm(this.buttonDelete); 

        this.parent.appendChild(this.element);
    }

    onClick(event) {
        event.preventDefault();
        const target = event.target;
        if (this.onShowDetailedPost !== undefined) {
            this.onShowDetailedPost(this.data.id);
        }
    }

    onDeleteClick(event) {

        this.confirm.show(() => {
            document.dao.delete(this.data).then(result => {
                if (result.status !== "ok") {
                    const popup = new Popup(
                        this.element, 
                        `(${result.code}) ${result.text}`, 
                        {left: "0", bottom: "200px", },
                        3000,
                    );
                    console.error("DAO delete error", this.data, result);
                    return;
                }
    
                if (this.onShowShortPosts !== undefined) {
                    this.onShowShortPosts();
                }
            });
        });
    }
}

class DetailedPost {
    constructor(parent, data, onShowShortPosts) {
        this.parent = parent;
        this.data = data;
        this.onShowShortPosts = onShowShortPosts;

        this.element = templateEngine(detailedPostTemplate);

        this.title = this.element.querySelector(".post__title");
        this.title.textContent = this.data.title;

        this.body = this.element.querySelector(".post__body");
        this.body.textContent = data.body;

        this.buttonDelete = this.element.querySelector(".post__button_delete");
        this.onDeleteClick = this.onDeleteClick.bind(this);

        this.buttonDelete.addEventListener("click", this.onDeleteClick);
        this.confirm = new Confirm(this.buttonDelete); 

        this.parent.appendChild(this.element);
    }

    onDeleteClick(event) {

        this.confirm.show(() => {
            document.dao.delete(this.data).then(result => {
                if (result.status !== "ok") {
                    const popup = new Popup(
                        this.element, 
                        `(${result.code}) ${result.text}`, 
                        {left: "0", bottom: "200px", },
                        3000,
                    );
                    console.error("DAO delete error", this.data, result);
                    return;
                }
    
                if (this.onShowShortPosts !== undefined) {
                    this.onShowShortPosts();
                }
            });
        });
    }
}