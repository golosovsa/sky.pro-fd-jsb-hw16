const confirmTemplate = {
    tag: "div",
    cls: ["confirm", ], 
    content: [
        {
            tag: "p",
            cls: ["confirm__title", ],
            content: ["Точно?"],
        },
        {
            tag: "button",
            cls: ["confirm__button", "confirm__button_yes", ],
            content: ["Да"],
        },
        {
            tag: "button",
            cls: ["confirm__button", "confirm__button_no", ],
            content: ["Нет"],
        },
    ],
}