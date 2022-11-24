const mongoose = require('mongoose')
const process = require('process');

const initDb = () => {
  const password = process.argv[2]
  const url = `mongodb+srv://photoman:${password}@cluster0.ecufs.mongodb.net/phonebook-app`
  mongoose.connect(url)
}

const personCreateSchema = () =>{
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  return Person = mongoose.model('Person', personSchema)
}

const personAdd = (Person, name, password) => {
 
  const person = new Person({
    name: name,
    number: password
  })
  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

const personAll = (Person) => {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}else if (process.argv.length == 3) {
  initDb()
  const person = personCreateSchema()
  personAll(person)
}else if(process.argv.length == 5){
  initDb()
  const person = personCreateSchema()

  const name = process.argv[3]
  const password = process.argv[4]
  personAdd(person, name, password)
}else{
  console.log('Please the parameters valids are <password> <name> <number>')
  process.exit(1)
}