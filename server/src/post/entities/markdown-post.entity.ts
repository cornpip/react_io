import { 
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { PostImage } from './post-image.entity';

@Entity()
export class MarkdownPost { //mysql에는 markdown_post 로 들어간다.
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    featureTitle: string

    @Column({ unique : true})
    mdName: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @OneToMany(() => PostImage, (image) => image.post)
    images: PostImage[]
}
