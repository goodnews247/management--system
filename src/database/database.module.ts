/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[ TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        useFactory:(configService: ConfigService)=>({
            type: `postgres`,
            port: configService.get<number>(`PORT`),
            host: configService.get(`HOST`),
            username: 'postgres',
            password: '0108159030',
            database: 'management-system',
            synchronize: true,
            autoLoadEntities: true,
        }),
        inject: [ConfigService],
    }),
]
})
export class DatabaseModule {}
