document.addEventListener("DOMContentLoaded", () => {
    const yaApi = new YandexApi(YANDEX_API_KEY);

    wordValidator = new WordValidator(document.body);

    wordValidator.changeWord("Слово");
});