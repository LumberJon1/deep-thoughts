const {User, Thought} = require("../models");

// The resolvers handle the queries for any of the particular "endpoints," like a REST API would
// with routers.  The objects nested in the Query object are all Mongoose code.

const resolvers = {
    Query: {
        thoughts: async () => {
            return Thought.find().sort({createdAt: -1});
        },
        thought: async (parent, {_id}) => {
            return Thought.findOne({_id})
        },
        // Get all users
        users: async () => {
            return User.find()
                .select("-__v -password")
                .populate("friends")
                .populate("thoughts")
        },
        // Get a single user by username
        user: async(parent, {username}) => {
            return User.findOne({username})
                .select("-__v -password")
                .populate("friends")
                .populate("thoughts")
        },
    }
}

module.exports = resolvers;