/**
 * Class DAO, CRUD interface implementation 
 */


class DAO {
    constructor(handle) {
        this.handle = handle;
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

            const response = await fetch(this.handle + `/${data.id}`, {
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
}