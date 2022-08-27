const wordValidatorTemplate = {
    tag: "div",
    cls: ["word-validator", ],
    content: [
        {
            tag: "div",
            cls: ["word-validator__controls"],
            content: [
                {
                    tag: "input",
                    cls: ["word-validator__input", ],
                    attrs: {
                        type: "text", 
                    },
                },
            ],
        },
        {
            tag: "div",
            cls: ["word-validator__results"],
        },
    ],
}

const wordValidatorErrorResultTemplate = {
    tag: "p",
    cls: ["word-validator__text", "word-validator__text_error", ],
}

const wordValidatorResultTemplate = {
    tag: "p",
    cls: ["word-validator__text", ],
}

const wordValidatorLinkResultTemplate = {
    tag: "a",
    cls: ["word-validator__link", ],
    attrs: {
        href: "#",
    },
}
