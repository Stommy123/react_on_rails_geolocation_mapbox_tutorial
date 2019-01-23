# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or find_or_create_byd alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.find_or_create_by([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.find_or_create_by(name: 'Luke', movie: movies.first)

Place.find_or_create_by(
  name: 'Zuma',
  street: '270 Biscayne Blvd Way',
  city: 'Miami',
  state: 'FL',
  user_id: 1
)
sleep 1
Place.find_or_create_by(
  name: 'Prime 112',
  street: '112 Ocean Dr',
  city: 'Miami Beach',
  state: 'FL',
  user_id: 1
)
sleep 1
Place.find_or_create_by(
  name: "Joe's Stone Crab",
  street: '11 Washington Ave',
  city: 'Miami Beach',
  state: 'FL',
  user_id: 1
)
sleep 1
Place.find_or_create_by(
  name: 'Hillstone',
  street: '201 Miracle Mile',
  city: 'Coral Gables',
  state: 'FL',
  user_id: 1
)
sleep 1 
Place.find_or_create_by(
  name: 'Wyncode',
  street: '549 NW 28th Street',
  city: 'Miami',
  state: 'FL',
  user_id: 1
)
