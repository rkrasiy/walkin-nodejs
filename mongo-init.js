print('Start #################################################################');

// Create database
db = db.getSiblingDB('schedule-track');

// Validation Schema for 'users' collection
db.createCollection('managers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Manager',
      required: ['name', 'surname', 'password', 'email', 'state'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Manager Name',
          minLength: 4
        },
        surname: {
          bsonType: 'string',
          description: 'Manager Surname',
          minLength: 4
        },
        password: {
          bsonType: 'string',
          description: 'Password'
        },
        email: {
          bsonType: 'string',
          description: 'User email'
        },
        state: {
          bsonType: 'boolean',
          description: 'Manager state',
          default: true
        }
      }
    }
  }
});

// Add index for 'managers' collection
db.managers.createIndex({ email: 1 }, { unique: true });

// Validation Schema for 'users' collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'User',
      required: ['fullName', 'phone', 'email', 'state', 'notifications', 'created_on'],
      properties: {
        fullName: {
          bsonType: 'string',
          description: 'User full name',
          minLength: 8
        },
        phone: {
          bsonType: 'string',
          description: 'User phone',
          minLength: 9
        },
        email: {
          bsonType: 'string',
          description: 'User email'
        },
        state: {
          bsonType: 'boolean',
          description: 'User state',
          default: true
        },
        notifications: {
          bsonType: 'boolean',
          description: 'Receive notifications',
          default: true
        },
        created_on: {
          bsonType: 'Date',
          description: 'Date registration'
        },
      }
    }
  }
});

// Add index for 'users' collection
db.users.createIndex({ email: 1 }, { unique: true });

// Validation Schema for 'services' collection
db.createCollection('services', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Service',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Service Name',
          minLength: 2
        }
      }
    }
  }
});

// Add index for 'services' collection
db.services.createIndex({ name: 1 }, { unique: true });

// Validation Schema for 'quotes' collection
db.createCollection('quotes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Quote',
      required: ['_id'],
      properties: {
        _id: {
          bsonType: 'string',
          description: 'Quote Id',
          minLength: 2
        }
      }
    }
  }
});

// Add index for 'quotes' collection
db.quotes.createIndex({ _id: 1 }, { unique: true });

// Add superuser in 'users' collection
db.managers.insertMany([
  {
    email: 'admin@admin.es',
    // Default password: admin
    password: '$2a$12$npf89psKjdvqWscAMu89Tu6Ax3JruSFWZQrbVhSQXNAfxs9JE8SDe',
    name: 'Administrator',
    surname: 'Main',
    state: true
   }  
 ]);

 // Add users in 'users' collection
db.users.insertMany([{
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b2"
  },
  "fullName": "Glynn Randell",
  "phone": "448-453-0003",
  "email": "grandell0@howstuffworks.com",
  "notifications": true,
  "state": false,
  "created_on": {"$date":"2023-08-27T00:02:39.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b3"
  },
  "fullName": "Sherye Goodbanne",
  "phone": "961-670-7862",
  "email": "sgoodbanne1@sina.com.cn",
  "notifications": true,
  "state": false,
  "created_on": {"$date":"2024-05-01T08:54:32.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b4"
  },
  "fullName": "Jamaal Kester",
  "phone": "796-519-5430",
  "email": "jkester2@bloglines.com",
  "notifications": false,
  "state": true,
  "created_on": {"$date":"2023-07-21T18:25:22.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b5"
  },
  "fullName": "Becky McGarrahan",
  "phone": "217-690-4004",
  "email": "bmcgarrahan3@geocities.jp",
  "notifications": true,
  "state": true,
  "created_on": {"$date":"2024-01-16T11:46:45.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b6"
  },
  "fullName": "Siouxie Gockeler",
  "phone": "497-720-2595",
  "email": "sgockeler4@nbcnews.com",
  "notifications": false,
  "state": true,
  "created_on": {"$date":"2024-06-25T20:59:41.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b7"
  },
  "fullName": "Elset Jaksic",
  "phone": "771-345-6848",
  "email": "ejaksic5@netscape.com",
  "notifications": false,
  "state": true,
  "created_on": {"$date":"2024-05-09T22:01:02.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b8"
  },
  "fullName": "Olive Fewell",
  "phone": "251-822-6501",
  "email": "ofewell6@lulu.com",
  "notifications": true,
  "state": false,
  "created_on": {"$date":"2024-05-13T05:52:43.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345b9"
  },
  "fullName": "Dael Hof",
  "phone": "378-570-6134",
  "email": "dhof7@patch.com",
  "notifications": true,
  "state": false,
  "created_on": {"$date":"2023-11-12T11:21:58.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345ba"
  },
  "fullName": "Matthew Zorzin",
  "phone": "504-711-1336",
  "email": "mzorzin8@guardian.co.uk",
  "notifications": true,
  "state": true,
  "created_on": {"$date":"2023-09-21T20:37:39.000Z"}
}, {
  "_id": {
    "$oid": "6687bdf9fc13ae5b832345bb"
  },
  "fullName": "Lexi Hurring",
  "phone": "532-155-7197",
  "email": "lhurring9@weebly.com",
  "notifications": true,
  "state": true,
  "created_on": {"$date":"2024-03-20T16:24:31.000Z"}
}]);

 // Add services in 'services' collection
 db.services.insertMany([
  {  "_id": {
    "$oid": "6687bce1fc13ae5aa0234e22"
  },
    "name": "Quo Lux",
    "price": 152,
    "discount": 11,
    "duration": 29,
    "state": true,
    "create_on": {"$date":"2023-09-29T20:29:29.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e23"
    },
    "name": "Wrapsafe",
    "price": 58,
    "discount": 14,
    "duration": 72,
    "state": true,
    "create_on": {"$date":"2024-02-17T09:48:29.000Z"}
  }, {
    "_id": {
    "$oid": "6687bce1fc13ae5aa0234e24"
  },
    "name": "Alpha",
    "price": 98,
    "discount": 4,
    "duration": 22,
    "state": true,
    "create_on": {"$date":"2024-05-20T21:48:11.000Z"}
  }, {
    "_id": {
    "$oid": "6687bce1fc13ae5aa0234e25"
  },
    "name": "Veribet",
    "price": 62,
    "discount": 11,
    "duration": 21,
    "state": true,
    "create_on": {"$date":"2023-09-18T09:30:41.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e26"
    },
    "name": "Konklux",
    "price": 36,
    "discount": 11,
    "duration": 32,
    "state": false,
    "create_on": {"$date":"2023-11-09T07:16:00.000Z"}
  }, {
    "_id": {
    "$oid": "6687bce1fc13ae5aa0234e27"
  },
    "name": "Fix San",
    "price": 60,
    "discount": 7,
    "duration": 53,
    "state": true,
    "create_on": {"$date":"2023-12-07T13:03:56.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e28"
    },
    "name": "Bytecard",
    "price": 177,
    "discount": 11,
    "duration": 29,
    "state": false,
    "create_on": {"$date":"2024-03-11T04:12:09.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e29"
    },
    "name": "Domainer",
    "price": 162,
    "discount": 2,
    "duration": 83,
    "state": false,
    "create_on": {"$date":"2023-11-08T10:08:05.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e2a"
    },
    "name": "Fixflex",
    "price": 162,
    "discount": 1,
    "duration": 85,
    "state": true,
    "create_on": {"$date":"2024-06-23T19:12:33.000Z"}
  }, {
    "_id": {
      "$oid": "6687bce1fc13ae5aa0234e2b"
    },
    "name": "Mat Lam Tam",
    "price": 183,
    "discount": 3,
    "duration": 81,
    "state": false,
    "create_on": {"$date":"2023-12-27T23:32:39.000Z"}
  }
]);

// Add appointments in 'quotes' collection
db.quotes.insertMany([{
  "service": "6687bce1fc13ae5aa0234e2b",
  "user": "6687bdf9fc13ae5b832345bb",
  "start": {"$date":"2024-07-08T12:30:00.000Z"},
  "end": {"$date":"2024-07-08T12:50:00.000Z"},
  "confirmed": true,
  "confirmationToken": "ccea:3367:db3d:5440:3c37:81ac:c40:9e38/74",
  "created_on": {"$date":"2023-09-18T08:29:04.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e2a",
  "user": "6687bdf9fc13ae5b832345bb",
  "start": {"$date":"2024-07-07T15:30:00.000Z"},
  "end": {"$date":"2024-07-07T16:00:00.000Z"},
  "confirmed": false,
  "confirmationToken": "8f28:5dbd:6b67:d3cf:58ed:fde0:f9b4:c888/5",
  "created_on": {"$date":"2023-09-16T19:50:50.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e29",
  "user": "6687bdf9fc13ae5b832345ba",
  "start": {"$date":"2024-07-08T10:00:00.000Z"},
  "end": {"$date":"2024-07-08T10:30:00.000Z"},
  "confirmed": false,
  "confirmationToken": "ceec:8092:ae8e:3529:92c4:87e8:c713:ebb6/122",
  "created_on": {"$date":"2023-09-29T17:53:32.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e28",
  "user": "6687bdf9fc13ae5b832345b9",
  "start": {"$date":"2024-07-07T09:30:00.000Z"},
  "end": {"$date":"2024-07-07T10:00:00.000Z"},
  "confirmed": true,
  "confirmationToken": "2988:21e6:bd1c:4736:a368:99a:a74e:6bef/72",
  "created_on": {"$date":"2024-04-04T04:31:26.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e27",
  "user": "6687bdf9fc13ae5b832345b7",
  "start": {"$date":"2024-07-14T11:00:00.000Z"},
  "end": {"$date":"2024-07-14T11:30:00.000Z"},
  "confirmed": false,
  "confirmationToken": "ea52:754:be19:df90:de50:19a3:d6db:d504/17",
  "created_on": {"$date":"2023-11-21T13:08:37.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e25",
  "user": "6687bdf9fc13ae5b832345b5",
  "start": {"$date":"2024-07-11T09:00:00.000Z"},
  "end": {"$date":"2024-07-11T09:30:00.000Z"},
  "confirmed": true,
  "confirmationToken": "17ce:e1fe:29a6:124b:cc60:43d4:9d34:9333/22",
  "created_on": {"$date":"2024-04-24T18:49:35.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e25",
  "user": "6687bdf9fc13ae5b832345b6",
  "start": {"$date":"2024-07-13T13:30:00.000Z"},
  "end": {"$date":"2024-07-13T14:00:00.000Z"},
  "confirmed": true,
  "confirmationToken": "1120:f93c:79a7:c30b:a4b9:16c2:8dbd:c180/62",
  "created_on": {"$date":"2024-01-29T23:05:47.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e24",
  "user": "6687bdf9fc13ae5b832345b2",
  "start": {"$date":"2024-07-10T17:00:00.000Z"},
  "end": {"$date":"2024-07-10T17:30:00.000Z"},
  "confirmed": true,
  "confirmationToken": "ac16:b55d:cb9e:a615:468e:20eb:24e8:19b8/9",
  "created_on": {"$date":"2023-12-24T01:11:24.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e24",
  "user": "6687bdf9fc13ae5b832345b7",
  "start": {"$date":"2024-07-17T15:00:00.000Z"},
  "end": {"$date":"2024-07-17T15:30:00.000Z"},
  "confirmed": true,
  "confirmationToken": "e05c:91d:7341:6b63:f785:b0e6:8ba7:2ac8/123",
  "created_on": {"$date":"2024-06-23T15:41:53.000Z"}
}, {
  "service": "6687bce1fc13ae5aa0234e25",
  "user": "6687bdf9fc13ae5b832345b8",
  "start": {"$date":"2024-07-18T10:30:00.000Z"},
  "end": {"$date":"2024-07-18T11:00:00.000Z"},
  "confirmed": true,
  "confirmationToken": "28b0:c028:35c9:12b5:1ccf:befe:e8b4:61c7/76",
  "created_on": {"$date":"2024-01-18T11:06:06.000Z"}
}])

print('END #################################################################');

