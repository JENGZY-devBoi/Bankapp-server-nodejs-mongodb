const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        select: false
    },
    account: {
        accountId: {
            type: String,
            required: true,
            unique: true
        },
        balance: Number,
        transaction: [
            { 
                datetime: Date,
                action: String,
                from: String,
                to: String,
                amount: Number,
                remain: Number
            }
        ]
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email }).select("+password");
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
    }
    throw Error("Invalid email or password.");
};

module.exports = mongoose.model('User', userSchema);