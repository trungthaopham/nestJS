import { Module } from '@nestjs/common';

// Modules
import { HttpModule } from '@nestjs/axios';

// Components
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [HttpModule],
  providers: [JwtService],
  controllers: [],
  exports: [JwtService],
})
export class AuthModule {}
