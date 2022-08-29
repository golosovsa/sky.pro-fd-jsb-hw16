class Pages {
    constructor(parent, postID=undefined) {
        this.parent = parent;
        this.element = templateEngine(pageTemplate); 

        this.title = this.element.querySelector(".page__title");
        this.postsLink = this.element.querySelector(".page__nav-link_posts-list");
        this.main = this.element.querySelector(".page__main");
        this.footer = this.element.querySelector(".page__footer");
        this.postsLinksButton = this.element.querySelector(".page__nav-link_posts-list");
        
        this.parent.appendChild(this.element);

        this.onAddPost = this.onAddPost.bind(this);
        this.onPostsLinksClick = this.onPostsLinksClick.bind(this);
        this.showPost = this.showPost.bind(this);
        this.showPostsList = this.showPostsList.bind(this);

        this.postsLinksButton.addEventListener("click", this.onPostsLinksClick)

        this.postForm = new PostForm(this.footer, undefined, this.onAddPost);

        if (postID === undefined) {
            this.showPostsList();
            return;
        }

        if (!this.showPost(postID)) {
            this.showPostsList();
        }
    }

    onPostsLinksClick(event) {
        this.showPostsList();
        this.postForm.clear();
    }

    onAddPost(data) {
        const post = document.dao.data.find((item) => item.id === data.id);

        if (post === undefined) {
            document.dao.create(data).then(result =>  {
                if (result.status !== "ok") {
                    const popup = new Popup(
                        this.element, 
                        `(${result.code}) ${result.text}`, 
                        {left: "0", bottom: "200px", },
                        3000,
                    );
                    console.error("DAO create error", data, result);
                    return;
                }

                this.showPostsList();
                this.postForm.clear();
            });

            return;
        }

        document.dao.update(data).then(result => {

            if (result.status !== "ok") {
                const popup = new Popup(
                    this.element, 
                    `(${result.code}) ${result.text}`, 
                    {left: "0", bottom: "200px", },
                    3000,
                );
                console.error("DAO create error", data, result);
                return;
            }

            this.showPostsList();
            this.postForm.clear();

        });
    }

    showPostsList() {
        this.title.textContent = "Posts list";
        this.postsLink.disabled = true;
        this.main.replaceChildren();
        for (const post of document.dao.data) {
            const elementPost = new ShortPost(this.main, post, this.showPost, this.showPostsList);
        }
        this.postForm.clear();
    }

    showPost(id) {
        const post = document.dao.data.find((item) => item.id === id);
        if (!post) return false;
        this.title.textContent = "Post detail";
        this.postsLink.disabled = false;
        this.main.replaceChildren();
        const elementPost = new DetailedPost(this.main, post, this.showPostsList);
        this.postForm.show(post);
        return true;
    }
}