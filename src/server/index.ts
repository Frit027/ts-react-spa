import { createServer, Response } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';
import { users, data } from './db';

/**
 * Fake-сервер, предоставляющий API для GET- и POST-запросов
 */
export const makeServer = () => createServer({
    routes() {
        this.get('/api/data', () => ({ data }));

        this.post('/api/login', (schema, request) => {
            const { login, password } = JSON.parse(request.requestBody);
            const user = users.find((u) => u.login === login);

            if (user && user.password === password) {
                return { token: uuidv4() };
            }

            return new Response(401, {}, 'Неверный логин или пароль.');
        });
    },
});
