import { MailerService } from "@nestjs-modules/mailer";

export class EmailService {
    constructor(private mailerService: MailerService){}
    sendMail(){
        
    }
}