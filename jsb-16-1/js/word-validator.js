/**
 * Widget WordValidator
 */

class WordValidator {
    constructor(parent) {
        this.parent = parent;
        this.element = templateEngine(wordValidatorTemplate);
        
        this.input = this.element.querySelector(".word-validator__input");
        this.result = this.element.querySelector(".word-validator__results");

        this.yaApi = new YandexApi(YANDEX_API_KEY);

        this.onChange = this.onChange.bind(this);
        this.onLinkClick = this.onLinkClick.bind(this);

        this.input.addEventListener("change", this.onChange);
        this.element.addEventListener("click", this.onLinkClick, true);
        
        this.parent.appendChild(this.element);
    }

    clearResult() {
        this.result.replaceChildren();
    }

    appendResult(templateNode, textContent) {
        const newResult = templateEngine(templateNode);
        newResult.textContent = textContent;
        this.result.appendChild(newResult);
    }

    collectWords(data_node) {
        let words = []; 
        
        for (const tr of data_node.tr) {
            words.push(tr.text);
            for (const syn of tr.syn) {
                words.push(syn.text);
            }
        }

        return words;
    }

    changeWord(word) {
        this.input.value = word;
        const changeEvent = new Event("change");
        this.input.dispatchEvent(changeEvent);
    }

    onLinkClick(event) {
        const target = event.target;

        if (!target.classList.contains("word-validator__link")) return;

        event.stopPropagation();
        event.preventDefault();

        this.changeWord(target.textContent);
    }

    onChange(event) {
        this.yaApi.post(this.input.value).then(result => {

            console.log(result);
            this.clearResult();

            if (result.status !== "ok") {
                this.appendResult(
                    wordValidatorErrorResultTemplate,
                    "Ошибка: " + result.data.message,
                );
                return;
            }

            if (result.data.def.length === 0) {
                this.appendResult(
                    wordValidatorErrorResultTemplate,
                    "Нет такого слова",
                );
                return;
            }

            result.data.def.forEach(word => {
                
                this.appendResult(
                    wordValidatorResultTemplate,
                    "Часть речи - " + word.pos,
                );
                
                this.appendResult(
                    wordValidatorResultTemplate,
                    "Похожие слова: ",
                );

                const otherWords = this.collectWords(word);

                otherWords.forEach(link => {
                    this.appendResult(
                        wordValidatorLinkResultTemplate,
                        link,
                    );
                })

            });

        });
    }
}

