import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Seeder } from "./seeders/seeder";
import { SeederModule } from "./seeders/seeder.module";
import { config } from 'aws-sdk';

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const logger = appContext.get(Logger);
            const seeder = appContext.get(Seeder);
            config.update({
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_KEY_SECRET,
            });
            seeder
                .seed()
                .then(() => {
                    logger.debug('Seeding complete!');
                })
                .catch(error => {
                    logger.error('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();