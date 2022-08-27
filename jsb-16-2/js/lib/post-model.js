class PostModel {
    constructor(title, body) {
        this.title = title;
        this.body = body;

        this.id = 0;
        this.userId = 1;
    }

    fromData(data) {
        this.title = data.title;
        this.body = data.body;

        this.id = data.id;
        this.userId = data.userId;
    }
}