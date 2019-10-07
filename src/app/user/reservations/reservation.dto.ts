export class ReservationDto {
    constructor(
        public id: number,
        public date: string,
        public starttime: string,
        public endtime: string,
        public description: string,
        public email: string,
        public status: string
    ) {}
}