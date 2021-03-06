const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name needs at last 8 chars'],
        trim: true
    },
    surName: {
        type: String,
        required: [true, 'Surname is required'],
        minlength: [3, 'Surname needs at last 8 chars'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, 'Email is invalid']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password needs at last 8 chars']
    },
    // repeatPassword: {
    //     type: String,
    //     required: [true, 'Password is required'],
    //     minlength: [8, 'Password needs at last 8 chars']
    // },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    validateToken: {
        type: String,
        default: generateRandomToken
    },
    validated: {
        type: Boolean,
        default: true
    },
    social: {
        google: String,
        facebook: String,
        slack: String
    },
    map:
         [{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Map'
        }],
    
}, { timestamps: true })

userSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash;
                        next();
                    });
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

// userSchema.virtual('maps', {
//     ref: 'Map',
//     localField: '_id',
//     foreignField: 'user',
//     justOne: false,
// });

const User = mongoose.model('User', userSchema);

module.exports = User;