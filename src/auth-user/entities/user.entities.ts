import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({ description: "User login", nullable: false })
    login: number;

    @ApiProperty({ description: "User password", nullable: false })
    password: number;
}