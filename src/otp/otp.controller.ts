import { Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
@Controller('otp')
export class OtpController {
    constructor(private otpService:OtpService){}
    @Post()
    createOtp (){
        
    }

}
