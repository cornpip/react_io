import{
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm'
import { MarkdownPost } from './markdown-post.entity'

@Entity()
export class PostImage{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => MarkdownPost, (post) => post.id)
    post: MarkdownPost //default post_reference colum 붙는다

    @Column()
    imageName: string
}