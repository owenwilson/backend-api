import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterUserDto } from './dto/register-user.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(
	    name: string,
	    email: string,
	    password: string
    ): Promise<void> {
        const user = this.create({ name, email, password});

        try {
            await this.save(user);
        } catch (e) {
            if(e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Este correo ya esta registrado');
            }
            throw new InternalServerErrorException();
        }        
    }
}
