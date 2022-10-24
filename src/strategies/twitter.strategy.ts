import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {

  constructor(private configService: ConfigService) {
    super({
      // clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      // clientSecret: configService.get<string>('GOOGLE_SECRET'),
      // callbackURL: 'http://localhost:3000/google/redirect',
      // scope: ['email', 'profile'],

      consumerKey: configService.get<string>('TWITTER_CONSUMER_KEY'),
      consumerSecret: configService.get<string>('TWITTER_CONSUMER_SECRET'),
      callbackURL: configService.get<string>('TWITTER_CALLBACK_URL'),
      passReqToCallback: true,
      includeEmail: true,
      skipExtendedUserProfile: false,
    });
  }

  validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) {
    const user: any = {
      id: profile.id,
      nick: profile.username,
      name: profile.displayName,
    };
    if (profile.emails) {
      user.email = profile.emails.shift().value;
    }
    if (profile.photos) {
      user.avatar = profile.photos.shift().value;
    }

    done(null, user);
  }
}