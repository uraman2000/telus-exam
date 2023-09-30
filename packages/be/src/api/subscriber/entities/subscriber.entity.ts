import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Subscriber {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  phoneNumber: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  domain: string;

  @Column()
  status: string;

  @Column()
  features: {
    callForwardNoReply: {
      provisioned: boolean;
      destination: string;
    };
  };
}
