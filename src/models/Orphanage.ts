import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

     //Um orfanato a muitas imagens[]
    @OneToMany(() => Image, image => image.orphanage, {
        //a cada cadastro ou alteração atualiza.
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id'})
    images: Image[];
}