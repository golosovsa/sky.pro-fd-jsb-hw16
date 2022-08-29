const shortPostTemplate = {
    tag: "div",
    cls: ["post", "post_short"],
    content: [
        {
            tag: "div",
            cls: ["post__data"],
            content: [
                {
                    tag: "p",
                    cls: ["post__title", ],
                },
            ],
        },
        {
            tag: "div",
            cls: ["post__button", "post__button_delete", ],
            content: [
                {
                    tag: "i",
                    cls: ["fa-solid", "fa-eraser", ],
                },
            ],
        },
    ],

};

const detailedPostTemplate = {
    tag: "div",
    cls: ["post", "post_detailed"],
    content: [
        {
            tag: "p",
            cls: ["post__title", ],
        },
        {
            tag: "p",
            cls: ["post__body", ],
        },
        {
            tag: "div",
            cls: ["post__button", "post__button_big", "post__button_delete", ],
            content: [
                {
                    tag: "i",
                    cls: ["fa-solid", "fa-eraser", ],
                },
            ],
        },
    ],
};
