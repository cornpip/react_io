import { 
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class MarkdownPost { //mysql에는 markdown_post 로 들어간다.
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    featureTitle: string

    @Column({ unique : true})
    mdPath: string

    @Column({ nullable : true})
    imagePath: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
