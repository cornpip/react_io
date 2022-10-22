import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Contents {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    md_path: string

    @Column()
    image_path: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
