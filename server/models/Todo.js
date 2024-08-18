const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  userTodo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Todo", todoSchema);
