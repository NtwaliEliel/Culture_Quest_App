import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ArtisansModule } from './modules/artisans/artisans.module';
import { StoriesModule } from './modules/stories/stories.module';
import { EventsModule } from './modules/events/events.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ContentModerationModule } from './modules/content-moderation/content-moderation.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ArtisansModule,
    StoriesModule,
    EventsModule,
    AnalyticsModule,
    ContentModerationModule,
    UserFeedbackModule,
  ],
})
export class AppModule {} 