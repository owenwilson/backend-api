import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private UsersRepository: UsersRepository,
	private encoderService: EncoderService,
    ) {}

    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
	const { name, email, password } = registerUserDto;
	const hashedPassword = await this.encoderService.encodePassword(password);
        return this.UsersRepository.createUser(name, email, hashedPassword);
    }
}
