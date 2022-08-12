import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './controller/post.controller';
import { PostSchema } from './models/post.model';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './service/post.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PostController);
  }
}
