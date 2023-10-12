const USERS = [

    { id: 'U1', name: 'Jonn Doe', email: 'jonndoe@gmail.com', passcode: 'Tester', image: `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`, places: 3},

    { id: 'U2', name: 'Jane Doe', email: 'janedoe@hotmail.com', passcode: 'Tester123', image: `https://img.freepik.com/free-photo/cheerful-dark-skinned-woman-smiling-broadly-rejoicing-her-victory-competition-among-young-writers-standing-isolated-against-grey-wall-people-success-youth-happiness-concept_273609-1246.jpg` , places: 4 }


]

let PLACES = [

    {  
        id: 'p1',
        title: 'Empire State Building',
        details: 'One of the most famous sky scrapers in the world!',
        image: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg`,
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        author: 'U1'
    },

    {
        id: 'p2',
        title: 'Empire State Building',
        details: 'One of the most famous sky scrapers in the world!',
        image: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg`,
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        author: 'U2'
    }
]

module.exports = { USERS, PLACES }