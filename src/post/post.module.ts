import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './controller/post.controller';
import { PostSchema } from './models/post.model';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './service/post.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
