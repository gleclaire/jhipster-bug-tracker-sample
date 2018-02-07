import { BaseEntity, User } from './../../shared';

export class Ticket implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public dueDate?: any,
        public done?: boolean,
        public project?: BaseEntity,
        public assignedTo?: User,
        public labels?: BaseEntity[],
    ) {
        this.done = false;
    }
}
