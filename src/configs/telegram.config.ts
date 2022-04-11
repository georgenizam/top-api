import { ITelegramOptions } from '../telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
    const token = configService.get('TELEGRAM_TOKEN');
    const chatId = configService.get('CHAT_ID') ?? '';
    if (!token) {
        throw new Error('TELEGRAM_TOKEN not found');
    }
    return {
        chatId,
        token,
    };
};
