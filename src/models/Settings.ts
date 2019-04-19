import { Column, Entity, PrimaryColumn } from 'typeorm';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

@Entity('settings')
export class Setting {
	@PrimaryColumn({ type: 'bigint' })
    guild!: string;

	@Column({ 'type': 'jsonb', 'default': (): string => '\'{}\'' })
	settings: any;
}
