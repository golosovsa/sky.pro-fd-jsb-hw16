/**
 * Yandex api helper class
 */

const YA_API_HANDLE = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";

const YA_API_STATUS_OK = {
    200: "Операция выполнена успешно.",
};

const YA_API_STATUS_ERROR = {
    401: "Ключ API невалиден.",
    402: "Ключ API заблокирован.",
    403: "Превышено суточное ограничение на количество запросов.",
    413: "Превышен максимальный размер текста.",
    501: "Заданное направление перевода не поддерживается.",
};

const YA_API_FLAGS = {
    FAMILY: 0x0001,
    SHORT_POS: 0x0002,
    MORPHO: 0x0004,
    POS_FILTER: 0x0008,
};

const YA_API_FLAGS_DESC = {
    0x0001: "Cемейный фильтр",
    0x0002: "Отображать названия частей речи в краткой форме",
    0x0004: "поиск по форме слова",
    0x0008: "Фильтровать по соответствию частей речи искомого слова и перевода",
};

class YandexApi {
    constructor(apiKey, lang="ru-ru") {
        this.apiKey = apiKey;
        this.lang = lang;
    }

    async get(word, ui="ru", flags=0x0000) {
        try {

            const params = new URLSearchParams({
                key: this.apiKey,
                lang: this.lang,
                text: word,
                ui: ui,
                flags: flags.toString(),
            });

            const response = await fetch(YA_API_HANDLE + "?" + params.toString(), {
                method: "GET",
            });

            const data = await response.json();

            return {
                status: "ok",
                data: data,
            };

        } catch (error) {
            return {
                status: "error",
                data: error,
            };
        }
    }

    async post(word, ui="ru", flags=0x0000) {
        try {
            
            const params = new URLSearchParams({
                key: this.apiKey,
                lang: this.lang,
                text: word,
                ui: ui,
                flags: flags.toString(),
            });

            const response = await fetch(YA_API_HANDLE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: params,
            });

            const data = await response.json();

            return {
                status: response.status === 200 ? "ok" : "error",
                data: data,
            };

        } catch (error) {
            return {
                status: "error",
                data: {
                    code: null,
                    message: error.toString(),
                },
            };
        }
    }
};