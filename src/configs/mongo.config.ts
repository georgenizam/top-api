import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};

const getMongoString = (configService: ConfigService): string => {
    const login = configService.get('MONGO_LOGIN');
    const password = configService.get('MONGO_PASSWORD');
    const host = configService.get('MONGO_HOST');
    const port = configService.get('MONGO_PORT');
    const dbName = configService.get('MONGO_AUTH_DATABASE');

    return `mongodb://${login}:${password}@${host}:${port}/${dbName}`;
};

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
