import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy, IProfile, VerifyCallback } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(OIDCStrategy, 'azuread') {
  constructor(private readonly configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>('AZURE_AD_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('AZURE_AD_CLIENT_ID'),
      clientSecret: configService.get<string>('AZURE_AD_CLIENT_SECRET'),
      redirectUrl: configService.get<string>('AZURE_AD_REDIRECT_URI'),
      responseType: 'code',
      responseMode: 'form_post',
      scope: ['openid', 'profile', 'email'], // Puedes añadir más scopes según tus necesidades
      passReqToCallback: false,
    });
  }

  async validate(
    iss: string,
    sub: string,
    profile: IProfile,
    done: VerifyCallback,
  ): Promise<any> {
    if (!profile.oid) {
      return done(new UnauthorizedException(), false);
    }

    const user = {
      oid: profile.oid,
      email: profile._json.email || profile.upn,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      // Puedes extraer más información del profile según tus necesidades
    };

    return done(null, user);
  }
}
