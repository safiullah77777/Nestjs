import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';

@Controller('mail')
export class MailController {
    constructor(private mailerService: MailerService){}

}
