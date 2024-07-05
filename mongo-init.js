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
      required: ['fullName', 'phone', 'email', 'years_old', 'state'],
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
        }
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

print('END #################################################################');

