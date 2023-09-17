import { IsBoolean, IsString } from "class-validator";

export class choresSchema {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    createdBy: string;

    @IsString()
    assignedTo: string;

    @IsBoolean()
    completed: boolean;
}

// export class Chores {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//       length: 100,
//   })
//   name: string;

//   @Column("text")
//   description: string;

//   @Column()
//   createdBy: string;

//   @Column()
//   assignedTo: string;

//   @Column()
//   completed: boolean;

//   @ManyToOne(() => Users, users => users.id)
//   @JoinColumn()
//   user: Users;
// }
