class Users {

    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        let person = {
            id,
            name,
            room
        }
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        let person = this.people.find(person => person.id === id);
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeoplebyRoom(room){
        let people = this.people.filter(person=> person.room === room );
        return people;
    }

    removePerson(id) {
        let person = this.getPerson(id);
        this.people = this.people.filter(person => person.id !== id);
        return person;
    }

}



module.exports = {
    Users
}