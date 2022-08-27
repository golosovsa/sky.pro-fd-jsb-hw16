class Pages {
    constructor(parent, postID=undefined) {
        this.parent = parent;
        this.startPagePostID = postID;
        this.element = templateEngine(pageTemplate); 

        this.title = this.element.querySelector(".page__title");
        this.postsLink = this.element.querySelector(".page__nav-link_posts-list");
        this.main = this.element.querySelector(".page__main");
        this.footer = this.element.querySelector(".page__footer");
        this.postsLinksButton = this.element.querySelector(".page__nav-link_posts-list");

        this.dao = new DAO("https://jsonplaceholder.typicode.com/posts");
        this.data = undefined;
        this.maxID = undefined;

        this.dao.read().then(result => this.onLoad(result.data));
        
        this.parent.appendChild(this.element);

        this.onAddPost = this.onAddPost.bind(this);
        this.onMainClick = this.onMainClick.bind(this);
        this.onPostsLinksClick = this.onPostsLinksClick.bind(this);

        this.postsLinksButton.addEventListener("click", this.onPostsLinksClick)

        this.postForm = new PostForm(this.footer, undefined, this.onAddPost);
    }

    onPostsLinksClick(event) {
        this.showPostsList();
        this.postForm.clear();
    }

    onMainClick(event) {
        const target = event.target;

        if (target.classList.contains("post_short") || 
            (target.classList.contains("post__title") && target.parentElement.classList.contains("post_short"))) {
            const id = Number(target.dataset.id) || Number(target.parentElement.dataset.id);

            this.showPost(id);
            return;
        }


        if (target.classList.contains("post__button_delete") || target.parentElement.classList.contains("post__button_delete")) {
            const id = Number(target.parentElement.dataset.id) || Number(target.parentElement.parentElement.dataset.id);
            const post = this.data.find((item) => item.id === id);

            const confirm = new Confirm(target);
            return

            this.dao.delete(post).then(result => {
                if (result.status !== "ok") {
                    const popup = new Popup(
                        this.element, 
                        `(${result.code}) ${result.text}`, 
                        {left: "0", bottom: "200px", },
                        3000,
                    );

                    return;
                }

                this.data.splice(this.data.indexOf(post), 1);

                this.showPostsList();
                this.postForm.clear();
            });
        }
    }

    onAddPost(data) {
        this.dao.create(data).then(result =>  {
            if (result.status !== "ok") {
                const popup = new Popup(
                    this.element, 
                    `(${result.code}) ${result.text}`, 
                    {left: "0", bottom: "200px", },
                    3000,
                );
                return;
            }

            this.maxID++;
            data.id = this.maxID;

            this.data.push(data);
            this.showPostsList();
            this.postForm.clear();
        });
    }

    showPostsList() {
        this.title.textContent = "Posts list";
        this.postsLink.disabled = true;
        this.main.replaceChildren();
        for (const post of this.data) {
            const elementPost = new ShortPost(this.main, post)
        }

        this.main.addEventListener("click", this.onMainClick, true);
    }

    showPost(id) {
        const post = this.data.find((item) => item.id === id);
        if (!post) return false;
        this.title.textContent = "Post detail";
        this.postsLink.disabled = false;
        this.main.replaceChildren();
        const elementPost = new DetailedPost(this.main, post);

        this.main.removeEventListener("click", this.onMainClick, true);

        return true;
    }

    onLoad(data) {
        this.data = data;
        this.maxID = Math.max(...this.data.map(item => item.id));

        if (this.startPagePostID === undefined) {
            this.showPostsList();
            return;
        }

        if (!this.showPost(this.startPagePostID)) {
            this.showPostsList();
        }
    }
}