// Added trip.js (BME 2/15/2025)
export interface Trip {
    _id: string, // Internal primary key in MongoDB (BME 2/15/2025)
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}