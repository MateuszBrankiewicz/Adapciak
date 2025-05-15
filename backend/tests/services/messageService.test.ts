import mongoose from 'mongoose';
import Message, { IMessage } from '../../src/model/Message';
import { MessageService } from '../../src/service/MessageService';
const mockingoose = require('mockingoose');

describe('MessageService', () => {
    const fakeUserId = '507f191e810c19729de860ea';
    const mockReceiverId = new mongoose.Types.ObjectId();
    const mockAdId = new mongoose.Types.ObjectId();

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should fetch all messages for a user', async () => {
        const fakeMessages = [
            {
                _id: new mongoose.Types.ObjectId(),
                sender: { _id: fakeUserId, name: 'Jan' },
                receiver: { _id: mockReceiverId, name: 'Anna' },
                adId: { _id: mockAdId, title: 'Ogłoszenie 1' },
                content: 'Hello',
                read: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new mongoose.Types.ObjectId(),
                sender: { _id: mockReceiverId, name: 'Anna' },
                receiver: { _id: fakeUserId, name: 'Jan' },
                adId: { _id: mockAdId, title: 'Ogłoszenie 1' },
                content: 'Hi',
                read: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        mockingoose(Message).toReturn(fakeMessages, 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(200);
        expect(Array.isArray(result.data)).toBe(true);
        if (Array.isArray(result.data)) {
            expect(result.data.length).toBe(2);
            expect(result.data[0].content).toBe('Hello');
        }
    });

    it('should return 404 when no messages are found', async () => {
        mockingoose(Message).toReturn([], 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(404);
        expect(result.data).toEqual({ error: 'Nie znaleziono wiadomości' });
    });

    it('should return 500 on fetch error', async () => {
        mockingoose(Message).toReturn(new Error('DB error'), 'find');

        const result = await MessageService.fetchAllMessages(fakeUserId);
        expect(result.status).toBe(500);
        expect(result.data).toEqual({ error: 'Nie udało się pobrać wiadomości' });
    });

    it('should return 201 on successful message creation', async () => {
        const fakeMessage = {
            sender: fakeUserId,
            receiver: mockReceiverId,
            content: 'Hello',
            adId: mockAdId
        };

        const savedMessage = {
            _id: new mongoose.Types.ObjectId(),
            sender: { _id: fakeUserId, name: 'Jan' },
            receiver: { _id: mockReceiverId, name: 'Anna' },
            adId: { _id: mockAdId, title: 'Ogłoszenie 1' },
            content: 'Hello',
            read: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(Message).toReturn(savedMessage, 'save');

        const result = await MessageService.createMessage(fakeMessage as unknown as IMessage, fakeUserId);

        expect(result.status).toBe(201);
        expect(result.message).toEqual("Wiadomosc wyslana");
    });
});
