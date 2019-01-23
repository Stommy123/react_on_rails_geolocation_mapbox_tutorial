# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or find_or_create_byd alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.find_or_create_by([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.find_or_create_by(name: 'Luke', movie: movies.first)

User.create(email: 'tommy@tommy.com', password: 'password', password_confirmation: 'password')
places = [
  ['Zuma', '270 Biscayne Blvd Way', 'Miami', 'FL', false],
  ['Prime 112', '112 Ocean Dr', 'Miami Beach', 'FL', false],
  ["Joe's Stone Crab", '11 Washington Ave', 'Miami Beach', 'FL', false],
  ['Edge Steak and Bar', '270 Biscayne Blvd Way', 'Miami', 'FL', false],
  ['Hillstone', '201 Miracle Mile', 'Coral Gables', 'FL', false],
  ['BLackbird Ordinary', '729 SW 1st Ave', 'Miami', 'FL', true],
  ['Employees Only', '1030 Washington Ave', 'Miami Beach', 'FL', true],
  ['The Broken Shaker', 'Indian Creek Dr', 'Miami Beach', 'FL', true],
  ['Per Se', '10 Columbus Cir', 'New York', 'NY', false],
  ['Le Bernadin', '155 W 51st ST', 'New York', 'NY', false],
  ['The Dead Rabbit', '30 Water St', 'New York', 'NY', true]

]
places.each do |name, street, city, state, bar|
  Place.find_or_create_by(name: name, street: street, city: city, state: state, bar: bar, user_id: User.last.id)
  sleep 1
end 

