import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

class CallForwardNoReplyDto {
  @ApiProperty({ description: 'Is call forwarding provisioned?' })
  provisioned: boolean;

  @ApiProperty({ description: 'Destination for call forwarding' })
  destination: string;
}

enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class CreateSubscriberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phoneNumber' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'domain' })
  domain: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: StatusEnum, description: 'status' })
  @IsEnum(StatusEnum)
  status: string;

  @IsNotEmpty()
  @IsObject()
  @ApiPropertyOptional({
    type: CallForwardNoReplyDto,
    example: {
      callForwardNoReply: {
        provisioned: true,
        destination: 'tel:+18675182800',
      },
    },
    description: 'Call forwarding settings for the user',
  })
  features: {
    callForwardNoReply: CallForwardNoReplyDto;
  };
}
