import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ResponsivasModule } from './responsivas/responsivas.module';
import { CommonModule } from './common/common.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-responsivas'),


    ResponsivasModule,


    CommonModule
  ],

})
export class AppModule {}


