/**
 * Class DAO, CRUD interface implementation 
 */


class DAO {
    constructor(handle) {
        this.handle = handle;
        this.data = undefined;
        this.maxID = undefined;
    }

    async create(data) {
        try {
            const response = await fetch(this.handle, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return {
                    status: "error",
                    code: response.status,
                    text: response.statusText,
                };
            }

            this.maxID++;
            data.id = this.maxID;
            console.log(data);
            this.data.push(data);

            return {
                status: "ok",
                code: response.status,
                text: response.statusText,
            };
        } catch (error) {
            return {
                status: "error",
                code: error.name || error,
                text: error.message || error,
            };
        }
    }

    async read(id=undefined) {

        try {
            const response = await fetch(this.handle + (id !== undefined ? `/${id}` : ""), {
                method: "GET",
            });

            if (!response.ok) {
                return {
                    status: "error",
                    code: response.status,
                    text: response.statusText,
                };
            }

            const data = await response.json();

            return {
                status: "ok",
                code: response.status,
                text: response.statusText,
                data: data,
            }

        } catch (error) {
            return {
                status: "error",
                code: error.name || error,
                text: error.message || error,
            };
        }
    }

    async update(data) {
        try {

            const id = data.id > 100 ? 1 : data.id;

            const response = await fetch(this.handle + `/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return {
                    status: "error",
                    code: response.status,
                    text: response.statusText,
                };
            }

            console.log(data);

            for (let index = 0; index < this.data.length; index++) {
                if (this.data[index].id === data.id) {
                    this.data[index].title = data.title;
                    this.data[index].body = data.body;
                }
            }

            return {
                status: "ok",
                code: response.status,
                text: response.statusText,
            };

        } catch (error) {
            return {
                status: "error",
                code: error.name || error,
                text: error.message || error,
            };
        }
    }

    async delete(data) {
        try {
            const response = await fetch(this.handle + `/${data.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                return {
                    status: "error",
                    code: response.status,
                    text: response.statusText,
                };
            }

            const post = document.dao.data.find((item) => item.id === data.id);
            this.data.splice(this.data.indexOf(post), 1);

            return {
                status: "ok",
                code: response.status,
                text: response.statusText,
            };
            
        } catch (error) {
            return {
                status: "error",
                code: error.name || error,
                text: error.message || error,
            };
        }
    }

    async init() {
        const result = await this.read(); 
        this.data = result.data;
        this.maxID = Math.max(...this.data.map(item => item.id));
        return result;
    }
}