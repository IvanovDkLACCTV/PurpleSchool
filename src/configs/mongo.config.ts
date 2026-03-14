// mongo.config.ts
import { ConfigService } from "@nestjs/config"
import { MongooseModuleOptions } from "@nestjs/mongoose"

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        // больше ничего не нужно
    }
}
const getMongoString = (configService: ConfigService) => 
  'mongodb://' + 
  configService.get('MONGO_LOGIN') + ':' +
  configService.get('MONGO_PASSWORD') + '@' +
  configService.get('MONGO_HOST') + ':' +
  configService.get('MONGO_PORT') + '/' +
  configService.get('MONGO_DATABASE') +    // имя рабочей БД
  '?authSource=' + 
  configService.get('MONGO_AUTHDATABASE'); // admin