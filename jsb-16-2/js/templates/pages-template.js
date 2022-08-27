const pageTemplate = {
    tag: "div",
    cls: ["page"],
    content: [
        {
            tag: "header",
            cls: ["page__header"],
            content: [
                {
                    tag: "h1",
                    cls: ["page__title"],
                    content: ["Page Title"],
                },
                {
                    tag: "nav",
                    cls: ["page__nav"],
                    content: [
                        {
                            tag: "button",
                            cls: ["page__nav-link", "page__nav-link_posts-list", ],
                            attrs: {
                                href: "#posts-list",
                            },
                            content: ["Список постов"],
                        },
                    ],
                },
            ],
        },
        {
            tag: "main",
            cls: ["page__main", ],
        },
        {
            tag: "footer",
            cls: ["page__footer", ],
        },
    ],
}