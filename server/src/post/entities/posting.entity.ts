import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Posting {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    md_path: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
