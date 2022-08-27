const postFormTemplate = {
    tag: "form",
    cls: ["post-form__form", "post-form__form_add-post", ],
    attrs: {
        method: "GET",
        action: "#",
        novalidate: true,
    },
    content: [
        {
            tag: "label",
            cls: ["post-form__label", ],
            content: [
                "title",
                {
                    tag: "input",
                    cls: ["post-form__input", "post-form__input_text", "post-form__input_title", ],
                    attrs: {
                        type: "text",
                        placeholder: "your title",
                        required: true,
                        name: "title",
                    },
                },
            ],
        },
        {
            tag: "label",
            cls: ["post-form__label", ],
            content: [
                "body",
                {
                    tag: "textarea",
                    cls: ["post-form__input", "post-form__input_textarea", "post-form__input_body", ],
                    attrs: {
                        type: "text",
                        placeholder: "your post",
                        required: true,
                        name: "body",
                    },
                },
            ],
        },
        {
            tag: "input",
            cls: ["post-form__input", "post-form__input_button", "post-form__input_submit", ],
            attrs: {
                type: "submit",
                value: "Publish"
            },
        },
    ],
}