const mockingoose = require('mockingoose');
import  Message  from '../../src/model/Message';
import { MessageService } from '../../src/service/MessageService';

describe('MessageService', () => {
    const fakeUserId = '507f191e810c19729de860ea';

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should fetch all messages for a user', async () => {
        const fakeMessages = [{
            _id: '1',
            sender: fakeUserId,
            receiver: 'user2',
            content: 'Hello',
            adId: { _id: 'ad1', title: 'Super Ad' },
            read: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }];

        mockingoose(Message).toReturn(fakeMessages, 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(200);
        expect(Array.isArray(result.data)).toBe(true);
        if (Array.isArray(result.data)) {
            expect(result.data.length).toBe(1);
            expect(result.data[0].content).toBe('Hello');
        }
    });

    it('should return 404 when no messages are found', async () => {
        mockingoose(Message).toReturn([], 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(404);
        expect(result.data).toEqual({error: "Nie znaleziono wiadomości"});
    });

    it('should return 500 on fetch error', async () => {
        mockingoose(Message).toReturn(new Error('DB error'), 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(500);
        expect(result.data).toEqual({error: "Nie udało się pobrać wiadomości"});
    });

   
});