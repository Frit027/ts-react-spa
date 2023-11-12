import { createServer, Response } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

/**
 * Fake-сервер
 */
export const makeServer = () => createServer({
    routes() {
        this.post('/api/login', (schema, request) => {
            const { login, password } = JSON.parse(request.requestBody);
            const user = db.find((u) => u.login === login);

            if (user && user.password === password) {
                return { token: uuidv4() };
            }

            return new Response(401, {}, 'Ошибка авторизации');
        });
    },
});
