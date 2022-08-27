const ERRORS = {
    title: {
        valueMissing: "Надо что-то написать в заголовке!",
    },

    body: {
        valueMissing: "Надо что-то написать в сообщении!",
    },
}

class PostForm {
    constructor(parent, data=undefined, submitCallback=undefined) {
        this.parent = parent;
        this.data = data === undefined ? new PostModel("", "") : new PostModel("", "").fromData(data);
        this.submitCallback = submitCallback;

        this.element = templateEngine(postFormTemplate);

        this.title = this.element.querySelector(".post-form__input_title");
        this.body = this.element.querySelector(".post-form__input_body");
        this.submit = this.element.querySelector(".post-form__input_submit");

        this.onSubmit = this.onSubmit.bind(this);

        this.element.addEventListener("submit", this.onSubmit)

        this.parent.appendChild(this.element);
    }

    onSubmit(event) {
        event.preventDefault();

        const error = validateForm(this.element);

        this.title.disabled = true;
        this.body.disabled = true;
        this.submit.disabled = true;

        if (error !== undefined) {
            error.element.classList.add("post-form__input_error");
            
            const message = ERRORS[error.element.name][error.errorCode] || "Неизвестная ошибка";

            const popup = new Popup(
                error.element.parentElement, 
                message, 
                {left: "0", bottom: "200px", },
                3000,
            );

            return;
        }

        this.data.title = this.title.value;
        this.data.body = this.body.value;

        if (this.submitCallback !== undefined) {
            this.submitCallback(this.data);
        }
    }

    clear() {
        
        this.title.classList.remove("post-form__input_error");
        this.title.value = "";
        this.body.classList.remove("post-form__input_error");
        this.body.value = "";
        this.title.disabled = false;
        this.body.disabled = false;
        this.submit.disabled = false;
    }
}